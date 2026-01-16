#!/bin/bash

# AISI Protocol v1.0 Final Release Check Script
# 在发布前运行此脚本确保所有文件正确

set -e  # 遇到错误立即退出

echo "🔍 AISI Protocol v1.0 (2026-01) 最终检查"
echo "========================================"
echo "开始时间: $(date)"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 工具检查
echo "🛠️  检查必要工具..."
command -v jq >/dev/null 2>&1 || { echo -e "${RED}❌ 需要安装 jq 工具${NC}"; exit 1; }
command -v node >/dev/null 2>&1 || { echo -e "${RED}❌ 需要安装 Node.js${NC}"; exit 1; }
echo -e "${GREEN}✅ 所有工具可用${NC}"
echo ""

# 1. 检查版本标识一致性
echo "📋 1. 检查版本标识一致性..."
VERSION_ERRORS=0

# 检查所有JSON文件中的aisi_protocol字段
echo "   检查JSON文件..."
for file in $(find . -name "*.json" -type f); do
    if jq -e '.aisi_protocol' "$file" >/dev/null 2>&1; then
        version=$(jq -r '.aisi_protocol' "$file")
        if [ "$version" != "2026-01" ]; then
            echo -e "   ${RED}❌ $file: aisi_protocol应为'2026-01', 实际为'$version'${NC}"
            VERSION_ERRORS=$((VERSION_ERRORS+1))
        fi
    fi
done

# 检查Markdown文件中的版本引用
echo "   检查文档文件..."
for file in $(find . -name "*.md" -type f); do
    if grep -q "2026-1" "$file" || grep -q "2024-1" "$file"; then
        echo -e "   ${YELLOW}⚠️  $file: 发现旧的版本引用${NC}"
        grep -n "2026-1\|2024-1" "$file" | head -5
        VERSION_ERRORS=$((VERSION_ERRORS+1))
    fi
done

if [ $VERSION_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}✅ 所有文件版本标识一致 (2026-01)${NC}"
else
    echo -e "   ${RED}❌ 发现 $VERSION_ERRORS 个版本标识问题${NC}"
fi
echo ""

# 2. 检查示例文件合规性
echo "📋 2. 检查示例文件合规性..."
EXAMPLE_ERRORS=0

for example in examples/v2026-01-*.json; do
    echo "   检查: $(basename $example)"
    
    # 检查JSON语法
    if ! jq empty "$example" 2>/dev/null; then
        echo -e "   ${RED}❌ JSON语法错误${NC}"
        EXAMPLE_ERRORS=$((EXAMPLE_ERRORS+1))
        continue
    fi
    
    # 检查必填字段
    REQUIRED_FIELDS=("aisi_protocol" "discovery.identifier" "metadata.name" "metadata.provider" "metadata.version" "api.endpoint")
    
    for field in "${REQUIRED_FIELDS[@]}"; do
        if ! jq -e ".${field}" "$example" >/dev/null 2>&1; then
            echo -e "   ${RED}❌ 缺少必填字段: $field${NC}"
            EXAMPLE_ERRORS=$((EXAMPLE_ERRORS+1))
        fi
    done
    
    # 检查aisi_protocol值
    version=$(jq -r '.aisi_protocol' "$example")
    if [ "$version" != "2026-01" ]; then
        echo -e "   ${RED}❌ aisi_protocol应为'2026-01', 实际为'$version'${NC}"
        EXAMPLE_ERRORS=$((EXAMPLE_ERRORS+1))
    fi
    
    # 检查discovery.identifier格式
    identifier=$(jq -r '.discovery.identifier' "$example")
    if [[ ! "$identifier" =~ ^aisi://did:(web|key|ion): ]]; then
        echo -e "   ${RED}❌ discovery.identifier格式错误: $identifier${NC}"
        EXAMPLE_ERRORS=$((EXAMPLE_ERRORS+1))
    fi
    
    # 检查metadata.version格式
    metadata_version=$(jq -r '.metadata.version' "$example")
    if [[ ! "$metadata_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "   ${RED}❌ metadata.version格式错误: $metadata_version${NC}"
        EXAMPLE_ERRORS=$((EXAMPLE_ERRORS+1))
    fi
    
    if [ $EXAMPLE_ERRORS -eq 0 ]; then
        echo -e "   ${GREEN}✅ 示例文件合规${NC}"
    fi
done

if [ $EXAMPLE_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}✅ 所有示例文件通过检查${NC}"
else
    echo -e "   ${RED}❌ 发现 $EXAMPLE_ERRORS 个示例文件问题${NC}"
fi
echo ""

# 3. 检查工具链功能
echo "📋 3. 检查工具链功能..."
TOOL_ERRORS=0

# 检查CLI验证器
echo "   检查CLI验证器..."
if [ -f "tools/cli-validator/index.js" ]; then
    # 测试验证器是否能运行
    if node tools/cli-validator/index.js --version >/dev/null 2>&1; then
        echo -e "   ${GREEN}✅ CLI验证器可运行${NC}"
    else
        echo -e "   ${RED}❌ CLI验证器无法运行${NC}"
        TOOL_ERRORS=$((TOOL_ERRORS+1))
    fi
    
    # 测试验证器验证最小示例
    TEMP_FILE=$(mktemp)
    cat > "$TEMP_FILE" << 'EOF'
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:test.com/service"
  },
  "metadata": {
    "name": "测试服务",
    "provider": "测试公司",
    "version": "1.0.0"
  },
  "api": {
    "endpoint": "https://api.test.com/v1"
  }
}
EOF
    
    if node tools/cli-validator/index.js "$TEMP_FILE" >/dev/null 2>&1; then
        echo -e "   ${GREEN}✅ CLI验证器能验证正确格式${NC}"
    else
        echo -e "   ${RED}❌ CLI验证器验证失败${NC}"
        TOOL_ERRORS=$((TOOL_ERRORS+1))
    fi
    
    rm "$TEMP_FILE"
else
    echo -e "   ${RED}❌ CLI验证器文件不存在${NC}"
    TOOL_ERRORS=$((TOOL_ERRORS+1))
fi

# 检查Web生成器
echo "   检查Web生成器..."
if [ -f "tools/service-generator.html" ]; then
    # 检查HTML文件完整性
    if grep -q "AISI 服务描述生成器" "tools/service-generator.html"; then
        echo -e "   ${GREEN}✅ Web生成器文件完整${NC}"
    else
        echo -e "   ${RED}❌ Web生成器文件可能损坏${NC}"
        TOOL_ERRORS=$((TOOL_ERRORS+1))
    fi
else
    echo -e "   ${RED}❌ Web生成器文件不存在${NC}"
    TOOL_ERRORS=$((TOOL_ERRORS+1))
fi

# 检查演示页面
echo "   检查演示页面..."
if [ -f "tools/demo/index.html" ]; then
    if grep -q "AISI Protocol 交互演示" "tools/demo/index.html"; then
        echo -e "   ${GREEN}✅ 演示页面文件完整${NC}"
    else
        echo -e "   ${RED}❌ 演示页面文件可能损坏${NC}"
        TOOL_ERRORS=$((TOOL_ERRORS+1))
    fi
else
    echo -e "   ${RED}❌ 演示页面文件不存在${NC}"
    TOOL_ERRORS=$((TOOL_ERRORS+1))
fi

if [ $TOOL_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}✅ 所有工具链功能正常${NC}"
else
    echo -e "   ${RED}❌ 发现 $TOOL_ERRORS 个工具链问题${NC}"
fi
echo ""

# 4. 检查文档完整性
echo "📋 4. 检查文档完整性..."
DOC_ERRORS=0

REQUIRED_DOCS=(
    "SPECIFICATION.md"
    "zh-CN/SPECIFICATION.md"
    "GETTING-STARTED.md"
    "FAQ.md"
    "COMPLIANCE-CHECKLIST.md"
    "CONTRIBUTING.md"
    "VERSIONING.md"
    "README.md"
)

for doc in "${REQUIRED_DOCS[@]}"; do
    if [ -f "$doc" ]; then
        # 检查文件大小
        size=$(wc -c < "$doc")
        if [ $size -lt 100 ]; then
            echo -e "   ${YELLOW}⚠️  $doc: 文件过小 (${size}字节)${NC}"
            DOC_ERRORS=$((DOC_ERRORS+1))
        else
            echo -e "   ${GREEN}✅ $doc: 存在且完整${NC}"
        fi
    else
        echo -e "   ${RED}❌ $doc: 文件不存在${NC}"
        DOC_ERRORS=$((DOC_ERRORS+1))
    fi
done

# 检查内部链接
echo "   检查文档内部链接..."
for doc in $(find . -name "*.md" -type f); do
    # 检查是否有损坏的本地链接
    broken_links=$(grep -o '\[.*\]([^)]*)' "$doc" | grep -v 'http' | grep -v '#' | sed "s/.*(//;s/)//" | while read link; do
        if [[ $link == *".md" ]] && [ ! -f "$link" ] && [ ! -f "$(dirname "$doc")/$link" ]; then
            echo "$link"
        fi
    done)
    
    if [ ! -z "$broken_links" ]; then
        echo -e "   ${YELLOW}⚠️  $doc: 可能包含损坏的链接${NC}"
        echo "$broken_links" | head -3
        DOC_ERRORS=$((DOC_ERRORS+1))
    fi
done

if [ $DOC_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}✅ 所有文档完整可用${NC}"
else
    echo -e "   ${RED}❌ 发现 $DOC_ERRORS 个文档问题${NC}"
fi
echo ""

# 5. 检查JSON Schema
echo "📋 5. 检查JSON Schema..."
SCHEMA_ERRORS=0

if [ -f "schemas/v2026-01.schema.json" ]; then
    # 检查JSON Schema语法
    if jq empty "schemas/v2026-01.schema.json" 2>/dev/null; then
        echo -e "   ${GREEN}✅ JSON Schema语法正确${NC}"
        
        # 检查Schema是否包含必需的定义
        REQUIRED_SCHEMA_PROPS=("properties.aisi_protocol" "properties.discovery" "properties.metadata" "properties.api")
        
        for prop in "${REQUIRED_SCHEMA_PROPS[@]}"; do
            if jq -e ".$prop" "schemas/v2026-01.schema.json" >/dev/null 2>&1; then
                echo -e "   ${GREEN}✅ Schema包含: $prop${NC}"
            else
                echo -e "   ${RED}❌ Schema缺少: $prop${NC}"
                SCHEMA_ERRORS=$((SCHEMA_ERRORS+1))
            fi
        done
    else
        echo -e "   ${RED}❌ JSON Schema语法错误${NC}"
        SCHEMA_ERRORS=$((SCHEMA_ERRORS+1))
    fi
else
    echo -e "   ${RED}❌ JSON Schema文件不存在${NC}"
    SCHEMA_ERRORS=$((SCHEMA_ERRORS+1))
fi

if [ $SCHEMA_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}✅ JSON Schema完整可用${NC}"
else
    echo -e "   ${RED}❌ 发现 $SCHEMA_ERRORS 个Schema问题${NC}"
fi
echo ""

# 6. 检查文件结构
echo "📋 6. 检查文件结构..."
STRUCTURE_ERRORS=0

REQUIRED_DIRS=(
    "."
    "zh-CN"
    "tools"
    "tools/cli-validator"
    "tools/cli-validator/bin"
    "tools/demo"
    "examples"
    "schemas"
    "scripts"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "   ${GREEN}✅ 目录存在: $dir${NC}"
    else
        echo -e "   ${RED}❌ 目录不存在: $dir${NC}"
        STRUCTURE_ERRORS=$((STRUCTURE_ERRORS+1))
    fi
done

# 检查关键文件数量
echo "   检查关键文件数量..."
JSON_EXAMPLES=$(find examples -name "*.json" | wc -l)
if [ $JSON_EXAMPLES -ge 3 ]; then
    echo -e "   ${GREEN}✅ 有 $JSON_EXAMPLES 个示例文件${NC}"
else
    echo -e "   ${RED}❌ 示例文件不足: 只有 $JSON_EXAMPLES 个${NC}"
    STRUCTURE_ERRORS=$((STRUCTURE_ERRORS+1))
fi

TOOL_FILES=$(find tools -type f \( -name "*.html" -o -name "*.js" -o -name "*.json" \) | wc -l)
if [ $TOOL_FILES -ge 5 ]; then
    echo -e "   ${GREEN}✅ 有 $TOOL_FILES 个工具文件${NC}"
else
    echo -e "   ${RED}❌ 工具文件不足: 只有 $TOOL_FILES 个${NC}"
    STRUCTURE_ERRORS=$((STRUCTURE_ERRORS+1))
fi

if [ $STRUCTURE_ERRORS -eq 0 ]; then
    echo -e "   ${GREEN}✅ 文件结构完整${NC}"
else
    echo -e "   ${RED}❌ 发现 $STRUCTURE_ERRORS 个结构问题${NC}"
fi
echo ""

# 总结报告
TOTAL_ERRORS=$((VERSION_ERRORS + EXAMPLE_ERRORS + TOOL_ERRORS + DOC_ERRORS + SCHEMA_ERRORS + STRUCTURE_ERRORS))

echo "📊 检查总结"
echo "=========="
echo -e "版本标识检查:   $([ $VERSION_ERRORS -eq 0 ] && echo -e "${GREEN}通过${NC}" || echo -e "${RED}失败 ($VERSION_ERRORS个错误)${NC}")"
echo -e "示例文件检查:   $([ $EXAMPLE_ERRORS -eq 0 ] && echo -e "${GREEN}通过${NC}" || echo -e "${RED}失败 ($EXAMPLE_ERRORS个错误)${NC}")"
echo -e "工具链检查:     $([ $TOOL_ERRORS -eq 0 ] && echo -e "${GREEN}通过${NC}" || echo -e "${RED}失败 ($TOOL_ERRORS个错误)${NC}")"
echo -e "文档完整性检查: $([ $DOC_ERRORS -eq 0 ] && echo -e "${GREEN}通过${NC}" || echo -e "${RED}失败 ($DOC_ERRORS个错误)${NC}")"
echo -e "JSON Schema检查: $([ $SCHEMA_ERRORS -eq 0 ] && echo -e "${GREEN}通过${NC}" || echo -e "${RED}失败 ($SCHEMA_ERRORS个错误)${NC}")"
echo -e "文件结构检查:   $([ $STRUCTURE_ERRORS -eq 0 ] && echo -e "${GREEN}通过${NC}" || echo -e "${RED}失败 ($STRUCTURE_ERRORS个错误)${NC}")"
echo ""

if [ $TOTAL_ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 所有检查通过！AISI Protocol v1.0 (2026-01) 准备就绪，可以发布。${NC}"
    echo ""
    echo "建议的发布步骤:"
    echo "1. git add ."
    echo "2. git commit -m 'Release v1.0-2026-01: AISI Protocol正式发布'"
    echo "3. git tag -a v1.0-2026-01 -m 'AISI Protocol v1.0 (2026-01) Official Release'"
    echo "4. git push origin main --tags"
    echo "5. 创建 GitHub Release: https://github.com/aisi-protocol/aisi-protocol/releases/new"
    exit 0
else
    echo -e "${RED}❌ 发现 $TOTAL_ERRORS 个问题需要修复后才能发布。${NC}"
    echo ""
    echo "修复建议:"
    [ $VERSION_ERRORS -gt 0 ] && echo "• 修复版本标识不一致问题"
    [ $EXAMPLE_ERRORS -gt 0 ] && echo "• 修复示例文件合规性问题"
    [ $TOOL_ERRORS -gt 0 ] && echo "• 修复工具链功能问题"
    [ $DOC_ERRORS -gt 0 ] && echo "• 补充或修复文档"
    [ $SCHEMA_ERRORS -gt 0 ] && echo "• 修复JSON Schema问题"
    [ $STRUCTURE_ERRORS -gt 0 ] && echo "• 完善文件结构"
    exit 1
fi
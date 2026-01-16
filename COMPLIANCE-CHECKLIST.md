# ✅ AISI Protocol v1.0 (2026-01) 合规检查清单

## 🎯 使用说明

### 检查时机
请在以下时机使用本清单：
- 🚀 **发布前**: 确保服务描述合规
- 🔄 **更新时**: 验证变更不影响合规性  
- 📊 **审计时**: 定期检查服务状态
- 🔍 **调试时**: 排查发现或调用问题

### 检查级别
- 🔴 **必须满足**: v1.0核心要求，不满足则无法通过验证
- 🟡 **推荐满足**: 增强体验，建议包含
- 🟢 **可选满足**: 按需添加，不影响核心功能

## 📋 基础合规要求

### 🔴 必须包含字段 (v1.0核心)

#### 1. `aisi_protocol` 字段
- [ ] **字段存在**: 包含 `aisi_protocol` 字段
- [ ] **值正确**: 值为 `"2026-01"` (带双引号)
- [ ] **类型正确**: 字符串类型，非数字
- [ ] **格式正确**: 不是 `2026-1`、`2026.01` 等变体

**验证命令**:
```bash
# 快速检查
grep '"aisi_protocol": "2026-01"' service.json
2. discovery.identifier 字段

字段存在: 包含 discovery.identifier 字段
格式正确: 以 aisi:// 开头
DID格式: 符合 aisi://did:{method}:{id}/{service} 格式
长度合理: 不超过500字符
正确示例:

json
✅ "identifier": "aisi://did:web:example.com/service"
✅ "identifier": "aisi://did:key:z6Mkf5rGM.../service"
❌ "identifier": "aisi://example.com/service"  // 缺少did:
❌ "identifier": "did:web:example.com/service" // 缺少aisi://
3. metadata.name 字段

字段存在: 包含 metadata.name 字段
非空值: 值不为空字符串
长度合规: 1-100个字符
人类可读: 使用自然语言名称
示例:

json
✅ "name": "披萨外卖服务"
✅ "name": "Weather Forecast API"
❌ "name": ""  // 空值
❌ "name": "svc_001"  // 编码名称，不推荐
4. metadata.provider 字段

字段存在: 包含 metadata.provider 字段
非空值: 值不为空字符串
长度合规: 1-100个字符
标识清晰: 能识别服务提供方
示例:

json
✅ "provider": "披萨有限公司"
✅ "provider": "Weather Data Inc."
❌ "provider": ""  // 空值
❌ "provider": "admin"  // 不明确
5. metadata.version 字段

字段存在: 包含 metadata.version 字段
语义化版本: 符合 major.minor.patch 格式
数字有效: 各部分为有效数字
字符串类型: 使用双引号包裹
验证规则:

regex
^\d+\.\d+\.\d+$
示例:

json
✅ "version": "1.0.0"
✅ "version": "2.1.5"
❌ "version": "1.0"          // 缺少修订号
❌ "version": "v1.0.0"       // 包含v前缀
❌ "version": "2026.01"      // 错误格式
6. api.endpoint 字段

字段存在: 包含 api.endpoint 字段
URL格式: 有效的HTTP/HTTPS URL
协议正确: 以 http:// 或 https:// 开头
可访问性: 理论上可被公开访问
验证命令:

bash
# 检查URL格式 (不实际访问)
curl --head --silent --fail https://api.example.com/v1 > /dev/null 2>&1 && echo "URL可能有效"
🔴 结构要求

JSON语法正确: 可通过 jsonlint 验证
根对象: 顶层是JSON对象，非数组
字段顺序: 无顺序要求，但建议按规范顺序
编码正确: UTF-8编码，无BOM头
🟡 推荐包含字段

1. metadata.description 字段 (推荐)

字段存在: 包含描述字段
内容有用: 描述服务功能
长度合理: 建议10-500字符
语言匹配: 与locale字段语言一致
示例:

json
"description": "提供30分钟内送达的现烤披萨外卖服务，支持在线支付和实时追踪"
2. metadata.locale 字段 (推荐)

字段存在: 包含语言区域字段
格式正确: BCP 47语言标签
常用值: 如 "zh-CN"、"en-US"、"ja-JP"
常见值:

json
✅ "locale": "zh-CN"    // 简体中文
✅ "locale": "en-US"    // 美式英语
✅ "locale": "ja-JP"    // 日语
❌ "locale": "chinese"  // 非标准格式
3. api.specification 字段 (推荐)

字段存在: 包含API规范定义
type字段: 指定API类型
version字段: 规范版本
示例:

json
{
  "api": {
    "specification": {
      "type": "openapi",
      "version": "3.0.0"
    }
  }
}
4. 扩展字段 (按需推荐)

extensions.privacy: 隐私信息
extensions.billing: 计费信息
extensions.geography: 地理限制
extensions.ui: 用户界面提示
🟢 可选优化项

1. 文件优化

文件大小: < 100KB (推荐)
压缩可用: 支持gzip压缩
缓存头: 设置合理缓存策略
CDN加速: 使用CDN分发
2. 部署优化

HTTPS强制: 只通过HTTPS访问
CORS配置: 允许跨域访问
高可用: 多区域部署
监控告警: 监控端点状态
3. 内容优化

结构清晰: 合理缩进，易于阅读
注释说明: 关键字段添加注释
示例完整: 提供调用示例
版本历史: 记录变更历史
🔍 自动化检查

使用CLI验证器

bash
# 基础验证
aisi-validate service.json

# 详细输出
aisi-validate service.json --verbose

# 只检查必填字段
aisi-validate service.json --required-only

# 输出JSON格式
aisi-validate service.json --output=json > results.json
验证结果解读

text
✅ 验证通过: 所有必填字段正确
⚠️ 警告: 缺少推荐字段，但基础合规
❌ 错误: 缺少必填字段或格式错误

示例输出:
❌ 错误: 字段 discovery.identifier 必须以 "aisi://" 开头
⚠️ 警告: 推荐包含字段 metadata.description
✅ 验证通过: 所有必填字段正确
批量检查脚本

bash
#!/bin/bash
# scripts/check-compliance.sh

echo "🔍 开始合规检查..."

# 检查单个文件
check_file() {
    local file=$1
    echo "检查: $file"
    
    # 1. JSON语法检查
    if ! jq empty "$file" 2>/dev/null; then
        echo "  ❌ JSON语法错误"
        return 1
    fi
    
    # 2. 必填字段检查
    local missing_fields=()
    
    for field in "aisi_protocol" "discovery.identifier" "metadata.name" \
                 "metadata.provider" "metadata.version" "api.endpoint"; do
        if ! jq -e ".${field}" "$file" >/dev/null 2>&1; then
            missing_fields+=("$field")
        fi
    done
    
    if [ ${#missing_fields[@]} -gt 0 ]; then
        echo "  ❌ 缺少必填字段: ${missing_fields[*]}"
        return 1
    fi
    
    echo "  ✅ 基础合规通过"
    return 0
}

# 检查所有示例文件
for file in examples/*.json; do
    check_file "$file"
done

echo "🎉 合规检查完成"
📊 合规等级定义

等级1: 基础合规

text
要求: 满足所有🔴必须字段
标识: 🟢 基础合规
说明: 可通过验证，能被AI发现和调用
等级2: 推荐合规

text
要求: 基础合规 + 包含🟡推荐字段
标识: 🟡 推荐合规
说明: 提供更好体验，建议达到此等级
等级3: 最佳实践

text
要求: 推荐合规 + 满足🟢优化项
标识: 🔵 最佳实践
说明: 提供最优体验，可作为范例
等级4: 企业级

text
要求: 最佳实践 + 企业特定要求
标识: 🟣 企业级
说明: 包含SLA、安全、监控等企业要求
🧪 测试用例

测试1: 最小合规服务

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:example.com/service"
  },
  "metadata": {
    "name": "测试服务",
    "provider": "测试公司",
    "version": "1.0.0"
  },
  "api": {
    "endpoint": "https://api.example.com/v1"
  }
}
预期结果: ✅ 基础合规通过

测试2: 完整服务描述

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:weather.com/forecast"
  },
  "metadata": {
    "name": "天气预报服务",
    "provider": "气象数据公司",
    "version": "2.1.3",
    "description": "全球7天天气预报",
    "locale": "zh-CN"
  },
  "api": {
    "endpoint": "https://api.weather.com/v2/forecast",
    "specification": {
      "type": "openapi",
      "version": "3.0.0"
    }
  },
  "extensions": {
    "privacy": {
      "data_retention": "30d"
    }
  }
}
预期结果: 🟡 推荐合规通过

🚨 常见不合规问题

问题1: 版本标识错误

json
// 错误 ❌
"aisi_protocol": "2026-1"
"aisi_protocol": 2026-01
"aisi_protocol": "2026.01"

// 正确 ✅  
"aisi_protocol": "2026-01"
问题2: DID格式错误

json
// 错误 ❌
"identifier": "aisi://example.com/service"
"identifier": "did:web:example.com/service"
"identifier": "aisi://web:example.com/service"

// 正确 ✅
"identifier": "aisi://did:web:example.com/service"
问题3: 版本号格式错误

json
// 错误 ❌
"version": "1.0"
"version": "v1.0.0"
"version": "2026-01"
"version": "1.0.0.1"

// 正确 ✅
"version": "1.0.0"
"version": "2.1.5"
问题4: 端点格式错误

json
// 错误 ❌
"endpoint": "api.example.com/v1"
"endpoint": "http://api.example.com/v1"  // 非HTTPS
"endpoint": "/api/v1"

// 正确 ✅
"endpoint": "https://api.example.com/v1"
📈 合规改进计划

阶段1: 基础合规 (第1周)

确保6个必填字段正确
通过CLI验证器检查
部署到测试环境
阶段2: 推荐合规 (第2周)

添加推荐字段
优化服务描述
测试完整发现流程
阶段3: 最佳实践 (第3周)

实现优化项
性能调优
安全加固
阶段4: 持续改进 (每月)

定期合规检查
根据反馈优化
更新到新版本
📞 合规支持

获取帮助

合规咨询: GitHub Discussions #compliance
问题报告: GitHub Issues 标签 #compliance-issue
工具支持: 验证工具使用问题
合规认证

text
符合AISI v1.0规范的服务可以使用标识:

"✅ 本服务符合 AISI Protocol v2026-01 规范"
"🟡 本服务达到 AISI v2026-01 推荐合规等级"
提交合规报告

如需正式合规认证，可提交：

服务AISI描述文件
验证工具输出结果
部署环境说明
测试报告
最后更新: 2026年1月
维护团队: AISI Protocol 合规工作组
文档版本: v1.0.0

本清单随协议版本更新，请定期查看最新版本。
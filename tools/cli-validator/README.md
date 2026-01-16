# AISI Validator CLI

命令行工具，用于验证 AISI Protocol v1.0 (2026-01) 服务描述文件。

## 🚀 快速开始

### 安装

#### 全局安装（推荐）
```bash
npm install -g aisi-validator
本地安装

bash
npm install aisi-validator
从源码安装

bash
# 克隆仓库
git clone https://github.com/aisi-protocol/aisi-protocol.git
cd aisi-protocol/tools/cli-validator

# 安装依赖
npm install

# 链接到全局
npm link
基本使用

bash
# 验证单个文件
aisi-validate service.json

# 验证多个文件
aisi-validate service1.json service2.json

# 详细输出
aisi-validate --verbose service.json

# JSON格式输出
aisi-validate --output=json service.json > results.json
📋 功能特性

✅ 格式验证: 检查JSON语法和结构
✅ 必填字段验证: 验证6个核心必填字段
✅ 语义验证: 检查版本号、URL、DID标识符格式
✅ 推荐字段检查: 提示缺少的推荐字段
✅ 多格式输出: 支持文本和JSON输出格式
✅ 分级验证: 支持基础验证和严格验证
✅ 跨平台: 支持Windows、macOS、Linux
🔧 命令行选项

基本命令

bash
aisi-validate <file.json>          # 验证文件
aisi-validate --version           # 显示版本
aisi-validate --help              # 显示帮助
选项

选项	缩写	说明	示例
--verbose	-v	详细输出模式	aisi-validate -v file.json
--output <format>		输出格式 (text/json)	--output=json
--level <1|2>		验证级别 (1=基础, 2=严格)	--level=2
--version		显示版本信息	--version
--help	-h	显示帮助信息	--help
验证级别

Level 1 (基础): 仅验证必填字段和基本格式
Level 2 (严格): 包含Level 1，加上语义验证和推荐字段检查
📊 输出示例

成功验证

bash
$ aisi-validate examples/pizza-delivery.json

✅ AISI v2026-01 validation passed!

⚠️  Warnings:
  • Recommended field missing: "metadata.description"
  • Recommended field missing: "metadata.locale"
验证失败

bash
$ aisi-validate invalid-service.json

❌ AISI validation failed:

Errors:
  • Field "discovery.identifier" is required
  • aisi_protocol must be "2026-01", got "2024-1"
  • metadata.version must be semantic version (e.g., 1.0.0), got "1.0"

Warnings:
  • Recommended field missing: "api.specification.type"
JSON格式输出

bash
$ aisi-validate --output=json service.json
{
  "file": "service.json",
  "timestamp": "2026-01-15T10:30:00.000Z",
  "isValid": true,
  "errors": [],
  "warnings": [
    "Recommended field missing: \"metadata.description\""
  ],
  "validationLevel": 1
}
🔍 验证规则

必填字段 (v1.0核心)

验证器检查以下6个必填字段：

aisi_protocol: 必须为 "2026-01"
discovery.identifier: 必须符合 aisi://did:{method}:{id}/{service} 格式
metadata.name: 1-100个字符，非空
metadata.provider: 1-100个字符，非空
metadata.version: 语义化版本 (如 1.0.0)
api.endpoint: 有效的HTTP/HTTPS URL
格式要求

JSON语法: 必须是有效的JSON
字段类型: 字段必须符合指定类型
字符串格式: 版本号、URL、标识符等必须符合特定格式
长度限制: 字符串字段有长度限制
推荐字段检查

验证器会提示以下推荐字段的缺失：

metadata.description: 服务描述
metadata.locale: 语言区域
api.specification.type: API规范类型
🧪 使用示例

示例1: 验证最小合规服务

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:example.com/service"
  },
  "metadata": {
    "name": "我的服务",
    "provider": "我的公司",
    "version": "1.0.0"
  },
  "api": {
    "endpoint": "https://api.example.com/v1"
  }
}
bash
$ aisi-validate minimal-service.json
✅ AISI v2026-01 validation passed!
示例2: 验证完整服务

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
    "description": "提供全球7天天气预报",
    "locale": "zh-CN"
  },
  "api": {
    "endpoint": "https://api.weather.com/v2/forecast",
    "specification": {
      "type": "openapi",
      "version": "3.0.0"
    }
  }
}
bash
$ aisi-validate weather-service.json
✅ AISI v2026-01 validation passed!
示例3: 批量验证

bash
# 使用通配符验证多个文件
aisi-validate examples/*.json

# 或使用find命令
find . -name "*.json" -exec aisi-validate {} \;
🛠️ 集成使用

在Node.js项目中使用

javascript
const { validateAISI } = require('aisi-validator');

const service = {
  "aisi_protocol": "2026-01",
  // ... 其他字段
};

const result = validateAISI(service);

if (result.isValid) {
  console.log('✅ 验证通过');
} else {
  console.log('❌ 验证失败:', result.errors);
}
在CI/CD管道中使用

yaml
# GitHub Actions 示例
name: Validate AISI
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install AISI Validator
        run: npm install -g aisi-validator
      - name: Validate files
        run: aisi-validate examples/*.json
在package.json脚本中使用

json
{
  "scripts": {
    "validate-aisi": "aisi-validate services/*.json",
    "validate-ci": "aisi-validate --output=json services/*.json > validation-results.json"
  }
}
🔬 高级功能

自定义验证规则

可以通过扩展验证器来添加自定义规则：

javascript
const { validateAISI } = require('aisi-validator');

function customValidator(json) {
  const result = validateAISI(json);
  
  // 添加自定义规则
  if (json.metadata && json.metadata.version === '0.0.0') {
    result.warnings.push('版本号0.0.0通常用于开发版本');
  }
  
  return result;
}
性能优化

对于大量文件的验证：

bash
# 并行验证（使用GNU parallel）
parallel aisi-validate ::: services/*.json

# 或使用xargs
find services/ -name "*.json" | xargs -P 4 -I {} aisi-validate {}
🐛 故障排除

常见问题

问题1: "Command not found: aisi-validate"

bash
# 确保已全局安装
npm list -g aisi-validator

# 如果已安装但不可用，检查PATH
echo $PATH
which node
which npm
问题2: JSON解析错误

bash
# 使用jsonlint等工具检查JSON语法
npm install -g jsonlint
jsonlint service.json
问题3: 验证通过但服务无法被发现

bash
# 检查DID标识符格式
aisi-validate --verbose service.json

# 确保标识符中的域名可访问
curl -I https://example.com/.well-known/did.json
调试模式

bash
# 启用详细输出
aisi-validate --verbose service.json

# 设置调试环境变量
DEBUG=1 aisi-validate service.json
📚 相关资源

AISI Protocol 规范
快速入门指南
示例文件
Web生成器
🤝 贡献

欢迎贡献代码、报告问题和提出建议！

查看 贡献指南
提交 Issue
创建 Pull Request
📄 许可证

MIT License - 详见 LICENSE 文件

版本: 1.0.0
协议版本: 2026-01
最后更新: 2026年1月
# 🚀 AISI Protocol 快速入门指南

## ⏱️ 10分钟创建你的第一个AISI服务

### 时间分配
- ⏰ **2分钟**: 理解AISI是什么
- ⏰ **3分钟**: 创建AISI服务描述
- ⏰ **5分钟**: 验证和部署

## 🎯 第一步：理解AISI（2分钟）

### AISI是什么？
AISI（原子化智能服务接口）是一个**衔接协议**，让AI智能体能够发现、理解和调用各种服务。

### 核心价值
- 🤖 **对AI开发者**: 让AI能调用任何服务，无需为每个服务单独开发适配器
- 🏢 **对服务提供者**: 一次描述，被所有支持AISI的AI理解和使用
- 👥 **对最终用户**: 在任何AI助手都能享受各种服务

### v1.0的极简设计
AISI v1.0只关注**最核心的6个字段**：
```json
{
  "aisi_protocol": "2026-01",      // 协议版本
  "discovery": {                   // 发现标识
    "identifier": "aisi://..."     // 服务唯一标识
  },
  "metadata": {                    // 基本信息
    "name": "...",                 // 服务名称
    "provider": "...",             // 提供方
    "version": "1.0.0"             // 服务版本
  },
  "api": {                         // 调用接口
    "endpoint": "https://..."      // API地址
  }
}
🛠️ 第二步：创建AISI描述（3分钟）

选项A：使用Web生成器（推荐）

访问生成器: https://aisi-protocol.github.io/tools/service-generator.html
填写6个必填字段（界面友好，实时验证）
点击"生成JSON"
复制或下载生成的JSON文件
选项B：手动创建JSON

创建文件 my-service.json：

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:your-domain.com/your-service"
  },
  "metadata": {
    "name": "你的服务名称",
    "provider": "你的公司/组织",
    "version": "1.0.0"
  },
  "api": {
    "endpoint": "https://api.your-domain.com/v1"
  }
}
字段说明

字段	说明	示例
aisi_protocol	协议版本，必须为"2026-01"	"2026-01"
discovery.identifier	服务唯一标识，aisi://开头	"aisi://did:web:example.com/service"
metadata.name	服务名称，人类可读	"天气查询服务"
metadata.provider	服务提供方	"气象数据公司"
metadata.version	语义化版本号	"1.0.0"
api.endpoint	实际的API地址	"https://api.example.com/v1"
✅ 第三步：验证和部署（5分钟）

1. 验证格式正确性

bash
# 安装验证工具
npm install -g aisi-validator

# 验证你的文件
aisi-validate my-service.json

# 期望输出：
✅ AISI v2026-01 验证通过
2. 部署发现端点

将你的AISI JSON文件放到Web服务器：

text
标准路径: https://你的域名/.well-known/aisi/服务名.json
示例路径: https://example.com/.well-known/aisi/weather.json
简易部署示例（使用GitHub Pages）：

创建GitHub仓库
在仓库中创建文件 .well-known/aisi/service-name.json
启用GitHub Pages
访问地址：https://用户名.github.io/仓库名/.well-known/aisi/service-name.json
3. 测试发现功能

智能体会通过以下流程发现你的服务：

text
1. 📍 获得 aisi://did:web:example.com/service
2. 🔍 解析DID → 查找 .well-known/did.json
3. 📄 找到AISI端点 → 获取 service.json
4. ✅ 验证AISI描述格式
5. 🚀 调用 api.endpoint
🧪 完整示例：披萨外卖服务

服务描述文件：pizza-delivery.json

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:pizzacompany.com/pizza-delivery"
  },
  "metadata": {
    "name": "披萨外卖服务",
    "provider": "披萨有限公司",
    "version": "1.0.0",
    "description": "30分钟内送达的现烤披萨",
    "locale": "zh-CN"
  },
  "api": {
    "endpoint": "https://api.pizzacompany.com/v1/order",
    "specification": {
      "type": "openapi",
      "version": "3.0.0"
    }
  },
  "extensions": {
    "billing": {
      "currency": "CNY",
      "payment_methods": ["alipay", "wechat_pay"]
    }
  }
}
部署后访问地址

text
https://pizzacompany.com/.well-known/aisi/pizza-delivery.json
🔍 验证工具使用详解

CLI验证器完整功能

bash
# 基本验证
aisi-validate service.json

# 详细输出
aisi-validate service.json --verbose

# 只检查必填字段
aisi-validate service.json --required-only

# 输出JSON格式结果
aisi-validate service.json --output=json

# 帮助信息
aisi-validate --help
验证结果说明

text
✅ 验证通过: 所有必填字段正确，格式合规
⚠️ 警告: 缺少推荐字段，但基础合规
❌ 错误: 缺少必填字段或格式错误

错误示例:
❌ 错误: 字段 aisi_protocol 必须为 "2026-01"，当前为 "2026-1"
❌ 错误: 缺少必填字段 metadata.provider
❌ 错误: discovery.identifier 格式不正确
🐛 常见问题与解决

问题1：验证失败 "aisi_protocol must be '2026-01'"

解决：检查JSON文件，确保字段值为 "2026-01"（带双引号）

问题2：DID标识符格式错误

解决：使用正确的格式：aisi://did:web:域名/服务名

✅ 正确：aisi://did:web:example.com/service
❌ 错误：aisi://example.com/service
❌ 错误：did:web:example.com/service
问题3：API端点无效

解决：

确保URL以 http:// 或 https:// 开头
确保URL可公开访问
测试：curl https://api.example.com/v1
问题4：版本号格式错误

解决：使用语义化版本：主版本.次版本.修订号

✅ 正确："1.0.0", "2.1.5"
❌ 错误："1.0", "v1.0.0", "2026.01"
🚀 进阶：添加扩展字段

基本服务可用后，可以添加扩展字段增强体验：

json
{
  "extensions": {
    "privacy": {
      "data_retention": "30d",
      "privacy_policy_url": "https://example.com/privacy"
    },
    "ui": {
      "icon_url": "https://example.com/icon.png",
      "color_scheme": "#FF6B35"
    }
  }
}
推荐扩展字段

扩展	用途	示例值
metadata.description	服务详细描述	"提供全球天气预报服务"
metadata.locale	服务语言	"zh-CN", "en-US"
api.specification	API规范类型	{"type": "openapi", "version": "3.0.0"}
extensions.privacy	隐私政策	{"data_retention": "90d"}
extensions.billing	计费信息	{"currency": "CNY"}
📊 合规性检查清单

发布前必查

aisi_protocol 字段值为 "2026-01"
discovery.identifier 以 aisi:// 开头
metadata.name 已填写（1-100字符）
metadata.provider 已填写（1-100字符）
metadata.version 是语义化版本
api.endpoint 是有效的URL
JSON格式正确（可访问 jsonlint.com 验证）
推荐检查

添加了 metadata.description
添加了 metadata.locale
添加了 api.specification.type
文件可公开访问（无认证要求）
文件小于1MB（推荐）
🔗 相关资源

学习资源

📖 完整协议规范
❓ 常见问题解答
✅ 合规检查清单
🔧 工具链文档
示例文件

🍕 披萨外卖示例
📱 手机维修示例
📊 数字报告示例
社区支持

💬 GitHub Discussions
🐛 报告问题
🚀 贡献代码
🎉 恭喜！你的服务已AISI化

现在你的服务：

✅ 可以被任何支持AISI的AI智能体发现
✅ 有标准的描述格式
✅ 有唯一的标识符
✅ 有明确的调用接口
下一步行动：

宣传你的AISI服务：告诉用户可以通过AI使用你的服务
监控使用情况：观察AI智能体如何发现和调用你的服务
收集反馈：根据AI使用情况优化服务描述
参与社区：分享经验，帮助改进AISI协议
📈 从v1.0开始

记住：AISI v1.0是基础可用版本。我们从最简单的6个字段开始，确保每个服务提供者都能轻松上手。

v1.x将基于社区反馈逐步增强，但v1.0的核心将保持稳定。

有疑问？需要帮助？

查看 FAQ.md 常见问题
在 GitHub Discussions 提问
报告问题到 GitHub Issues
开始你的AISI之旅吧！ 🚀
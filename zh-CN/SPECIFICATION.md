# AISI 协议规范 v1.0 (2026-01)

## 📅 发布信息
- **协议版本**: 2026-01
- **发布日期**: 2026年1月
- **协议标识**: `aisi_protocol: "2026-01"`
- **许可证**: Apache License 2.0

## 🎯 协议概述

### 定位声明
AISI 协议（原子化智能服务接口协议）是**定义 AISI 服务描述格式、验证规则和发现机制**的开放协议规范。

### 本质澄清
- ❌ 不是调度平台（如谷歌UCP）
- ❌ 不是 API 描述语言（如 OpenAPI）
- ✅ 是中间协议层：连接智能体与服务的"标准化插头"
- ✅ 核心交付物：标准化 JSON 描述格式
- ✅ 核心价值：降低 AI 智能体与服务之间的衔接成本

### 设计原则
1. **最小化核心**：仅包含必要字段，降低采用门槛
2. **渐进增强**：v1.0 基础可用，后续版本逐步完善
3. **严格验证**：四级验证体系确保格式合规
4. **开放生态**：避免平台锁定，欢迎所有参与者
5. **衔接优先**：关注连接价值而非技术完美

## 📋 协议结构

### 完整字段结构
```json
{
  "aisi_protocol": "2026-01",                    // 必须：协议版本标识
  "discovery": {                                 // 必须：发现机制定义
    "identifier": "aisi://did:web:example.com/service"  // 必须：服务标识符
  },
  "metadata": {                                  // 必须：服务元数据
    "name": "服务名称",                           // 必须：服务名称
    "provider": "服务提供方",                     // 必须：提供方标识
    "version": "1.0.0",                          // 必须：服务版本
    "description": "服务功能描述",                // 可选：详细描述
    "locale": "zh-CN"                            // 可选：语言区域
  },
  "api": {                                       // 必须：API 接口定义
    "endpoint": "https://api.example.com/v1",    // 必须：API 端点
    "specification": {                           // 可选：API 规范
      "type": "openapi",                         // API 类型
      "version": "3.0.0"                         // 规范版本
    }
  },
  "extensions": {                                // 可选：扩展字段
    "privacy": {},                               // 隐私扩展
    "billing": {},                               // 计费扩展
    "geography": {},                             // 地理扩展
    "ui": {},                                    // 界面扩展
    "custom": {}                                 // 自定义扩展
  }
}
🔍 详细字段规范

1. aisi_protocol 字段

属性	值	说明
字段名	aisi_protocol	协议版本标识
类型	字符串	固定格式
必须	是	必须包含
格式	"YYYY-MM"	年-月格式
当前值	"2026-01"	2026年1月版本
示例	"2026-01"	
规范：

必须使用双引号
必须精确匹配 "2026-01"
用于协议版本兼容性检查
2. discovery 字段

属性	值	说明
字段名	discovery	服务发现定义
类型	对象	包含发现相关信息
必须	是	必须包含
discovery.identifier 字段

属性	值	说明
字段名	identifier	服务唯一标识符
类型	字符串	URI 格式
必须	是	必须包含
格式	aisi://{did}/{service-name}	
示例	"aisi://did:web:example.com/pizza-delivery"	
DID 格式规范：

text
支持三种 DID 方法：
1. did:web:{hostname}[:{path}]
   - 示例：did:web:example.com:services:pizza
   - 解析：GET https://example.com/.well-known/did.json

2. did:key:{multibase-encoded-public-key}
   - 示例：did:key:z6Mkf5rGM...
   - 解析：本地验证，无需网络

3. did:ion:{anchor-string}
   - 示例：did:ion:EiClkZ...
   - 解析：通过 Sidetree 节点

v1.0 推荐使用 did:web，最简单实用。
3. metadata 字段

属性	值	说明
字段名	metadata	服务元数据
类型	对象	包含服务描述信息
必须	是	必须包含
metadata.name 字段

属性	值	说明
字段名	name	服务名称
类型	字符串	人类可读名称
必须	是	必须包含
长度限制	1-100 字符	
示例	"披萨外卖服务"	
metadata.provider 字段

属性	值	说明
字段名	provider	服务提供方
类型	字符串	提供方标识
必须	是	必须包含
长度限制	1-100 字符	
示例	"PizzaCompany Inc."	
metadata.version 字段

属性	值	说明
字段名	version	服务版本
类型	字符串	语义化版本
必须	是	必须包含
格式	语义化版本（SemVer）	
示例	"1.0.0"、"2.1.5"	
语义化版本规则：

主版本.次版本.修订号
主版本：不兼容的 API 修改
次版本：向下兼容的功能新增
修订号：向下兼容的问题修正
metadata.description 字段

属性	值	说明
字段名	description	服务描述
类型	字符串	详细功能说明
必须	否	推荐包含
长度限制	0-500 字符	
示例	"提供30分钟内送达的披萨外卖服务"	
metadata.locale 字段

属性	值	说明
字段名	locale	语言区域
类型	字符串	BCP 47 语言标签
必须	否	可选
格式	RFC 5646 标准	
示例	"zh-CN"、"en-US"	
4. api 字段

属性	值	说明
字段名	api	API 接口定义
类型	对象	包含调用信息
必须	是	必须包含
api.endpoint 字段

属性	值	说明
字段名	endpoint	API 端点
类型	字符串	URL 格式
必须	是	必须包含
格式	有效的 HTTP/HTTPS URL	
示例	"https://api.example.com/v1/order"	
api.specification 字段

属性	值	说明
字段名	specification	API 规范定义
类型	对象	包含规范信息
必须	否	推荐包含
specification.type 字段：

属性	值	说明
字段名	type	API 规范类型
类型	字符串	固定枚举值
允许值	"openapi"、"graphql"、"grpc"、"asyncapi"	
默认值	"openapi"	
specification.version 字段：

属性	值	说明
字段名	version	规范版本
类型	字符串	版本号
示例	"3.0.0"、"2.0"	
5. extensions 字段

属性	值	说明
字段名	extensions	扩展字段
类型	对象	包含扩展信息
必须	否	可选
标准扩展类型

privacy 扩展：隐私政策相关

json
{
  "privacy": {
    "data_retention": "30d",
    "gdpr_compliant": true,
    "privacy_policy_url": "https://example.com/privacy"
  }
}
billing 扩展：计费信息

json
{
  "billing": {
    "currency": "CNY",
    "min_amount": 0.01,
    "payment_methods": ["alipay", "wechat_pay"]
  }
}
geography 扩展：地理限制

json
{
  "geography": {
    "countries": ["CN", "US"],
    "regions": ["华东", "华北"],
    "timezone": "Asia/Shanghai"
  }
}
ui 扩展：用户界面提示

json
{
  "ui": {
    "color_scheme": "#FF6B35",
    "icon_url": "https://example.com/icon.png",
    "short_description": "快速披萨配送"
  }
}
custom 扩展：自定义扩展

json
{
  "custom": {
    "business_hours": "9:00-21:00",
    "delivery_time": "30分钟"
  }
}
🔄 发现机制

标准发现流程

text
智能体发现流程：
1. 获得 aisi:// 标识符
   → 输入：aisi://did:web:example.com/service

2. 解析 DID 获取服务端点
   → 请求：GET https://example.com/.well-known/did.json
   → 响应：DID 文档，包含 serviceEndpoint

3. 查找 AISI 描述端点
   → 从 DID 文档找到：/well-known/aisi/service.json

4. 获取完整 AISI 描述
   → 请求：GET https://example.com/.well-known/aisi/service.json
   → 响应：完整的 AISI JSON

5. 验证并调用服务
   → 验证格式合规性
   → 调用 api.endpoint
发现失败策略

严格策略：任何一步失败，智能体完全放弃该服务
验证级别：

DID 解析失败 → 放弃
AISI 端点 404 → 放弃
格式验证失败 → 放弃
API 调用失败 → 记录但不放弃（可能是临时问题）
.well-known 端点规范

text
标准位置：
https://{domain}/.well-known/aisi/{service-name}.json

可选目录格式：
https://{domain}/.well-known/aisi.json
返回所有服务的目录：
{
  "services": [
    "aisi://did:web:example.com/service1",
    "aisi://did:web:example.com/service2"
  ]
}
🛠️ 验证标准

四级验证体系

Level 1：结构验证

text
检查内容：
✅ JSON 语法正确性
✅ 包含所有必填字段
✅ 字段类型正确
✅ aisi_protocol 字段值为 "2026-01"

工具：
aisi-validate --level=1 service.json
Level 2：语义验证

text
检查内容：
✅ 版本号符合语义化版本规范
✅ URL 格式有效性
✅ DID 标识符格式正确
✅ 扩展字段结构合理

工具：
aisi-validate --level=2 service.json
Level 3：业务验证（v1.x 计划）

text
检查内容：
✅ API 端点可达性
✅ OpenAPI 文档一致性
✅ 服务描述与实际能力匹配

工具：
aisi-validate --level=3 service.json
Level 4：质量验证（v2.0 计划）

text
检查内容：
✅ 服务性能基准
✅ 用户评价真实性
✅ SLA 承诺可行性
✅ 安全合规性

工具：
aisi-validate --level=4 service.json
合规检查清单

markdown
## 必须包含字段
- [ ] aisi_protocol: "2026-01"
- [ ] discovery.identifier: aisi://格式
- [ ] metadata.name: 服务名称
- [ ] metadata.provider: 提供方
- [ ] metadata.version: 语义化版本
- [ ] api.endpoint: 有效 URL

## 推荐包含字段
- [ ] metadata.description: 服务描述
- [ ] metadata.locale: 语言区域
- [ ] api.specification.type: API 类型
- [ ] api.specification.version: 规范版本

## 格式要求
- [ ] 有效的 JSON 格式
- [ ] 所有字符串使用双引号
- [ ] 版本号格式正确
- [ ] DID 标识符格式正确
📋 版本兼容性

协议版本管理

text
当前版本：2026-01
格式：YYYY-MM（年-月）

版本演进规则：
1. 月度更新：2026-02, 2026-03（小版本）
2. 年度更新：2027-01（大版本）
3. 向后兼容：高版本智能体兼容低版本协议
4. 向前兼容：低版本智能体忽略不理解的高版本字段
服务版本管理

text
服务版本：metadata.version
格式：语义化版本（SemVer）

版本规则：
- 主版本变更（1.0.0 → 2.0.0）：不兼容的 API 修改
- 次版本变更（1.0.0 → 1.1.0）：向下兼容的功能新增
- 修订号变更（1.0.0 → 1.0.1）：向下兼容的问题修复
🎯 使用示例

示例1：最小合规服务

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:pizzacompany.com/pizza-delivery"
  },
  "metadata": {
    "name": "披萨外卖服务",
    "provider": "披萨公司",
    "version": "1.0.0"
  },
  "api": {
    "endpoint": "https://api.pizzacompany.com/v1/order"
  }
}
示例2：完整服务描述

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:weather.example.com/forecast"
  },
  "metadata": {
    "name": "天气预报服务",
    "provider": "气象数据公司",
    "version": "2.1.3",
    "description": "提供全球主要城市的7天天气预报",
    "locale": "zh-CN"
  },
  "api": {
    "endpoint": "https://api.weather.example.com/v2/forecast",
    "specification": {
      "type": "openapi",
      "version": "3.0.0"
    }
  },
  "extensions": {
    "privacy": {
      "data_retention": "30d",
      "gdpr_compliant": true
    },
    "billing": {
      "currency": "CNY",
      "price_per_call": 0.01
    },
    "geography": {
      "supported_countries": ["CN", "US", "JP"],
      "timezone": "UTC"
    }
  }
}
🔧 工具链支持

核心工具

验证工具：

bash
# CLI 验证器
npm install -g aisi-validator
aisi-validate service.json

# 在线验证器
# https://aisi-protocol.github.io/validator
生成工具：

bash
# Web 表单生成器
# https://aisi-protocol.github.io/generator

# 命令行生成器
aisi-generate --name "我的服务"
发现工具：

javascript
// JavaScript SDK
import { discoverService } from '@aisi-protocol/sdk';

const service = await discoverService(
  'aisi://did:web:example.com/service'
);
开发工具

JSON Schema：

json
{
  "$schema": "https://aisi-protocol.org/schemas/v2026-01.json",
  "$ref": "#/definitions/AISI"
}
📚 文档体系

核心文档

text
aisi-protocol/
├── SPECIFICATION.md          # 主规范（英文）
├── zh-CN/SPECIFICATION.md    # 中文规范（本文档）
├── GETTING-STARTED.md        # 快速入门
├── FAQ.md                    # 常见问题
├── COMPLIANCE-CHECKLIST.md   # 合规清单
├── DID-IMPLEMENTATION.md     # DID 实现指南
├── EXAMPLES.md               # 示例集合
└── TOOLCHAIN.md              # 工具链文档
参考实现

text
examples/
├── v2026-01-pizza-delivery.json     # 披萨外卖
├── v2026-01-phone-repair.json       # 手机维修
├── v2026-01-report-service.json     # 数字报告
├── v2026-01-weather-service.json    # 天气预报
└── v2026-01-payment-service.json    # 支付服务
⚖️ 合规与许可

许可证

协议规范：Creative Commons Attribution 4.0
参考实现：Apache License 2.0
工具软件：MIT License
合规性

格式合规：通过验证工具检查
发现合规：实现标准发现机制
版本合规：使用正确的版本标识
安全合规：遵循安全最佳实践
认证标识

text
合规服务可以使用标识：
"本服务符合 AISI Protocol v2026-01 规范"
📈 发展路线

v1.0 (2026-01) 目标

定义核心协议结构
建立基本验证机制
提供完整工具链基础
创建参考实现示例
v1.x (2026 年) 规划

扩展标准扩展集
增强验证工具
完善开发者体验
建立社区生态
v2.0 (2027 年) 愿景

服务质量评级体系
智能体偏好学习
跨链服务发现
多方安全计算
📞 支持与贡献

获取支持

GitHub Issues：报告问题
Discussions：技术讨论
邮件列表：协议更新通知
社区论坛：用户交流
参与贡献

提交问题：报告 bug 或建议
贡献代码：改进工具链
编写文档：完善使用指南
分享案例：展示实际应用
参与讨论：协议演进讨论
协议标识：aisi_protocol: "2026-01"
发布状态：正式发布
维护团队：AISI Protocol 社区
官方网站：https://github.com/aisi-protocol/aisi-protocol
更新日期：2026 年 1 月

本规范最终解释权归 AISI Protocol 社区所有，如有更改恕不另行通知。
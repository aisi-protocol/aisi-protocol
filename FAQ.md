# ❓ AISI Protocol 常见问题解答 (FAQ)

## 🎯 协议基础

### Q1: AISI Protocol 是什么？
**A**: AISI（原子化智能服务接口协议）是一个**衔接协议**，定义AI智能体发现、理解和调用服务的标准化方式。

**核心定位**: 不是技术规范文档，而是不同系统间的衔接约定。

### Q2: 为什么要用 AISI？
**A**: 解决三个核心问题：
1. **碎片化**: 每个服务有不同API，AI需要为每个服务单独开发适配器
2. **发现难**: AI不知道有什么服务可用，服务不知道如何被AI发现
3. **理解难**: AI不理解服务能做什么、需要什么输入、提供什么输出

### Q3: AISI 与 OpenAPI 有什么区别？
| 方面 | AISI Protocol | OpenAPI |
|------|---------------|---------|
| **定位** | 服务发现与衔接协议 | API描述规范 |
| **焦点** | 让AI发现和理解服务 | 让开发者理解API细节 |
| **使用方** | AI智能体 | 人类开发者、SDK |
| **范围** | 服务级描述（能做什么） | 接口级描述（如何调用） |
| **关系** | 可以引用OpenAPI文档 | 可以被AISI引用 |

**简单说**: OpenAPI描述"如何调用API"，AISI描述"有什么服务，能做什么"。

### Q4: v1.0 包含什么？不包含什么？
**包含** (v1.0 核心):
- 6个必填字段的基本服务描述
- 标准发现机制 (`.well-known/aisi.json`)
- 基础验证工具
- 3个完整示例

**不包含** (留给 v1.x):
- 复杂的扩展字段
- 服务质量评级
- 智能体偏好学习
- 企业级工具链

## 🔧 技术实现

### Q5: `aisi_protocol` 字段为什么是 "2026-01"？
**A**: 这是协议版本标识，采用"年-月"格式：
- `2026`: 发布年份
- `01`: 年度内版本序号（1月）
- 未来版本可能是 "2026-02"、"2027-01" 等

**重要**: 必须使用双引号：`"2026-01"`，不是 `2026-01`。

### Q6: `discovery.identifier` 的格式要求？
**A**: 必须是以 `aisi://` 开头的DID标识符：
格式: aisi://{did-method}:{identifier}/{service-name}
示例: aisi://did:web:example.com/pizza-delivery

text

**支持的DID方法**:
1. `did:web` (推荐): 最简单，基于域名
2. `did:key`: 隐私优先，无需网络
3. `did:ion`: 企业级，去中心化

### Q7: 如何选择DID方法？
| 方法 | 适合场景 | 部署复杂度 | 推荐度 |
|------|----------|------------|--------|
| `did:web` | 大多数Web服务 | 简单 | ⭐⭐⭐⭐⭐ |
| `did:key` | 隐私敏感应用 | 中等 | ⭐⭐⭐ |
| `did:ion` | 企业级去中心化 | 复杂 | ⭐⭐ |

**建议**: v1.0 从 `did:web` 开始，最简单实用。

### Q8: `metadata.version` 的格式要求？
**A**: 必须使用语义化版本 (SemVer)：
格式: major.minor.patch
示例: "1.0.0", "2.1.5"

规则:

major (主版本): 不兼容的API变更，如 1.0.0 → 2.0.0
minor (次版本): 向后兼容的功能新增，如 1.0.0 → 1.1.0
patch (修订号): 向后兼容的问题修复，如 1.0.0 → 1.0.1
text

## 🛠️ 使用问题

### Q9: 如何验证我的AISI描述文件？
**A**: 多种验证方式：

#### 方式1: CLI验证器
```bash
# 安装
npm install -g aisi-validator

# 验证
aisi-validate service.json

# 输出示例:
✅ AISI v2026-01 验证通过
方式2: 在线验证器

访问: https://aisi-protocol.github.io/validator

方式3: 手动检查清单

aisi_protocol: "2026-01"
discovery.identifier 以 aisi:// 开头
metadata.name 已填写
metadata.provider 已填写
metadata.version 是语义化版本
api.endpoint 是有效URL
Q10: 发现机制如何工作？

A: 智能体通过以下流程发现服务：

text
1. 📍 获得 aisi:// 标识符
   (如: aisi://did:web:pizzacompany.com/pizza-delivery)

2. 🔍 解析 DID 文档
   请求: GET https://pizzacompany.com/.well-known/did.json
   响应: DID文档，包含AISI端点信息

3. 📄 获取 AISI 描述
   请求: GET https://pizzacompany.com/.well-known/aisi/pizza-delivery.json
   响应: 完整的AISI JSON描述

4. ✅ 验证格式
   检查必填字段、格式合规性

5. 🚀 调用服务
   使用 api.endpoint 调用实际API
Q11: 发现失败怎么办？

A: v1.0采用严格策略：任何一步失败，智能体完全放弃该服务。

失败原因及处理:

DID解析失败: 检查 .well-known/did.json 是否存在
AISI端点404: 检查 .well-known/aisi/{service}.json 路径
格式验证失败: 使用验证工具检查AISI描述
API调用失败: 可能是临时问题，智能体会记录但不放弃
Q12: 如何更新已发布的服务？

A: 更新流程：

json
// 1. 更新AISI描述文件
{
  "aisi_protocol": "2026-01",  // 保持不变
  "metadata": {
    "version": "1.0.1",        // 递增版本号
    // ... 其他更新
  }
}

// 2. 确保DID解析指向新版本
// 3. 保持向后兼容（如API变更需要主版本更新）
版本更新规则:

问题修复: 1.0.0 → 1.0.1 (patch)
功能新增: 1.0.0 → 1.1.0 (minor)
重大变更: 1.0.0 → 2.0.0 (major)
🌐 生态与扩展

Q13: 支持哪些API规范类型？

A: v1.0主要支持：

"openapi" (推荐)
"graphql"
"grpc"
"asyncapi" (异步API)
在 api.specification.type 中指定：

json
{
  "api": {
    "specification": {
      "type": "openapi",
      "version": "3.0.0"
    }
  }
}
Q14: 扩展字段如何使用？

A: extensions 字段用于添加额外信息：

标准扩展（建议使用）:

json
{
  "extensions": {
    "privacy": {
      "data_retention": "30d",
      "gdpr_compliant": true
    },
    "billing": {
      "currency": "CNY",
      "min_amount": 0.01
    }
  }
}
自定义扩展:

json
{
  "extensions": {
    "custom": {
      "delivery_time": "30分钟",
      "business_hours": "9:00-21:00"
    }
  }
}
Q15: AISI协议的未来计划？

A: 基于v1.0反馈，后续版本可能增加：

v1.x (2026年):

更多标准扩展字段
工具链增强
开发者体验优化
社区生态建设
v2.0 (2027年):

服务质量评级体系
智能体偏好学习
跨链服务发现
多方安全计算
🚀 采用与贡献

Q16: 如何开始使用AISI？

建议学习路径:

text
第1天: 阅读 GETTING-STARTED.md，创建第一个AISI描述
第2天: 部署服务，测试发现机制
第3天: 使用验证工具，确保合规性
第4天: 添加扩展字段，增强服务描述
第5天: 分享经验，参与社区讨论
Q17: 商业使用需要授权吗？

A: 不需要！ AISI协议使用 Apache 2.0 许可证：

✅ 可自由使用、修改、分发
✅ 可用于商业项目
✅ 可集成到专有软件
⚠️ 需保留版权声明
⚠️ 修改需说明变更
Q18: 如何参与贡献？

A: 多种贡献方式：

1. 报告问题

GitHub Issues: https://github.com/aisi-protocol/aisi-protocol/issues
标签: bug, enhancement, question
2. 贡献代码

改进工具链 (CLI验证器、Web生成器)
添加示例文件
编写文档翻译
3. 参与讨论

GitHub Discussions: 技术讨论、功能建议
分享使用案例
4. 推广协议

在技术社区分享AISI
帮助其他开发者使用
创建教程和示例
Q19: 如何获得技术支持？

A: 支持渠道：

GitHub Issues: 技术问题、bug报告
GitHub Discussions: 一般讨论、功能建议
文档: SPECIFICATION.md, FAQ.md
示例: examples/ 目录中的完整示例
响应时间承诺:

紧急问题 (安全漏洞): 24小时内
一般问题: 48小时内
功能建议: 1周内讨论
Q20: 如何判断我的服务是否合规？

A: 使用合规检查清单：

必须满足 (v1.0):

aisi_protocol: "2026-01"
discovery.identifier: aisi://格式
metadata.name: 1-100字符
metadata.provider: 1-100字符
metadata.version: 语义化版本
api.endpoint: 有效URL
推荐满足:

metadata.description: 服务描述
metadata.locale: 语言区域
api.specification.type: API类型
文件可公开访问
文件大小 < 1MB
🔄 迁移与兼容

Q21: 如果我有现有API，如何AISI化？

A: 迁移步骤：

json
// 原API信息:
// 名称: 天气查询服务
// 公司: 气象数据公司  
// 版本: v2.1.3
// 端点: https://api.weather.com/v2/forecast

// AISI化后:
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:weather.com/forecast"
  },
  "metadata": {
    "name": "天气查询服务",
    "provider": "气象数据公司",
    "version": "2.1.3"
  },
  "api": {
    "endpoint": "https://api.weather.com/v2/forecast"
  }
}
Q22: 协议更新会影响现有服务吗？

A: v1.0的向后兼容承诺：

2026-02将向后兼容2026-01
新增字段都是可选的
现有字段语义不变
验证规则只增不减
重大变更策略:

主版本更新 (2027-01): 可能有不兼容变更，提供迁移指南
次版本更新 (2026-02): 向后兼容，新增功能
修订号更新: 问题修复，透明升级
📊 性能与最佳实践

Q23: AISI描述文件应该多大？

A: 建议最佳实践：

最小化: 只包含必要信息
推荐大小: < 100KB
最大限制: < 1MB (智能体可能拒绝过大文件)
优化建议: 使用CDN加速访问
Q24: 如何确保服务可靠性？

A: 部署最佳实践：

高可用: 使用负载均衡、多区域部署
缓存: 设置合适的HTTP缓存头
监控: 监控 .well-known 端点的访问
备份: 定期备份AISI描述文件
测试: 定期测试发现流程
Q25: 安全注意事项？

A: 安全建议：

HTTPS: 必须使用HTTPS
验证: 智能体应验证DID文档签名
限流: 防止滥用发现端点
审计: 记录所有发现请求
更新: 及时修复安全漏洞
📞 更多帮助

需要进一步帮助？

📖 阅读 完整规范
🚀 查看 快速入门
🔧 使用 验证工具
💬 加入 社区讨论
发现错误或有问题？

请提交到 GitHub Issues，我们会尽快处理。

最后更新: 2026年1月
本文档随协议发展更新，最新版本请查看GitHub仓库。
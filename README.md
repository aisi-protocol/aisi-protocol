<p align="center">
  <img src="https://img.shields.io/badge/AISI_Protocol-v1.0_(2026--01)-blue" alt="版本">
  <img src="https://img.shields.io/badge/license-Apache%202.0-green" alt="许可证">
  <img src="https://img.shields.io/badge/status-stable-brightgreen" alt="状态">
  <img src="https://img.shields.io/badge/中文-English-red" alt="语言">
</p>

<h1 align="center">🎯 AISI Protocol</h1>
<p align="center">
  <b>原子化智能服务接口协议</b><br>
  <i>连接AI智能体与各类服务的标准化衔接协议</i>
</p>

<p align="center">
  <a href="#-什么是aisi协议">概述</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-核心概念">核心概念</a> •
  <a href="#-工具链">工具链</a> •
  <a href="#-文档">文档</a> •
  <a href="#-贡献">贡献</a>
</p>

## 🎯 什么是AISI协议？

**AISI（原子化智能服务接口）协议**是一个**衔接协议**，为AI智能体定义服务发现与调用的标准化方式。

### 核心理念
- **不是技术规范文档**，而是不同系统间的衔接约定
- **不是调度平台**（如谷歌UCP），而是中间协议层
- **不是API描述语言**（如OpenAPI），而是服务发现协议
- **核心交付物**：标准化JSON服务描述格式

### 解决的问题
现状：AI智能体 × 服务生态碎片化
问题：AI需要为每个服务单独开发适配器
方案：AISI作为标准化"插头"，让AI能发现和理解任何服务

text

## 🚀 快速开始

### 10分钟创建你的第一个AISI服务

#### 1. 创建服务描述文件
```json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:example.com/my-service"
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
2. 使用工具验证

bash
# 安装验证工具
npm install -g aisi-validator

# 验证你的服务描述
aisi-validate service.json
# 输出：✅ AISI v2026-01 validation passed!
3. 部署发现端点

将你的JSON文件部署到：

text
https://your-domain.com/.well-known/aisi/service-name.json
4. 被AI发现

AI智能体会通过标准流程发现你的服务：

text
用户请求 → AI查找aisi://标识符 → 解析DID → 获取AISI描述 → 验证格式 → 调用API
在线工具

🔧 Web生成器 - 可视化创建AISI描述
🧪 交互演示 - 查看完整发现流程
📋 v1.0 (2026-01) 核心特性

极简设计

仅6个必填字段，确保最低采用门槛：

json
{
  "aisi_protocol": "2026-01",      // 协议版本标识
  "discovery": {                   // 发现机制
    "identifier": "aisi://..."     // 服务唯一标识
  },
  "metadata": {                    // 元数据
    "name": "...",                 // 服务名称
    "provider": "...",             // 提供方
    "version": "1.0.0"             // 语义化版本
  },
  "api": {                         // API接口
    "endpoint": "https://..."      // 调用端点
  }
}
标准化发现机制

text
发现流程：
1. 📍 获得 aisi://did:web:example.com/service
2. 🔍 解析 DID 文档 (.well-known/did.json)
3. 📄 获取 AISI 描述 (.well-known/aisi/service.json)
4. ✅ 验证格式合规性
5. 🚀 调用 api.endpoint
严格的验证体系

Level 1: 结构验证 (JSON语法、必填字段)
Level 2: 语义验证 (版本号、URL、DID格式)
Level 3: 业务验证 (API可达性、文档一致性) - v1.x计划
Level 4: 质量验证 (性能、安全、SLA) - v2.0计划
🏗️ 核心概念

1. 协议定位：衔接层

text
AI智能体生态      AISI Protocol      服务提供生态
(百度/阿里/字节) ←── 衔接协议 ──→ (电商/生活/企业服务)
2. 原子化服务描述

原子化: 最小可独立描述和调用的服务单元
标准化: 固定结构 + 灵活扩展机制
语义化: AI可理解的服务能力描述
3. 去中心化标识

基于DID（去中心化标识符）的全局唯一标识：

text
aisi://did:web:example.com/service    # 最简单，推荐
aisi://did:key:z6Mkf5rGM.../service   # 隐私优先
aisi://did:ion:EiClkZ.../service      # 企业级
4. 渐进增强策略

v1.0 (2026-01): 基础可用 - 6个核心字段
v1.x (2026年): 生态建设 - 扩展字段、工具增强
v2.0 (2027年): 质量提升 - 评级体系、智能体学习
🛠️ 工具链

开箱即用工具

工具	类型	描述	链接
CLI验证器	命令行	验证AISI描述文件格式	tools/cli-validator/
Web生成器	Web应用	可视化创建服务描述	tools/service-generator.html
交互演示	演示	完整服务发现流程展示	tools/demo/index.html
开发工具

JSON Schema: schemas/v2026-01.schema.json - 自动化验证
检查脚本: scripts/final-check.sh - 发布前完整性检查
测试脚本: scripts/test-flow.sh - 端到端流程测试
📚 文档

核心文档

文档	描述	链接
协议规范	完整协议定义 (英文)	SPECIFICATION.md
中文规范	中文版协议规范	zh-CN/SPECIFICATION.md
快速入门	10分钟上手指南	GETTING-STARTED.md
常见问题	FAQ和问题解答	FAQ.md
合规清单	验证检查清单	COMPLIANCE-CHECKLIST.md
版本管理	版本策略和兼容性	VERSIONING.md
示例文件

示例	描述	链接
披萨外卖	完整服务描述示例	examples/v2026-01-pizza-delivery.json
手机维修	多服务类型示例	examples/v2026-01-phone-repair.json
商业报告	复杂SaaS服务示例	examples/v2026-01-report-service.json
🎯 使用场景

对服务提供者

text
价值：一次描述，被所有AI理解
流程：创建AISI描述 → 部署发现端点 → 被AI自动发现
收益：降低集成成本，扩大服务覆盖面
对AI开发者

text
价值：统一的服务发现机制
流程：查找aisi://服务 → 自动发现和理解 → 标准化调用
收益：专注AI逻辑，无需为每个服务开发适配器
对最终用户

text
价值：在任何AI助手使用任何服务
体验：自然语言请求 → AI自动找到最佳服务 → 无缝完成交易
🔄 发展路线

v1.0 (2026-01) - 基础可用 ✓

定义核心协议结构
建立基本验证机制
提供完整工具链基础
创建参考实现示例
v1.x (2026年) - 生态建设

扩展标准扩展字段集
增强验证工具和SDK
完善开发者体验
建立社区生态系统
v2.0 (2027年) - 质量提升

服务质量评级体系
智能体偏好学习机制
跨链服务发现支持
多方安全计算集成
🤝 贡献

欢迎贡献！

我们欢迎各种形式的贡献：

🐛 报告问题 - 在GitHub Issues中报告bug或问题
💡 功能建议 - 提出新功能或改进建议
📝 文档改进 - 改进文档或翻译
🔧 代码贡献 - 提交代码改进或新工具
🚀 用例分享 - 分享你的AISI使用案例
开始贡献

阅读 贡献指南
查看 行为准则
选择 good-first-issue 标签的任务开始
提交Pull Request
社区

💬 讨论: GitHub Discussions
🐛 问题: GitHub Issues
📚 学习: 查看示例文件和文档
📄 许可证

本项目采用 Apache License 2.0 - 详见 LICENSE 文件。

商业使用

✅ 可自由使用、修改、分发
✅ 可用于商业项目
✅ 可集成到专有软件
⚠️ 需保留版权声明
⚠️ 修改需说明变更
🌐 生态愿景

长期目标

text
建立AI时代最广泛使用的服务衔接协议
让任何AI智能体都能与任何服务无缝对话
让任何服务都能被任何AI智能体轻松发现和使用
中国生态价值

🇨🇳 中国主导: 中国团队主导的国际标准尝试
🔗 打破割裂: 解决百度/阿里/腾讯/字节多平台割裂问题
🛡️ 避免锁定: 提供中立协议层，避免平台锁定
🌍 国际影响: 建立中国在AI基础设施标准方面的影响力
📞 联系与支持

获取帮助

文档: 首先查看 FAQ.md 和 GETTING-STARTED.md
讨论: 在 GitHub Discussions 提问
问题: 提交到 GitHub Issues
安全: 安全漏洞请发送邮件到 security@aisi-protocol.org
保持更新

⭐ Star仓库: 获取更新通知
👁️ Watch仓库: 关注所有活动
📧 邮件列表: 即将推出协议更新通知
<p align="center"> <b>开始你的AISI之旅吧！</b><br> <i>让AI发现你的服务，让服务连接AI的未来</i> </p><p align="center"> <a href="tools/service-generator.html">🚀 使用Web生成器创建第一个服务</a> • <a href="examples/">📖 查看完整示例</a> • <a href="CONTRIBUTING.md">🤝 参与贡献</a> </p> ```
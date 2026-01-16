# 👥 贡献者指南

## 🎯 欢迎贡献！

感谢您对 AISI Protocol 的兴趣！我们欢迎各种形式的贡献：
- 🐛 报告问题和错误
- 💡 提出功能建议
- 📝 改进文档
- 🔧 提交代码改进
- 🌐 翻译和本地化
- 🚀 分享使用案例

## 📋 贡献前准备

### 1. 了解项目
- 阅读 [SPECIFICATION.md](SPECIFICATION.md) 了解协议核心
- 查看 [GETTING-STARTED.md](GETTING-STARTED.md) 快速入门
- 浏览 [FAQ.md](FAQ.md) 常见问题

### 2. 设置开发环境
```bash
# 克隆仓库
git clone https://github.com/aisi-protocol/aisi-protocol.git
cd aisi-protocol

# 查看项目结构
ls -la
3. 行为准则

请阅读 CODE_OF_CONDUCT.md，我们致力于创建友好、包容的社区环境。

🐛 报告问题

问题类型

类型	标签	说明
Bug报告	bug	功能不正常、验证错误等
功能建议	enhancement	新功能或改进建议
文档问题	documentation	文档错误、缺失、不清晰
安全问题	security	安全漏洞或隐患
问题咨询	question	使用问题、配置问题
报告模板

创建 Issue 时请尽量包含：

markdown
## 问题描述
清晰描述遇到的问题

## 重现步骤
1. ...
2. ...
3. ...

## 预期行为
应该发生什么

## 实际行为
实际发生了什么

## 环境信息
- 操作系统: [如 Ubuntu 22.04]
- 工具版本: [如 aisi-validator v1.0.0]
- 浏览器: [如 Chrome 120]

## 附加信息
日志、截图、相关配置等
好的 Issue 示例

markdown
## 问题: CLI验证器在Windows上路径处理错误

### 描述
在Windows 11上运行 `aisi-validate service.json` 时，当文件路径包含空格时验证失败。

### 重现步骤
1. 创建文件 `my service.json`
2. 运行 `aisi-validate "my service.json"`
3. 看到错误: "文件不存在"

### 预期行为
应该能正确处理带空格的文件路径

### 环境
- OS: Windows 11
- Node.js: v18.17.0
- Validator: v1.0.0
🔧 代码贡献

开发流程

1. Fork 仓库

点击 GitHub 页面的 "Fork" 按钮
克隆你的 Fork:
bash
git clone https://github.com/你的用户名/aisi-protocol.git
2. 创建分支

bash
git checkout -b feature/你的功能名
# 或
git checkout -b fix/问题描述
分支命名规范:

feature/ - 新功能
fix/ - 问题修复
docs/ - 文档更新
refactor/ - 代码重构
test/ - 测试相关
3. 开发代码

遵循现有代码风格
添加必要的测试
更新相关文档
4. 提交更改

bash
# 添加文件
git add .

# 提交（使用约定式提交格式）
git commit -m "feat: 添加Web生成器实时验证功能"
git commit -m "fix: 修复Windows路径处理问题"
git commit -m "docs: 更新快速入门指南"
提交消息格式 (约定式提交):

text
<类型>: <描述>

[可选正文]
[可选脚注]
类型说明:

feat: 新功能
fix: 错误修复
docs: 文档变更
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具变更
5. 推送更改

bash
git push origin feature/你的功能名
6. 创建 Pull Request

访问你的 Fork 仓库
点击 "Compare & pull request"
填写 PR 描述
PR 描述模板

markdown
## 变更描述
清晰描述这个PR做了什么变更

## 相关 Issue
Fixes #123 或 Closes #456

## 变更类型
- [ ] Bug修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 测试添加
- [ ] 其他

## 检查清单
- [ ] 代码遵循项目风格指南
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 所有测试通过
- [ ] 代码审查通过

## 测试说明
描述如何测试这个变更

## 截图（如适用）
添加UI变更的截图
📝 文档贡献

文档类型

文档类型	位置	说明
协议规范	SPECIFICATION.md	核心协议文档
快速入门	GETTING-STARTED.md	新手入门指南
常见问题	FAQ.md	问题解答
工具文档	tools/*/README.md	工具使用说明
示例文档	examples/README.md	示例说明
翻译文档	zh-CN/	中文翻译
文档标准

准确性: 确保信息准确、最新
清晰性: 语言简洁明了
完整性: 覆盖关键信息
一致性: 术语、格式统一
实用性: 提供实际价值
文档更新流程

确定需要更新的文档
创建文档分支 docs/主题
进行编辑更新
提交PR并请求审查
合并后更新版本信息
🌐 翻译贡献

翻译流程

选择语言: 查看现有翻译或提出新语言
创建目录: 如 ja-JP/ 日语
翻译文件:

优先翻译: SPECIFICATION.md, GETTING-STARTED.md, FAQ.md
保持术语一致
注意文化差异
提交PR: 包含翻译说明
翻译指南

技术术语保持英文，括号加翻译
保持格式标记不变
测试链接有效性
请母语者审核
🧪 测试贡献

测试类型

测试类型	位置	说明
单元测试	tools/*/test/	函数级测试
集成测试	tests/integration/	组件集成测试
端到端测试	tests/e2e/	完整流程测试
性能测试	tests/performance/	性能基准测试
测试标准

覆盖率: 关键功能应有测试覆盖
可靠性: 测试稳定可靠
速度: 测试运行快速
维护性: 测试代码易于维护
添加测试步骤

确定测试场景
编写测试用例
确保测试通过
运行现有测试确保无破坏
提交PR
🚀 工具贡献

工具类型

工具类型	位置	技术栈
CLI验证器	tools/cli-validator/	Node.js
Web生成器	tools/service-generator/	HTML/JS
SDK库	tools/sdk/	多种语言
插件扩展	tools/extensions/	编辑器插件等
开发指南

遵循架构: 保持与现有工具一致
代码质量: 添加注释、错误处理
测试覆盖: 编写单元测试
文档完整: 提供使用说明
示例丰富: 提供使用示例
🎯 贡献优先级

P0 (最高)

安全漏洞修复
协议规范错误
关键功能缺陷
阻碍使用的严重问题
P1 (高)

重要功能增强
性能优化
文档重大改进
常用工具改进
P2 (中)

新功能建议
体验优化
次要文档更新
测试覆盖率提升
P3 (低)

代码风格优化
重构建议
示例丰富
翻译改进
📊 审查流程

代码审查标准

功能正确: 实现预期功能
代码质量: 遵循编码规范
测试充分: 有适当的测试
文档更新: 相关文档已更新
性能影响: 无负面性能影响
审查流程

text
提交PR → 自动检查 → 维护者审查 → 修改反馈 → 批准合并
          (CI/CD)     (1-3天)     (根据需要)
审查者指南

提供具体、建设性的反馈
解释原因，不只是指出问题
尊重贡献者的努力
及时响应
🏆 认可贡献

贡献者等级

等级	条件	权益
🥇 核心贡献者	重大技术贡献	合并权限、决策参与
🥈 活跃贡献者	多次质量贡献	优先审查、特别感谢
🥉 新贡献者	首次有效贡献	欢迎加入、贡献者名单
认可方式

贡献者名单: GitHub Contributors 页面
特别感谢: 发布公告中感谢
社区角色: 邀请参与重要讨论
证书徽章: 数字贡献证书
🔧 开发环境设置

Node.js 工具开发

bash
# 安装依赖
cd tools/cli-validator
npm install

# 运行测试
npm test

# 本地测试
npm link
aisi-validate --help
文档开发

bash
# 安装文档工具
npm install -g markdownlint

# 检查文档
markdownlint README.md
测试环境

bash
# 运行所有测试
npm run test:all

# 运行特定测试
npm run test:unit
npm run test:integration
📞 沟通渠道

主要渠道

GitHub Issues: 问题跟踪
GitHub Discussions: 技术讨论
Pull Requests: 代码审查
沟通准则

尊重: 尊重所有社区成员
清晰: 表达清晰明确
建设性: 提供建设性反馈
耐心: 理解志愿者时间限制
获取帮助

新手问题: GitHub Discussions #beginner
技术讨论: GitHub Discussions #technical
流程问题: 查看本指南或询问维护者
📅 社区活动

常规活动

月度会议: 每月第一个周三
办公时间: 每周三下午
黑客松: 季度线上活动
分享会: 每月技术分享
参与方式

查看 GitHub Discussions 公告
加入会议链接
准备讨论话题
分享经验心得
🚨 紧急流程

安全问题

发现安全漏洞时：

不公开讨论: 不要在公开渠道讨论
私下报告: 发送邮件到 security@aisi-protocol.org
等待响应: 安全团队会在24小时内响应
协作修复: 配合进行修复和披露
重大故障

协议或工具重大故障时：

创建 Issue 标签 critical
@ 通知核心维护者
提供详细故障信息
协助排查和修复
📚 学习资源

内部资源

开发指南
架构说明
发布流程
测试指南
外部资源

GitHub协作指南
约定式提交
开源行为准则
🤝 成为维护者

资格要求

持续贡献6个月以上
提交10个以上质量PR
熟悉项目架构和流程
社区认可和信任
申请流程

表达意向
现有维护者提名
社区投票
试用期3个月
正式成为维护者
维护者职责

审查PR和Issue
参与技术决策
帮助新贡献者
维护项目健康
🎉 开始贡献！

第一步：选择任务

查看标签为 good-first-issue 或 help-wanted 的 Issue，这些适合新手开始。

第二步：认领任务

在 Issue 下留言表示你想处理，避免重复工作。

第三步：开始工作

按照本指南的流程进行开发。

第四步：提交成果

创建 Pull Request，等待审查和合并。

感谢你的贡献！ 🌟

本指南最后更新: 2026年1月
维护者团队: AISI Protocol Core Team
问题反馈: GitHub Issues 标签 #contributing
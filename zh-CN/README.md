# AISI 协议

**愿景：让每一项微小的服务，都能被智能体发现。**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**AISI 协议**（原子化智能服务接口）定义了一种用于描述网络服务的标准化数据格式。我们期望，无论是实体商品、本地服务还是数字服务，都能通过一份结构清晰的“说明书”，被智能体（Agent）轻松发现、理解并调用。

## 📖 文档
- **[协议规范 (中文)](./SPECIFICATION.md)** - 核心 v1.0 规范。
- **[Protocol Specification (English)](../SPECIFICATION.md)** - The core v1.0 specification in English.
- **[快速入门](./GETTING_STARTED.md)** - 5分钟上手指南。

## 🛠️ 工具（开箱即用）
我们提供了快速上手的工具：
1.  **`/tools/service-generator.html`** - 交互式原子服务JSON生成器。
2.  **`/tools/cli-validator-ts/`** - 用于验证服务定义的TypeScript CLI工具。
3.  **`/tools/platform-docker-compose.yml`** - 5分钟内启动参考平台的Docker Compose配置。

## 🎯 核心概念
AISI 协议 v1.0 定义了以下基本模型：
- **原子服务**：一个标准化的、自描述的功能单元。
- **服务发现**：如何通过 `/.well-known/aisi.json` 发现服务。
- **结构化扩展**：如何以机器可读的方式描述服务特定的细节。

## ⚡ 快速开始
```bash
# 克隆仓库并探索
git clone https://github.com/aisi-protocol/aisi-protocol.git
cd aisi-protocol
# 打开《快速入门》指南
📄 许可证

基于 Apache 2.0 许可证。详见 LICENSE。
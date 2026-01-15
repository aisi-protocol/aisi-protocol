# AISI Protocol

**Vision: Make every tiny service discoverable by agents.**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

The **AISI Protocol** (Atomized Intelligent Service Interface) defines a standardized data format for describing network services. We envision that every service—be it a physical good, a local task, or a digital offering—can be equipped with a clear, structured “spec sheet” that allows intelligent agents to discover, understand, and invoke it seamlessly.

## 📖 Documentation
- **[Protocol Specification (English)](./SPECIFICATION.md)** - The core v1.0 specification.
- **[协议规范 (中文)](./zh-CN/SPECIFICATION.md)** - 核心 v1.0 规范中文版。
- **[Getting Started](./GETTING_STARTED.md)** - Your first 5 minutes with AISI.

## 🛠️ Tools (Ready to Use)
We provide tools to kickstart your journey:
1.  **`/tools/service-generator.html`** - Interactive Atomic Service JSON generator.
2.  **`/tools/cli-validator-ts/`** - TypeScript CLI for validating your service definitions.
3.  **`/tools/platform-docker-compose.yml`** - Docker Compose to spin up a reference platform in 5 minutes.

## 🎯 Core Concepts
AISI Protocol v1.0 defines the fundamental models:
- **Atomic Service**: A standardized, self-described unit of functionality.
- **Service Discovery**: How services are found via `/.well-known/aisi.json`.
- **Structured Extensions**: How service-specific details are described in a machine-readable way.

## ⚡ Quick Start
```bash
# Clone and explore
git clone https://github.com/aisi-protocol/aisi-protocol.git
cd aisi-protocol
# Open the GETTING_STARTED.md guide
📄 License

Licensed under the Apache License, Version 2.0. See LICENSE for details.
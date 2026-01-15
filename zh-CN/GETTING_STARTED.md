# AISI 协议快速入门

本指南将帮助您在 5 分钟内发布并发现第一个符合 AISI 协议的服务。

## 第一步：生成您的服务表单
我们提供了一个基于 Web 的工具来创建您的服务描述。
1.  在浏览器中打开文件 `tools/service-generator.html`。
2.  填写基本信息：**服务 ID**、**名称**，并选择一个**服务类型**。
3.  在 `extensions` 部分添加与您的服务类型相关的详细信息（例如，外卖服务的 `dish`）。
4.  点击 **“生成 JSON”**。这将创建一个有效的 AISI v1.0 `AtomicService` JSON 对象。
5.  将此 JSON 保存为文件（例如 `my-service.json`）。

## 第二步：验证您的表单
使用我们的 CLI 验证工具确保您的 JSON 正确无误。
1.  进入工具目录：`cd tools/cli-validator-ts`。
2.  安装依赖：`npm install`。
3.  对您的文件运行验证器：
    ```bash
    npm start -- validate ../my-service.json
    ```
    成功消息确认您的文件有效。

## 第三步：运行本地发现平台
查看智能体将如何发现您的服务。
1.  确保已安装 Docker 和 Docker Compose。
2.  从项目根目录运行：
    ```bash
    docker-compose -f tools/platform-docker-compose.yml up
    ```
3.  这将启动一个本地平台。访问 `http://localhost:8080/.well-known/aisi.json` 查看列出服务的平台清单。

## 第四步：使您的服务可被发现
要发布您的服务：
1.  将您的服务 JSON 文件（例如 `my-service.json`）放在您域名下可公开访问的位置。
2.  更新您平台的 `/.well-known/aisi.json` 清单，将您服务的 `id` 包含在 `services` 数组中。

## 下一步
- 阅读完整的[协议规范](./SPECIFICATION.md)。
- 探索[示例服务表单](../examples/)中的 `food_delivery`、`device_repair` 和 `digital_service`。
- 通过我们的[贡献指南](./CONTRIBUTING.md)参与生态建设。


# AISI 协议规范 - 版本 1.0

## 1. 概述
AISI 协议定义了一种基于 JSON 的标准化格式，用于以适合智能体（Agent）发现和调用的方式描述服务。其主要目标是提供一种**清晰、无歧义的结构**来承载任何服务描述。

## 2. 数据格式规范
一份有效的 AISI 服务描述文档（可称为“服务表单”）是一个 JSON 对象，其结构如下。标记为 **必须** 的字段是必需的。

### 2.1 根对象
```json
{
  “aisi_version”: “1.0”，
  “kind”: “AtomicService”，
  “metadata”: { /* ... */ }，
  “extensions”: { /* ... */ }，
  “api”: [ /* ... */ ]
}
aisi_version (字符串，必须)：协议版本。本文档定义版本 “1.0”。
kind (字符串，必须)：对象类型。对于服务描述，此项必须为 “AtomicService”。
2.2 元数据对象

metadata 对象包含用于识别、分类和路由的核心信息。

json
{
  “metadata”: {
    “id”: “aisi://laojie/braised-pork-rice”，
    “name”: “老街经典卤肉饭”，
    “service_type”: “food_delivery”，
    “provider”: {
      “name”: “老街卤肉饭”，
      “id”: “laojie”
    }，
    “tags”: [“卤肉饭”， “外卖”， “中式”]，
    “base_endpoint”: “https://api.laojie.com/aisi/v1”
  }
}
id (字符串，必须)：服务的全局唯一标识符。建议使用 aisi:// 方案。
service_type (字符串，必须)：高层级分类。初始类型见附录 A。
provider (对象，必须)：标识服务提供方。
tags (字符串数组，必须)：供智能体进行语义匹配的关键词。
base_endpoint (字符串，必须)：调用服务 API 的基础 URL。
2.3 扩展对象

extensions 对象存放与服务类型相关的具体参数。其顶级键名必须与 metadata.service_type 的值匹配。

json
{
  “extensions”: {
    “food_delivery”: {
      “dish”: { “name”: “...”， “unit_price”: 28.00 }，
      “order_constraints”: { “min_order_quantity”: 1 }
    }
  }
}
每种 service_type 的内部结构在独立的模式文件中定义（见 /schemas）。这允许灵活且有结构的描述。

2.4 API 数组

api 数组定义如何调用该服务。

json
{
  “api”: [
    {
      “name”: “placeOrder”，
      “path”: “/orders”，
      “method”: “POST”，
      “request_schema_ref”: “#/extensions/food_delivery/order_schema”
    }
  ]
}
每个 API 必须定义 name、path 和 method。
request_schema_ref (字符串，必须)：一个 JSON Pointer 引用，指向 extensions 对象内定义预期请求结构的模式。这能将可调用接口与所描述的服务参数紧密耦合。
3. 服务发现

为使智能体能够发现服务，服务平台应提供一个知名端点：

端点：GET /.well-known/aisi.json
响应：一个 PlatformManifest 对象，列出该平台下所有可用服务的 id。
附录 A：初始服务类型

v1.0 版本定义了以下 service_type 值及其对应的必需 extensions 结构：

food_delivery：必须包含 dish 和 order_constraints。
device_repair：必须包含 target_device 和 repair_actions。
digital_service：必须包含 input_spec 和 output_spec。
详细的 JSON 模式在协议仓库中维护。
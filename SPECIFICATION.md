# AISI Protocol Specification - Version 1.0

## 1. Overview
The AISI Protocol defines a standardized JSON-based format for describing services in a way that is optimized for discovery and invocation by intelligent agents (Agents). Its primary goal is to provide a **clear, unambiguous structure** for any service description.

## 2. Data Format Specification
A valid AISI service description document (a "Service Form") is a JSON object with the following structure. Fields marked as **MUST** are required.

### 2.1 Root Object
```json
{
  "aisi_version": "1.0",
  "kind": "AtomicService",
  "metadata": { /* ... */ },
  "extensions": { /* ... */ },
  "api": [ /* ... */ ]
}
aisi_version (string, MUST): The protocol version. This document defines version "1.0".
kind (string, MUST): The type of object. For a service description, this MUST be "AtomicService".
2.2 Metadata Object

The metadata object contains core information for identification, categorization, and routing.

json
{
  "metadata": {
    "id": "aisi://pizzahub/pepperoni-pizza",
    "name": "Pepperoni Pizza Delivery",
    "service_type": "food_delivery",
    "provider": {
      "name": "PizzaHub Downtown",
      "id": "pizzahub"
    },
    "tags": ["pizza", "delivery", "italian"],
    "base_endpoint": "https://api.pizzahub.com/aisi/v1"
  }
}
id (string, MUST): A globally unique identifier for the service. The aisi:// scheme is recommended.
service_type (string, MUST): A high-level category. See Appendix A for initial types.
provider (object, MUST): Identifies the service provider.
tags (array of strings, MUST): Keywords for semantic matching by agents.
base_endpoint (string, MUST): The base URL for invoking the service's APIs.
2.3 Extensions Object

The extensions object holds service-type-specific parameters. Its top-level key MUST match the value of metadata.service_type.

json
{
  "extensions": {
    "food_delivery": {
      "dish": { "name": "...", "unit_price": 15.99 },
      "order_constraints": { "min_order_quantity": 1 }
    }
  }
}
The internal structure for each service_type is defined in separate schema files (see /schemas). This allows for flexible yet structured descriptions.

2.4 API Array

The api array defines how the service can be invoked.

json
{
  "api": [
    {
      "name": "placeOrder",
      "path": "/orders",
      "method": "POST",
      "request_schema_ref": "#/extensions/food_delivery/order_schema"
    }
  ]
}
Each API must define name, path, and method.
request_schema_ref (string, MUST): A JSON Pointer reference to a schema within the extensions object that defines the expected request structure. This tightly couples the callable interface with the service's described parameters.
3. Service Discovery

To enable agent discovery, a service platform SHOULD provide a well-known endpoint:

Endpoint: GET /.well-known/aisi.json
Response: A PlatformManifest object listing the ids of all available services under that platform.
Appendix A: Initial Service Types

For v1.0, the following service_type values are defined with their corresponding required extensions structures:

food_delivery: MUST contain dish and order_constraints.
device_repair: MUST contain target_device and repair_actions.
digital_service: MUST contain input_spec and output_spec.
Detailed JSON Schemas are maintained in the protocol repository.
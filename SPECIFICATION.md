# AISI Protocol Specification v1.0 (2026-01)

## 📅 Release Information
- **Protocol Version**: 2026-01
- **Release Date**: January 2026
- **Protocol Identifier**: `aisi_protocol: "2026-01"`
- **License**: Apache License 2.0

## 🎯 Protocol Overview

### Positioning Statement
AISI Protocol (Atomic Intelligent Service Interface Protocol) is an open protocol specification that **defines the AISI service description format, validation rules, and discovery mechanism**.

### Essential Clarification
- ❌ NOT a scheduling platform (like Google UCP)
- ❌ NOT an API description language (like OpenAPI)
- ✅ IS an intermediate protocol layer: the "standardized plug" connecting AI agents and services
- ✅ Core deliverable: Standardized JSON description format
- ✅ Core value: Reduce the connection cost between AI agents and services

### Design Principles
1. **Minimal Core**: Only essential fields to lower adoption barrier
2. **Progressive Enhancement**: v1.0 is basically usable, later versions gradually improve
3. **Strict Validation**: Four-level validation system ensures format compliance
4. **Open Ecosystem**: Avoid platform lock-in, welcome all participants
5. **Connection Priority**: Focus on connection value rather than technical perfection

## 📋 Protocol Structure

### Complete Field Structure
```json
{
  "aisi_protocol": "2026-01",                    // Required: Protocol version identifier
  "discovery": {                                 // Required: Discovery mechanism definition
    "identifier": "aisi://did:web:example.com/service"  // Required: Service identifier
  },
  "metadata": {                                  // Required: Service metadata
    "name": "Service Name",                      // Required: Service name
    "provider": "Service Provider",              // Required: Provider identifier
    "version": "1.0.0",                          // Required: Service version
    "description": "Service function description", // Optional: Detailed description
    "locale": "en-US"                            // Optional: Language locale
  },
  "api": {                                       // Required: API interface definition
    "endpoint": "https://api.example.com/v1",    // Required: API endpoint
    "specification": {                           // Optional: API specification
      "type": "openapi",                         // API type
      "version": "3.0.0"                         // Specification version
    }
  },
  "extensions": {                                // Optional: Extension fields
    "privacy": {},                               // Privacy extension
    "billing": {},                               // Billing extension
    "geography": {},                             // Geography extension
    "ui": {},                                    // UI extension
    "custom": {}                                 // Custom extension
  }
}
🔍 Detailed Field Specifications

1. aisi_protocol Field

Property	Value	Description
Field Name	aisi_protocol	Protocol version identifier
Type	String	Fixed format
Required	Yes	Must be included
Format	"YYYY-MM"	Year-month format
Current Value	"2026-01"	January 2026 version
Example	"2026-01"	
Specification:

Must use double quotes
Must exactly match "2026-01"
Used for protocol version compatibility checking
2. discovery Field

Property	Value	Description
Field Name	discovery	Service discovery definition
Type	Object	Contains discovery-related information
Required	Yes	Must be included
discovery.identifier Field

Property	Value	Description
Field Name	identifier	Service unique identifier
Type	String	URI format
Required	Yes	Must be included
Format	aisi://{did}/{service-name}	
Example	"aisi://did:web:example.com/pizza-delivery"	
DID Format Specification:

text
Three DID methods are supported:
1. did:web:{hostname}[:{path}]
   - Example: did:web:example.com:services:pizza
   - Resolution: GET https://example.com/.well-known/did.json

2. did:key:{multibase-encoded-public-key}
   - Example: did:key:z6Mkf5rGM...
   - Resolution: Local verification, no network required

3. did:ion:{anchor-string}
   - Example: did:ion:EiClkZ...
   - Resolution: Via Sidetree nodes

v1.0 recommends using did:web, simplest and most practical.
3. metadata Field

Property	Value	Description
Field Name	metadata	Service metadata
Type	Object	Contains service description information
Required	Yes	Must be included
metadata.name Field

Property	Value	Description
Field Name	name	Service name
Type	String	Human-readable name
Required	Yes	Must be included
Length Limit	1-100 characters	
Example	"Pizza Delivery Service"	
metadata.provider Field

Property	Value	Description
Field Name	provider	Service provider
Type	String	Provider identifier
Required	Yes	Must be included
Length Limit	1-100 characters	
Example	"PizzaCompany Inc."	
metadata.version Field

Property	Value	Description
Field Name	version	Service version
Type	String	Semantic versioning
Required	Yes	Must be included
Format	Semantic Version (SemVer)	
Example	"1.0.0", "2.1.5"	
Semantic Versioning Rules:

Major.Minor.Patch
Major version: Incompatible API changes
Minor version: Backward-compatible functionality additions
Patch version: Backward-compatible bug fixes
metadata.description Field

Property	Value	Description
Field Name	description	Service description
Type	String	Detailed function description
Required	No	Recommended to include
Length Limit	0-500 characters	
Example	"Pizza delivery service with 30-minute guarantee"	
metadata.locale Field

Property	Value	Description
Field Name	locale	Language locale
Type	String	BCP 47 language tag
Required	No	Optional
Format	RFC 5646 standard	
Example	"en-US", "zh-CN"	
4. api Field

Property	Value	Description
Field Name	api	API interface definition
Type	Object	Contains calling information
Required	Yes	Must be included
api.endpoint Field

Property	Value	Description
Field Name	endpoint	API endpoint
Type	String	URL format
Required	Yes	Must be included
Format	Valid HTTP/HTTPS URL	
Example	"https://api.example.com/v1/order"	
api.specification Field

Property	Value	Description
Field Name	specification	API specification definition
Type	Object	Contains specification information
Required	No	Recommended to include
specification.type Field:

Property	Value	Description
Field Name	type	API specification type
Type	String	Fixed enumeration values
Allowed Values	"openapi", "graphql", "grpc", "asyncapi"	
Default Value	"openapi"	
specification.version Field:

Property	Value	Description
Field Name	version	Specification version
Type	String	Version number
Example	"3.0.0", "2.0"	
5. extensions Field

Property	Value	Description
Field Name	extensions	Extension fields
Type	Object	Contains extension information
Required	No	Optional
Standard Extension Types

privacy Extension: Privacy policy related

json
{
  "privacy": {
    "data_retention": "30d",
    "gdpr_compliant": true,
    "privacy_policy_url": "https://example.com/privacy"
  }
}
billing Extension: Billing information

json
{
  "billing": {
    "currency": "USD",
    "min_amount": 0.01,
    "payment_methods": ["credit_card", "paypal"]
  }
}
geography Extension: Geographical restrictions

json
{
  "geography": {
    "countries": ["US", "CA", "UK"],
    "regions": ["North America", "Europe"],
    "timezone": "UTC"
  }
}
ui Extension: User interface hints

json
{
  "ui": {
    "color_scheme": "#FF6B35",
    "icon_url": "https://example.com/icon.png",
    "short_description": "Fast Pizza Delivery"
  }
}
custom Extension: Custom extensions

json
{
  "custom": {
    "business_hours": "9:00-21:00",
    "delivery_time": "30 minutes"
  }
}
🔄 Discovery Mechanism

Standard Discovery Process

text
Agent discovery process:
1. Obtain aisi:// identifier
   → Input: aisi://did:web:example.com/service

2. Resolve DID to get service endpoint
   → Request: GET https://example.com/.well-known/did.json
   → Response: DID document containing serviceEndpoint

3. Find AISI description endpoint
   → From DID document find: /well-known/aisi/service.json

4. Get complete AISI description
   → Request: GET https://example.com/.well-known/aisi/service.json
   → Response: Complete AISI JSON

5. Validate and call service
   → Validate format compliance
   → Call api.endpoint
Discovery Failure Strategy

Strict Strategy: If any step fails, the agent completely abandons the service
Validation Levels:

DID resolution failure → Abandon
AISI endpoint 404 → Abandon
Format validation failure → Abandon
API call failure → Log but don't abandon (may be temporary issue)
.well-known Endpoint Specification

text
Standard location:
https://{domain}/.well-known/aisi/{service-name}.json

Optional directory format:
https://{domain}/.well-known/aisi.json
Returns directory of all services:
{
  "services": [
    "aisi://did:web:example.com/service1",
    "aisi://did:web:example.com/service2"
  ]
}
🛠️ Validation Standards

Four-Level Validation System

Level 1: Structural Validation

text
Check content:
✅ JSON syntax correctness
✅ Contains all required fields
✅ Field types correct
✅ aisi_protocol field value is "2026-01"

Tool:
aisi-validate --level=1 service.json
Level 2: Semantic Validation

text
Check content:
✅ Version number follows semantic versioning specification
✅ URL format validity
✅ DID identifier format correct
✅ Extension field structure reasonable

Tool:
aisi-validate --level=2 service.json
Level 3: Business Validation (v1.x planned)

text
Check content:
✅ API endpoint reachability
✅ OpenAPI document consistency
✅ Service description matches actual capabilities

Tool:
aisi-validate --level=3 service.json
Level 4: Quality Validation (v2.0 planned)

text
Check content:
✅ Service performance benchmarks
✅ User review authenticity
✅ SLA commitment feasibility
✅ Security compliance

Tool:
aisi-validate --level=4 service.json
Compliance Checklist

markdown
## Must Include Fields
- [ ] aisi_protocol: "2026-01"
- [ ] discovery.identifier: aisi:// format
- [ ] metadata.name: Service name
- [ ] metadata.provider: Provider
- [ ] metadata.version: Semantic version
- [ ] api.endpoint: Valid URL

## Recommended Fields
- [ ] metadata.description: Service description
- [ ] metadata.locale: Language locale
- [ ] api.specification.type: API type
- [ ] api.specification.version: Specification version

## Format Requirements
- [ ] Valid JSON format
- [ ] All strings use double quotes
- [ ] Version number format correct
- [ ] DID identifier format correct
📋 Version Compatibility

Protocol Version Management

text
Current version: 2026-01
Format: YYYY-MM (Year-Month)

Version evolution rules:
1. Monthly updates: 2026-02, 2026-03 (minor versions)
2. Annual updates: 2027-01 (major versions)
3. Backward compatibility: Higher version agents compatible with lower version protocols
4. Forward compatibility: Lower version agents ignore不理解 higher version fields
Service Version Management

text
Service version: metadata.version
Format: Semantic Versioning (SemVer)

Version rules:
- Major version change (1.0.0 → 2.0.0): Incompatible API changes
- Minor version change (1.0.0 → 1.1.0): Backward-compatible functionality additions
- Patch version change (1.0.0 → 1.0.1): Backward-compatible bug fixes
🎯 Usage Examples

Example 1: Minimum Compliant Service

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:pizzacompany.com/pizza-delivery"
  },
  "metadata": {
    "name": "Pizza Delivery Service",
    "provider": "Pizza Company",
    "version": "1.0.0"
  },
  "api": {
    "endpoint": "https://api.pizzacompany.com/v1/order"
  }
}
Example 2: Complete Service Description

json
{
  "aisi_protocol": "2026-01",
  "discovery": {
    "identifier": "aisi://did:web:weather.example.com/forecast"
  },
  "metadata": {
    "name": "Weather Forecast Service",
    "provider": "Weather Data Company",
    "version": "2.1.3",
    "description": "Provides 7-day weather forecasts for major global cities",
    "locale": "en-US"
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
      "currency": "USD",
      "price_per_call": 0.01
    },
    "geography": {
      "supported_countries": ["US", "CA", "UK", "AU"],
      "timezone": "UTC"
    }
  }
}
🔧 Toolchain Support

Core Tools

Validation Tools:

bash
# CLI Validator
npm install -g aisi-validator
aisi-validate service.json

# Online Validator
# https://aisi-protocol.github.io/validator
Generation Tools:

bash
# Web Form Generator
# https://aisi-protocol.github.io/generator

# Command Line Generator
aisi-generate --name "My Service"
Discovery Tools:

javascript
// JavaScript SDK
import { discoverService } from '@aisi-protocol/sdk';

const service = await discoverService(
  'aisi://did:web:example.com/service'
);
Development Tools

JSON Schema:

json
{
  "$schema": "https://aisi-protocol.org/schemas/v2026-01.json",
  "$ref": "#/definitions/AISI"
}
📚 Documentation System

Core Documents

text
aisi-protocol/
├── SPECIFICATION.md          # Main specification (this document)
├── zh-CN/SPECIFICATION.md    # Chinese specification
├── GETTING-STARTED.md        # Quick start guide
├── FAQ.md                    # Frequently asked questions
├── COMPLIANCE-CHECKLIST.md   # Compliance checklist
├── DID-IMPLEMENTATION.md     # DID implementation guide
├── EXAMPLES.md               # Example collection
└── TOOLCHAIN.md              # Toolchain documentation
Reference Implementations

text
examples/
├── v2026-01-pizza-delivery.json     # Pizza delivery
├── v2026-01-phone-repair.json       # Phone repair
├── v2026-01-report-service.json     # Digital report
├── v2026-01-weather-service.json    # Weather forecast
└── v2026-01-payment-service.json    # Payment service
⚖️ Compliance and Licensing

License

Protocol Specification: Creative Commons Attribution 4.0
Reference Implementation: Apache License 2.0
Tool Software: MIT License
Compliance

Format Compliance: Verified through validation tools
Discovery Compliance: Implements standard discovery mechanism
Version Compliance: Uses correct version identifier
Security Compliance: Follows security best practices
Certification Mark

text
Compliant services can use the mark:
"This service complies with AISI Protocol v2026-01 specification"
📈 Development Roadmap

v1.0 (2026-01) Goals

Define core protocol structure
Establish basic validation mechanism
Provide complete toolchain foundation
Create reference implementation examples
v1.x (2026) Plans

Extend standard extension sets
Enhance validation tools
Improve developer experience
Build community ecosystem
v2.0 (2027) Vision

Service quality rating system
Agent preference learning
Cross-chain service discovery
Multi-party secure computation
📞 Support and Contribution

Get Support

GitHub Issues: Report problems
Discussions: Technical discussions
Mailing List: Protocol update notifications
Community Forum: User communication
Participate in Contribution

Submit Issues: Report bugs or suggestions
Contribute Code: Improve toolchain
Write Documentation: Improve usage guides
Share Cases: Showcase practical applications
Participate in Discussions: Protocol evolution discussions
Protocol Identifier: aisi_protocol: "2026-01"
Release Status: Officially Released
Maintenance Team: AISI Protocol Community
Official Website: https://github.com/aisi-protocol/aisi-protocol
Update Date: January 2026

The final interpretation right of this specification belongs to the AISI Protocol community. Changes may be made without prior notice.
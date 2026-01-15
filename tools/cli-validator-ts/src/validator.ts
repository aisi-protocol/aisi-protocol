import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// 核心：定义内联的 AISI JSON Schemas（简化版，实际应更完整）
const AISI_SCHEMAS = {
  AtomicService: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    required: ["aisi_version", "kind", "metadata"],
    properties: {
      aisi_version: { type: "string", const: "1.0" },
      kind: { type: "string", const: "AtomicService" },
      metadata: {
        type: "object",
        required: ["id", "name", "version"],
        properties: {
          id: { type: "string", pattern: "^urn:aisi:.+" },
          name: { type: "string" },
          version: { type: "string" },
          description: { type: "string" },
          tags: { type: "array", items: { type: "string" } }
        }
      },
      api: { type: "array" },
      schemas: { type: "array" }
    }
  },
  PlatformManifest: {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    required: ["aisi_version", "kind", "platform_id", "name"],
    properties: {
      aisi_version: { type: "string", const: "1.0" },
      kind: { type: "string", const: "PlatformManifest" },
      platform_id: { type: "string" },
      name: { type: "string" },
      endpoint_base: { type: "string", format: "uri" },
      supported_versions: { type: "array", items: { type: "string" } },
      services: { type: "array", items: { type: "string" } }
    }
  }
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateAtomicService = ajv.compile(AISI_SCHEMAS.AtomicService);
const validatePlatformManifest = ajv.compile(AISI_SCHEMAS.PlatformManifest);

export function validateFile(filePath: string): void {
  try {
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    let isValid = false;
    let kind = 'Unknown';

    if (data.kind === 'AtomicService') {
      isValid = validateAtomicService(data);
      kind = 'AtomicService';
    } else if (data.kind === 'PlatformManifest') {
      isValid = validatePlatformManifest(data);
      kind = 'PlatformManifest';
    } else {
      console.error(`❌ ${filePath}: Unknown "kind" field (must be AtomicService or PlatformManifest)`);
      return;
    }

    if (isValid) {
      console.log(`✅ Valid: ${filePath} (${kind} v${data.aisi_version})`);
    } else {
      console.error(`❌ Invalid: ${filePath} (${kind})`);
      (validateAtomicService.errors || validatePlatformManifest.errors)?.forEach(err => {
        console.error(`  - Error: ${err.instancePath} ${err.message}`);
      });
    }
  } catch (error: any) {
    console.error(`⚠️  Failed to process ${filePath}: ${error.message}`);
  }
}

export function validateDirectory(directory: string): void {
  try {
    const files = readdirSync(directory).filter(f => f.endsWith('.json'));
    console.log(`Validating ${files.length} JSON file(s) in ${directory}...`);
    files.forEach(file => validateFile(join(directory, file)));
  } catch (error: any) {
    console.error(`Failed to read directory ${directory}: ${error.message}`);
  }
}
#!/usr/bin/env node

/**
 * AISI Protocol Validator v1.0.0
 * CLI tool for validating AISI service description files
 * 
 * Usage:
 *   aisi-validate <file.json>
 *   aisi-validate --version
 *   aisi-validate --help
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');
const boxen = require('boxen');

// Package info
const pkg = require('./package.json');

// Validation schema
const SCHEMA = {
  required: ['aisi_protocol', 'discovery', 'metadata', 'api'],
  fields: {
    'aisi_protocol': {
      type: 'string',
      required: true,
      pattern: /^2026-01$/,
      message: 'Must be exactly "2026-01"'
    },
    'discovery.identifier': {
      type: 'string',
      required: true,
      pattern: /^aisi:\/\/did:(web|key|ion):[^/]+\/.+$/,
      message: 'Must be in format: aisi://did:{method}:{id}/{service}'
    },
    'metadata.name': {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100,
      message: 'Must be 1-100 characters'
    },
    'metadata.provider': {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100,
      message: 'Must be 1-100 characters'
    },
    'metadata.version': {
      type: 'string',
      required: true,
      pattern: /^\d+\.\d+\.\d+$/,
      message: 'Must be semantic version (e.g., 1.0.0)'
    },
    'api.endpoint': {
      type: 'string',
      required: true,
      pattern: /^https?:\/\/.+/,
      message: 'Must be a valid HTTP/HTTPS URL'
    }
  }
};

/**
 * Get nested property from object
 */
function getProp(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

/**
 * Validate a single field
 */
function validateField(obj, fieldPath, rules) {
  const value = getProp(obj, fieldPath);
  const errors = [];

  // Check required
  if (rules.required && (value === undefined || value === null || value === '')) {
    errors.push(`Field "${fieldPath}" is required`);
    return errors;
  }

  if (value === undefined || value === null) {
    return errors; // Optional field not present
  }

  // Check type
  if (rules.type && typeof value !== rules.type) {
    errors.push(`Field "${fieldPath}" must be ${rules.type}, got ${typeof value}`);
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(`Field "${fieldPath}" ${rules.message || 'has invalid format'}`);
  }

  // Check min/max length for strings
  if (rules.type === 'string' && value !== undefined) {
    if (rules.minLength !== undefined && value.length < rules.minLength) {
      errors.push(`Field "${fieldPath}" must be at least ${rules.minLength} characters`);
    }
    if (rules.maxLength !== undefined && value.length > rules.maxLength) {
      errors.push(`Field "${fieldPath}" must be at most ${rules.maxLength} characters`);
    }
  }

  return errors;
}

/**
 * Validate entire AISI JSON object
 */
function validateAISI(json) {
  const errors = [];
  const warnings = [];

  // Check JSON structure
  if (typeof json !== 'object' || json === null) {
    errors.push('Invalid JSON: must be an object');
    return { errors, warnings, isValid: false };
  }

  // Check required top-level fields
  for (const field of SCHEMA.required) {
    if (!json.hasOwnProperty(field)) {
      errors.push(`Missing required field: "${field}"`);
    }
  }

  // Validate individual fields
  for (const [fieldPath, rules] of Object.entries(SCHEMA.fields)) {
    const fieldErrors = validateField(json, fieldPath, rules);
    errors.push(...fieldErrors);
  }

  // Check optional but recommended fields
  const recommendedFields = [
    'metadata.description',
    'metadata.locale',
    'api.specification.type'
  ];

  for (const field of recommendedFields) {
    if (getProp(json, field) === undefined) {
      warnings.push(`Recommended field missing: "${field}"`);
    }
  }

  // Validate extensions structure if present
  if (json.extensions && typeof json.extensions !== 'object') {
    errors.push('Field "extensions" must be an object');
  }

  // Check aisi_protocol value
  if (json.aisi_protocol !== '2026-01') {
    errors.push(`aisi_protocol must be "2026-01", got "${json.aisi_protocol}"`);
  }

  // Check identifier format
  if (json.discovery && json.discovery.identifier) {
    const identifier = json.discovery.identifier;
    if (!identifier.startsWith('aisi://')) {
      errors.push('discovery.identifier must start with "aisi://"');
    }
    
    // Suggest did:web for v1.0
    if (!identifier.includes('did:web:') && !identifier.includes('did:key:') && !identifier.includes('did:ion:')) {
      errors.push('discovery.identifier must use did:web, did:key, or did:ion method');
    } else if (!identifier.includes('did:web:')) {
      warnings.push('For v1.0, did:web is recommended (simplest to implement)');
    }
  }

  // Check version format
  if (json.metadata && json.metadata.version) {
    const version = json.metadata.version;
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      errors.push(`metadata.version must be semantic version (e.g., 1.0.0), got "${version}"`);
    }
  }

  // Check endpoint URL
  if (json.api && json.api.endpoint) {
    const endpoint = json.api.endpoint;
    if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
      errors.push('api.endpoint must start with http:// or https://');
    }
  }

  const isValid = errors.length === 0;
  return { errors, warnings, isValid };
}

/**
 * Read and parse JSON file
 */
function readJSONFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    } else if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON: ${error.message}`);
    } else {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }
}

/**
 * Format validation results for display
 */
function formatResults(results, verbose = false) {
  const output = [];

  if (results.isValid) {
    output.push(chalk.green.bold('✅ AISI v2026-01 validation passed!'));
    
    if (results.warnings.length > 0) {
      output.push(chalk.yellow('\n⚠️  Warnings:'));
      results.warnings.forEach(warning => {
        output.push(chalk.yellow(`  • ${warning}`));
      });
    }
    
    if (verbose) {
      output.push(chalk.gray('\n✓ All required fields are present and valid'));
      output.push(chalk.gray('✓ JSON structure is correct'));
      output.push(chalk.gray('✓ Protocol version is 2026-01'));
    }
  } else {
    output.push(chalk.red.bold('❌ AISI validation failed:'));
    
    if (results.errors.length > 0) {
      output.push(chalk.red('\nErrors:'));
      results.errors.forEach(error => {
        output.push(chalk.red(`  • ${error}`));
      });
    }
    
    if (results.warnings.length > 0) {
      output.push(chalk.yellow('\nWarnings:'));
      results.warnings.forEach(warning => {
        output.push(chalk.yellow(`  • ${warning}`));
      });
    }
  }

  return output.join('\n');
}

/**
 * Display help information
 */
function showHelp() {
  console.log(boxen(
    chalk.cyan.bold('AISI Protocol Validator v' + pkg.version) + '\n\n' +
    chalk.gray('Validate AISI service description files against v2026-01 specification\n\n') +
    chalk.white('Usage:\n') +
    chalk.green('  aisi-validate ') + chalk.cyan('<file.json>') + '\n' +
    chalk.green('  aisi-validate ') + chalk.cyan('--version') + '\n' +
    chalk.green('  aisi-validate ') + chalk.cyan('--help') + '\n' +
    chalk.green('  aisi-validate ') + chalk.cyan('--verbose') + ' ' + chalk.cyan('<file.json>') + '\n\n' +
    chalk.white('Options:\n') +
    chalk.cyan('  --version') + chalk.gray('           Show version') + '\n' +
    chalk.cyan('  --help, -h') + chalk.gray('          Show this help') + '\n' +
    chalk.cyan('  --verbose, -v') + chalk.gray('       Show detailed output') + '\n' +
    chalk.cyan('  --output <format>') + chalk.gray('   Output format (text, json)') + '\n' +
    chalk.cyan('  --level <1|2>') + chalk.gray('       Validation level (1=basic, 2=strict)'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    }
  ));

  console.log(chalk.gray('\nExamples:'));
  console.log(chalk.green('  $ aisi-validate service.json'));
  console.log(chalk.green('  $ aisi-validate --verbose service.json'));
  console.log(chalk.green('  $ aisi-validate --output=json service.json > results.json'));
}

/**
 * Main CLI function
 */
async function main() {
  program
    .name('aisi-validate')
    .description('Validate AISI service description files')
    .version(pkg.version)
    .option('-v, --verbose', 'verbose output')
    .option('--output <format>', 'output format (text, json)', 'text')
    .option('--level <number>', 'validation level (1=basic, 2=strict)', '1')
    .argument('[file]', 'AISI JSON file to validate')
    .action(async (file, options) => {
      if (!file) {
        console.error(chalk.red('Error: No file specified'));
        console.log(chalk.gray('Use --help for usage information'));
        process.exit(1);
      }

      try {
        // Read and parse file
        const json = readJSONFile(file);
        
        // Validate
        const results = validateAISI(json);
        
        // Output based on format
        if (options.output.toLowerCase() === 'json') {
          console.log(JSON.stringify({
            file: path.basename(file),
            timestamp: new Date().toISOString(),
            isValid: results.isValid,
            errors: results.errors,
            warnings: results.warnings,
            validationLevel: parseInt(options.level)
          }, null, 2));
        } else {
          console.log(formatResults(results, options.verbose));
          
          if (!results.isValid) {
            process.exit(1);
          }
        }
      } catch (error) {
        console.error(chalk.red.bold('Error:'), chalk.red(error.message));
        if (options.verbose) {
          console.error(chalk.gray(error.stack));
        }
        process.exit(1);
      }
    });

  // Handle help separately
  program.on('--help', () => {
    console.log('\n' + chalk.gray('For more information, visit:'));
    console.log(chalk.blue('https://github.com/aisi-protocol/aisi-protocol'));
  });

  // Parse arguments
  program.parse(process.argv);

  // Show help if no arguments
  if (process.argv.length === 2) {
    showHelp();
  }
}

// Run the CLI
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red.bold('Fatal error:'), error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  });
}

// Export for programmatic use
module.exports = {
  validateAISI,
  readJSONFile,
  formatResults
};
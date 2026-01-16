#!/usr/bin/env node

/**
 * AISI Validator CLI Entry Point
 * 
 * This file is the actual CLI executable that gets installed globally.
 * It simply loads and runs the main validator module.
 */

'use strict';

// Add error handling for missing dependencies
try {
  // Check if we're running from source or installed globally
  const path = require('path');
  
  // Try to load the main module
  let validator;
  
  // First try to load from the local directory (for development)
  try {
    validator = require(path.join(__dirname, '..', 'index.js'));
  } catch (err) {
    // If that fails, try to load from the installed location
    validator = require('aisi-validator');
  }
  
  // If we're being required as a module, export the validator
  if (require.main !== module) {
    module.exports = validator;
  } else {
    // Otherwise, run the CLI
    validator.main().catch(error => {
      console.error('❌ Fatal error:', error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    });
  }
  
} catch (error) {
  // Handle initialization errors
  console.error(`
🔥 AISI Validator Failed to Start
   
Error: ${error.message}
   
This usually means:
1. Required dependencies are missing - try running: npm install
2. The module is corrupted - try reinstalling
3. Node.js version is too old - requires Node.js 14+

For more help:
• Check installation: https://github.com/aisi-protocol/aisi-protocol
• Report issue: https://github.com/aisi-protocol/aisi-protocol/issues
`);
  
  // Provide helpful debug info
  if (process.env.DEBUG) {
    console.error('\nDebug Info:');
    console.error('Node.js version:', process.version);
    console.error('Platform:', process.platform);
    console.error('Architecture:', process.arch);
    console.error('Module path:', __dirname);
    console.error('Error stack:', error.stack);
  }
  
  process.exit(1);
}
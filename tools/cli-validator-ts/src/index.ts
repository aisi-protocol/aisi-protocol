#!/usr/bin/env node
import { Command } from 'commander';
import { validateFile, validateDirectory } from './src/validator';
const program = new Command();

program
  .name('aisi-validator')
  .description('CLI to validate AISI Protocol JSON files against v1.0 schemas')
  .version('1.0.0');

program
  .command('validate <filePath>')
  .description('Validate a single JSON file')
  .action((filePath) => {
    validateFile(filePath);
  });

program
  .command('validate-dir <directory>')
  .description('Validate all JSON files in a directory')
  .action((directory) => {
    validateDirectory(directory);
  });

program.parse();
#!/bin/bash
echo "🔍 AISI Protocol 快速检查"
echo "========================"
echo "📁 检查文件数量..."
find . -type f -name "*.md" -o -name "*.json" -o -name "*.sh" -o -name "*.yml" -o -name "*.html" | wc -l
echo "📄 检查核心文件..."
ls -la SPECIFICATION.md GETTING-STARTED.md README.md LICENSE
echo "📦 检查示例文件..."
ls -la examples/*.json
echo "✅ 快速检查完成"

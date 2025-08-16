#!/usr/bin/env node

/**
 * Pre-commit security check script
 * Run this before committing to ensure no sensitive data is exposed
 */

const fs = require('fs');
const path = require('path');

// Patterns that indicate potential security issues
const SECURITY_PATTERNS = [
  // API Keys
  /(apiKey|api_key|API_KEY)\s*[:=]\s*["'][^"']+["']/gi,
  /(firebase|openai|gemini|google).*key\s*[:=]\s*["'][^"']+["']/gi,
  
  // Private keys and certificates
  /-----BEGIN PRIVATE KEY-----/gi,
  /-----BEGIN RSA PRIVATE KEY-----/gi,
  /-----BEGIN CERTIFICATE-----/gi,
  
  // Service account patterns
  /"type"\s*:\s*"service_account"/gi,
  /"private_key_id"\s*:/gi,
  /"client_email"\s*:/gi,
  
  // Hardcoded credentials
  /(password|secret|token)\s*[:=]\s*["'][^"']+["']/gi,
  
  // Firebase config patterns
  /"projectId"\s*:\s*["'][^"']+["']/gi,
  /"authDomain"\s*:\s*["'][^"']+["']/gi,
  
  // URLs with actual domains (not placeholders)
  /https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi
];

// Files that should never contain sensitive data
const SENSITIVE_FILES = [
  'app.config.js',
  'package.json',
  'package-lock.json',
  'yarn.lock'
];

// Placeholder patterns that are safe
const SAFE_PATTERNS = [
  /YOUR_.*_HERE/gi,
  /your-.*-here/gi,
  /placeholder/gi,
  /example/gi,
  /template/gi
];

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for security patterns
    SECURITY_PATTERNS.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        // Check if matches are actually safe placeholders
        const unsafeMatches = matches.filter(match => {
          return !SAFE_PATTERNS.some(safePattern => safePattern.test(match));
        });
        
        if (unsafeMatches.length > 0) {
          issues.push({
            type: 'SECURITY_RISK',
            pattern: pattern.toString(),
            matches: unsafeMatches.slice(0, 3), // Show first 3 matches
            line: content.split('\n').findIndex(line => pattern.test(line)) + 1
          });
        }
      }
    });
    
    return issues;
  } catch (error) {
    return [{ type: 'ERROR', message: `Could not read file: ${error.message}` }];
  }
}

function scanDirectory(dir, excludeDirs = ['node_modules', '.git', '.expo', 'build', 'dist']) {
  const issues = [];
  
  function scanRecursive(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!excludeDirs.includes(item)) {
          scanRecursive(fullPath);
        }
      } else if (item.match(/\.(js|jsx|ts|tsx|json|md|txt)$/)) {
        const fileIssues = checkFile(fullPath);
        if (fileIssues.length > 0) {
          issues.push({
            file: fullPath,
            issues: fileIssues
          });
        }
      }
    }
  }
  
  scanRecursive(dir);
  return issues;
}

function main() {
  console.log('🔒 Running pre-commit security check...\n');
  
  const projectRoot = process.cwd();
  const issues = scanDirectory(projectRoot);
  
  if (issues.length === 0) {
    console.log('✅ No security issues found. Safe to commit!');
    process.exit(0);
  }
  
  console.log('❌ Security issues found! Please fix before committing:\n');
  
  issues.forEach(({ file, issues: fileIssues }) => {
    console.log(`📁 ${file}:`);
    fileIssues.forEach(issue => {
      if (issue.type === 'SECURITY_RISK') {
        console.log(`   🚨 SECURITY RISK: ${issue.pattern}`);
        console.log(`      Matches: ${issue.matches.join(', ')}`);
        if (issue.line) {
          console.log(`      Line: ${issue.line}`);
        }
      } else {
        console.log(`   ❌ ERROR: ${issue.message}`);
      }
    });
    console.log('');
  });
  
  console.log('💡 Recommendations:');
  console.log('   - Use environment variables for sensitive data');
  console.log('   - Use placeholder values in example files');
  console.log('   - Check .gitignore includes sensitive files');
  console.log('   - Review SECURITY.md for best practices');
  
  process.exit(1);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { checkFile, scanDirectory }; 
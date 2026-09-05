const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building MineGuard AI for GitHub Pages...');

const rootDir = __dirname;
const outDir = path.join(rootDir, 'out-pages');

// Clean out-pages directory
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// Path to local next binary
const nextBin = path.join(rootDir, 'node_modules', '.bin', 'next');

// Build Admin Dashboard
console.log('📦 1/2 Building Admin Dashboard...');
execSync(`"${nextBin}" build frontend/admin`, { stdio: 'inherit', cwd: rootDir });
const adminOut = path.join(rootDir, 'frontend', 'admin', 'out');
fs.cpSync(adminOut, path.join(outDir, 'admin'), { recursive: true });

// Also copy admin to root of outDir so direct root URL opens Admin dashboard
fs.cpSync(adminOut, outDir, { recursive: true });

// Build User Safety PWA
console.log('📱 2/2 Building Worker Safety PWA...');
execSync(`"${nextBin}" build frontend/user`, { stdio: 'inherit', cwd: rootDir });
const userOut = path.join(rootDir, 'frontend', 'user', 'out');
fs.cpSync(userOut, path.join(outDir, 'user'), { recursive: true });

// Create .nojekyll for GitHub Pages
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

console.log('✅ GitHub Pages build bundle ready at out-pages/');

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building MineGuard AI for Vercel unified deployment...');

const rootDir = __dirname;
const outDir = path.join(rootDir, 'out-pages');
const nextBin = path.join(rootDir, 'node_modules', '.bin', 'next');

// Clean out-pages directory
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 1. Build Admin Dashboard with basePath: /admin
console.log('📦 1/2 Building Admin Dashboard for Vercel with basePath: /admin ...');
execSync(`"${nextBin}" build frontend/admin`, {
  stdio: 'inherit',
  cwd: rootDir,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: '/admin' },
});
const adminOut = path.join(rootDir, 'frontend', 'admin', 'out');
fs.cpSync(adminOut, path.join(outDir, 'admin'), { recursive: true });

// 2. Build User Safety PWA with basePath: /user
console.log('📱 2/2 Building Worker Safety PWA for Vercel with basePath: /user ...');
execSync(`"${nextBin}" build frontend/user`, {
  stdio: 'inherit',
  cwd: rootDir,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: '/user' },
});
const userOut = path.join(rootDir, 'frontend', 'user', 'out');
fs.cpSync(userOut, path.join(outDir, 'user'), { recursive: true });

// 3. Create Root Landing Portal at out-pages/index.html
const landingHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MINEGUARD AI | Multi-Zone Mining Subsidence & Safety Platform</title>
  <link rel="icon" type="image/png" href="/admin/favicon.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    .radar-glow { animation: pulse-slow 4s infinite ease-in-out; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen font-sans flex flex-col justify-between selection:bg-rose-900 selection:text-white">
  <!-- Top Navigation Bar -->
  <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-700 to-rose-950 flex items-center justify-center font-black text-white text-lg shadow-lg border border-rose-600/40">
          MG
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-base tracking-tight text-white">MINEGUARD AI</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60">SIH 2026</span>
          </div>
          <p class="text-xs text-slate-400">Mining Subsidence & Geotechnical Safety Platform</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          9 IoT Nodes Active
        </span>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-6xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
    <div class="text-center space-y-4 max-w-3xl mx-auto mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
        <span>🛰 Sentinel-1 InSAR Radar</span>
        <span>•</span>
        <span>BNO055 + ADXL-345 + VL53L0X</span>
      </div>
      <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight">
        "Safer Mines. <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">Smarter Tomorrow."</span>
      </h1>
      <p class="text-sm md:text-base text-slate-400 leading-relaxed">
        Next-generation multi-zone mining subsidence monitoring, slope stability early warning, and field worker evacuation guidance platform.
      </p>
    </div>

    <!-- Application Portals Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
      <!-- Card 1: Admin Dashboard -->
      <a href="/admin/" class="group relative bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-2xl hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between hover:shadow-rose-950/20 hover:scale-[1.01]">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-md bg-rose-950 text-rose-300 border border-rose-800/80 text-xs font-bold uppercase tracking-wider">
              Desktop Control Center
            </span>
            <span class="text-xs font-mono text-slate-500">Admin Portal</span>
          </div>
          <div>
            <h2 class="text-2xl font-black text-white group-hover:text-rose-400 transition">
              Admin Geotechnical Dashboard
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Analytical monitoring center for geotechnical engineers, safety officers, and mine administrators.
            </p>
          </div>
          <ul class="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <strong>Leaflet Sentinel-1 InSAR Subsidence Heatmap SDK</strong>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <strong>3D Terraced Open-Cast Terrain Digital Twin</strong>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <strong>3 Mining Sectors • 9 IoT Field Sensor Nodes</strong>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <strong>SIH 2026 Interactive Scenario Demo Controller</strong>
            </li>
          </ul>
        </div>

        <div class="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 group-hover:text-slate-200">Open Admin Center</span>
          <span class="px-4 py-2 rounded-xl bg-rose-700 group-hover:bg-rose-600 text-white text-xs font-extrabold shadow-md transition flex items-center gap-1.5">
            Launch Admin ➔
          </span>
        </div>
      </a>

      <!-- Card 2: Worker Safety PWA -->
      <a href="/user/" class="group relative bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-2xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between hover:shadow-emerald-950/20 hover:scale-[1.01]">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-xs font-bold uppercase tracking-wider">
              Field Mobile PWA
            </span>
            <span class="text-xs font-mono text-slate-500">Worker Companion</span>
          </div>
          <div>
            <h2 class="text-2xl font-black text-white group-hover:text-emerald-400 transition">
              Worker Safety Companion
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Mobile-first life-safety guide answering "AM I SAFE?" for open-cast pit personnel.
            </p>
          </div>
          <ul class="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <strong>Instant "AM I SAFE?" Status Clarity (Safe/Warning/Critical)</strong>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <strong>Interactive Evacuation Route (Ramp 2 → Assembly Pt A)</strong>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <strong>Trilingual Support (English, தமிழ், हिन्दी)</strong>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <strong>Offline Safe Mode & 1-Click PWA Installation</strong>
            </li>
          </ul>
        </div>

        <div class="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 group-hover:text-slate-200">Open Worker Portal</span>
          <span class="px-4 py-2 rounded-xl bg-emerald-700 group-hover:bg-emerald-600 text-white text-xs font-extrabold shadow-md transition flex items-center gap-1.5">
            Launch Worker App ➔
          </span>
        </div>
      </a>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-slate-800/80 bg-slate-950 px-6 py-6 text-center text-xs text-slate-500">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>MineGuard AI • Smart India Hackathon (SIH) 2026 Prototype</p>
      <div class="flex items-center gap-4 text-[11px]">
        <a href="/admin/" class="text-slate-400 hover:text-white">Admin Center</a>
        <span>•</span>
        <a href="/user/" class="text-slate-400 hover:text-white">Worker PWA</a>
      </div>
    </div>
  </footer>
</body>
</html>
`;

fs.writeFileSync(path.join(outDir, 'index.html'), landingHtml);
fs.writeFileSync(path.join(outDir, '404.html'), landingHtml);

console.log('✅ Vercel multi-app bundle successfully created in out-pages/!');

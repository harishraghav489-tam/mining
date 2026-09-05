'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Activity,
  Map as MapIcon,
  TriangleAlert,
  BarChart3,
  FileText,
  Satellite,
  Users,
  Settings,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function AdminSidebar() {
  const pathname = usePathname();
  const { state, t } = useSimulation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsMobileOpen(true);
    const handleClose = () => setIsMobileOpen(false);

    window.addEventListener('open-admin-sidebar', handleOpen);
    window.addEventListener('close-admin-sidebar', handleClose);

    return () => {
      window.removeEventListener('open-admin-sidebar', handleOpen);
      window.removeEventListener('close-admin-sidebar', handleClose);
    };
  }, []);

  // Close mobile drawer when route changes
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const unackedCount = state.alerts.filter((a) => !a.acknowledged && (a.severity === 'Critical' || a.severity === 'Warning')).length;

  const navItems = [
    { label: t('nav.dashboard'), href: '/', icon: LayoutDashboard },
    { label: t('nav.liveMonitoring'), href: '/monitoring', icon: Activity },
    { label: t('nav.mapView'), href: '/map', icon: MapIcon },
    {
      label: t('nav.alerts'),
      href: '/alerts',
      icon: TriangleAlert,
      badge: unackedCount > 0 ? unackedCount : undefined,
    },
    { label: t('nav.analytics'), href: '/analytics', icon: BarChart3 },
    { label: t('nav.reports'), href: '/reports', icon: FileText },
    { label: t('nav.satellite'), href: '/satellite', icon: Satellite },
    { label: t('nav.userManagement'), href: '/users', icon: Users },
    { label: t('nav.settings'), href: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 min-h-screen border-r border-slate-800 select-none h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mineguard-700 to-mineguard-900 flex items-center justify-center text-white shadow-md shadow-mineguard-950/50 border border-mineguard-600/40">
            <ShieldCheck className="w-6 h-6 text-red-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">MINEGUARD</span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-mineguard-800/80 text-rose-200 border border-mineguard-700">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Safety & Geotechnical Ops
            </p>
          </div>
        </div>
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        )}
      </div>

      {/* Hardware Connection Status Indicator */}
      <div className="mx-3 mt-3 px-3 py-2 rounded-md bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">Gateway 01</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">
          LoRa MQTT
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-mineguard-800 text-white shadow-sm shadow-mineguard-950/50 border border-mineguard-700/60 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white text-mineguard-900'
                      : 'bg-rose-600 text-white animate-pulse'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Switch to User PWA quick link for judges */}
      <div className="px-4 py-2 border-t border-slate-800/80">
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Radio className="w-3.5 h-3.5 text-mineguard-400" />
          <span>Open Worker PWA App (Port 3001)</span>
        </a>
      </div>

      {/* Bottom SIH Branding Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-xs">
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-1">
          {t('brand.slogan')}
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          {t('brand.hackathon')}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[99999] isolate lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-64 max-w-[80vw] shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}


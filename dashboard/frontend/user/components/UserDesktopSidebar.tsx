'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, ShieldCheck, User, Shield } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function UserDesktopSidebar() {
  const pathname = usePathname();
  const { state, t } = useSimulation();

  const unreadAlerts = state.alerts.filter((a) => !a.acknowledged).length;

  const links = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.updates'), href: '/updates', icon: Bell, badge: unreadAlerts > 0 ? unreadAlerts : undefined },
    { label: t('nav.safetyTips'), href: '/safety', icon: ShieldCheck },
    { label: t('nav.profile'), href: '/profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-mineguard-800 text-white flex items-center justify-center font-bold shadow-md shadow-mineguard-900/20">
          <Shield className="w-5 h-5 text-rose-100" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-slate-900">MINEGUARD</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-mineguard-100 text-mineguard-900">
              PWA
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium leading-tight">Worker Safety Portal</p>
        </div>
      </div>

      {/* User Quick Info */}
      <div className="m-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
          KS
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-800 truncate">{state.workerProfile.name}</p>
          <p className="text-[10px] text-slate-500 truncate">{state.workerProfile.assignedZone}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-mineguard-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{link.label}</span>
              </div>
              {link.badge !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white text-mineguard-900' : 'bg-rose-600 text-white'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
        <span>{t('brand.tagline')}</span>
      </div>
    </aside>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, ShieldCheck, User } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function UserMobileNav() {
  const pathname = usePathname();
  const { state, t } = useSimulation();

  const unreadAlerts = state.alerts.filter((a) => !a.acknowledged).length;

  const tabs = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.updates'), href: '/updates', icon: Bell, badge: unreadAlerts > 0 ? unreadAlerts : undefined },
    { label: t('nav.safetyTips'), href: '/safety', icon: ShieldCheck },
    { label: t('nav.profile'), href: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative min-w-[64px] ${
              isActive
                ? 'text-mineguard-800 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight leading-none">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

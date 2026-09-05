'use client';

import React, { useState } from 'react';
import { UserMobileNav } from '../../components/UserMobileNav';
import { UserDesktopSidebar } from '../../components/UserDesktopSidebar';
import { UserHeader } from '../../components/UserHeader';
import { OfflineBanner } from '../../components/OfflineBanner';
import { SafeRouteModal } from '../../components/SafeRouteModal';
import { useSimulation } from '../../hooks/useSimulation';
import {
  ShieldCheck,
  Eye,
  HeartHandshake,
  AlertTriangle,
  Navigation,
  HardHat,
  Volume2,
  CheckCircle2,
} from 'lucide-react';

export default function SafetyTipsPage() {
  const { state, t } = useSimulation();
  const [showRouteModal, setShowRouteModal] = useState(false);

  const precautions = [
    'Wear mandatory Personal Protective Equipment (PPE) at all times.',
    'Remain within designated active bench zones; never enter barricaded areas.',
    'Visually monitor highwall crests for dislodged rocks or new soil creep.',
    'Immediately report any new surface cracks, fissures, or rock falls.',
    'Report unusual audible rumbling, creaking, or ground vibrations.',
    'Keep vehicle haul routes clear and observe 20 km/h speed limits in pit.',
  ];

  const emergencySteps = [
    { num: '1', title: 'Stop Work', desc: 'Halt all equipment and machinery instantly upon hearing siren or alert.' },
    { num: '2', title: 'Stay Calm', desc: 'Alert your immediate squad and do not panic or run haphazardly.' },
    { num: '3', title: 'Move Away', desc: 'Step away from highwall faces, overhangs, and unstable bench toes.' },
    { num: '4', title: 'Follow Safe Route', desc: 'Proceed along green illuminated markers on Ramp 2 corridor.' },
    { num: '5', title: 'Reach Assembly Point A', desc: 'Muster inside the reinforced safe shelter outside failure radius.' },
    { num: '6', title: 'Report to Warden', desc: 'Give your Employee ID to the safety warden for the official roll call.' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <UserDesktopSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <UserHeader />
        <OfflineBanner />

        <main className="flex-1 p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t('user.safetyTipsPage.title')}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('user.safetyTipsPage.subtitle')}
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <Eye className="w-5 h-5 text-amber-600 mx-auto" />
              <span className="font-extrabold text-xs text-slate-900 block">
                {t('user.safetyTipsPage.alertPillar')}
              </span>
              <span className="text-[10px] text-slate-500">Scan hazards</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <HeartHandshake className="w-5 h-5 text-blue-600 mx-auto" />
              <span className="font-extrabold text-xs text-slate-900 block">
                {t('user.safetyTipsPage.responsiblePillar')}
              </span>
              <span className="text-[10px] text-slate-500">Protect team</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <span className="font-extrabold text-xs text-slate-900 block">
                {t('user.safetyTipsPage.safePillar')}
              </span>
              <span className="text-[10px] text-slate-500">Follow protocol</span>
            </div>
          </div>

          {/* 6 Step Emergency Action Protocol */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  {t('user.safetyTipsPage.emergencyProcedureTitle')}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencySteps.map((step) => (
                <div key={step.num} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs">
                  <span className="w-6 h-6 rounded-lg bg-mineguard-800 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{step.title}</h3>
                    <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRouteModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>View Evacuation Route Map</span>
            </button>
          </div>

          {/* Standard Precautions Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <HardHat className="w-4 h-4 text-amber-600" />
              <h2 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">
                {t('user.safetyTipsPage.precautionsTitle')}
              </h2>
            </div>
            <ul className="space-y-2 text-slate-700">
              {precautions.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <UserMobileNav />
      </div>

      <SafeRouteModal isOpen={showRouteModal} onClose={() => setShowRouteModal(false)} />
    </div>
  );
}

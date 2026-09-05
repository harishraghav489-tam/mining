'use client';

import React, { useState } from 'react';
import { UserMobileNav } from '../../components/UserMobileNav';
import { UserDesktopSidebar } from '../../components/UserDesktopSidebar';
import { UserHeader } from '../../components/UserHeader';
import { OfflineBanner } from '../../components/OfflineBanner';
import { useSimulation } from '../../hooks/useSimulation';
import { Language } from '../../../shared/utils';
import {
  User,
  Phone,
  Shield,
  Bell,
  Globe,
  PhoneCall,
  Edit,
  LogOut,
  CheckCircle2,
  MapPin,
  Building,
} from 'lucide-react';

export default function ProfilePage() {
  const { state, t, changeLanguage, updateProfile } = useSimulation();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(state.workerProfile.name);
  const [phoneInput, setPhoneInput] = useState(state.workerProfile.contactNumber);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      contactNumber: phoneInput,
    });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <UserDesktopSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <UserHeader />
        <OfflineBanner />

        <main className="flex-1 p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {t('user.profilePage.title')}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Worker safety registration & emergency credentials
              </p>
            </div>
            {saved && (
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold animate-in fade-in">
                Saved!
              </span>
            )}
          </div>

          {/* Avatar Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              KS
            </div>
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-slate-900">{state.workerProfile.name}</h2>
              <p className="text-xs text-slate-500 font-medium">{state.workerProfile.role}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] font-bold rounded">
                  {state.workerProfile.employeeId}
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  Active Shift
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('user.profilePage.dept')}</span>
                <strong className="text-slate-800 font-medium">{state.workerProfile.department}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('user.profilePage.mine')}</span>
                <strong className="text-slate-800 font-medium">{state.workerProfile.assignedMine}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('user.profilePage.zone')}</span>
                <strong className="text-slate-800 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-mineguard-800" />
                  {state.workerProfile.assignedZone}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('user.profilePage.phone')}</span>
                <strong className="text-slate-800 font-mono">{state.workerProfile.contactNumber}</strong>
              </div>
            </div>

            {/* Emergency Contact Block */}
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-rose-800 font-bold block text-[11px] uppercase">
                  {t('user.profilePage.emergencyContact')}
                </span>
                <p className="text-slate-900 font-bold">{state.workerProfile.emergencyContact.name}</p>
                <p className="text-slate-600 font-mono text-[11px]">{state.workerProfile.emergencyContact.phone}</p>
              </div>
              <a
                href={`tel:${state.workerProfile.emergencyContact.phone}`}
                className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition"
                title="Call Emergency Contact"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Language Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Globe className="w-4 h-4 text-mineguard-800" />
              <h2 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
                {t('user.profilePage.language')}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLanguage(l.code)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    state.language === l.code
                      ? 'bg-mineguard-800 text-white border-mineguard-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{l.label}</span>
                  {state.language === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-rose-200" />}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {editing ? (
              <form onSubmit={handleSave} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-slate-900 text-white font-bold rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4 text-slate-500" />
                <span>{t('user.profilePage.editProfile')}</span>
              </button>
            )}

            <button
              onClick={() => alert('Signing out of Worker Portal...')}
              className="w-full py-2.5 px-4 rounded-xl text-slate-500 hover:text-rose-600 font-semibold text-xs transition flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('user.profilePage.logout')}</span>
            </button>
          </div>
        </main>

        <UserMobileNav />
      </div>
    </div>
  );
}

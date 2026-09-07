'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, Language, LanguageOption } from '../utils';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'dropdown' | 'grid' | 'pills' | 'compact';
  className?: string;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  variant = 'dropdown',
  className = '',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = lang.code === currentLanguage;
          return (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-mineguard-800 text-white border-mineguard-900 shadow-md ring-2 ring-mineguard-700/50'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {lang.nativeName}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-rose-300" />}
              </div>
              <span className={`text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                {lang.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap gap-1.5 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = lang.code === currentLanguage;
          return (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                isSelected
                  ? 'bg-mineguard-800 text-white border-mineguard-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{lang.nativeName}</span>
              {isSelected && <Check className="w-3 h-3 text-rose-200" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Default 'dropdown' or 'compact'
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-mineguard-600"
        title="Select App Language / भाषा चुनें"
        aria-label="Language selector"
      >
        <Globe className="w-3.5 h-3.5 text-slate-600" />
        <span className="truncate max-w-[100px] sm:max-w-[120px]">
          {variant === 'compact' ? activeOption.code.toUpperCase() : activeOption.nativeName}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white border border-slate-200 shadow-2xl z-50 py-1.5 max-h-80 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Select Language</span>
            <span className="font-mono text-slate-400">12 Indian Langs</span>
          </div>
          <div className="p-1 space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-mineguard-800 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div>
                    <span className="block text-xs">{lang.nativeName}</span>
                    <span className={`block text-[10px] ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                      {lang.label}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-rose-300" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

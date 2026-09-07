import { RiskLevel, NodeStatus, AlertSeverity, Language } from '../types';
import enMessages from '../messages/en.json';
import taMessages from '../messages/ta.json';
import hiMessages from '../messages/hi.json';
import teMessages from '../messages/te.json';
import knMessages from '../messages/kn.json';
import mlMessages from '../messages/ml.json';
import bnMessages from '../messages/bn.json';
import mrMessages from '../messages/mr.json';
import guMessages from '../messages/gu.json';
import paMessages from '../messages/pa.json';
import orMessages from '../messages/or.json';
import asMessages from '../messages/as.json';

export type { Language };

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English (EN)', nativeName: 'English' },
  { code: 'ta', label: 'தமிழ் (Tamil)', nativeName: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी (Hindi)', nativeName: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు (Telugu)', nativeName: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം (Malayalam)', nativeName: 'മലയാളം' },
  { code: 'bn', label: 'বাংলা (Bengali)', nativeName: 'বাংলা' },
  { code: 'mr', label: 'मराठी (Marathi)', nativeName: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)', nativeName: 'ગુજરાતી' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', label: 'অসমীয়া (Assamese)', nativeName: 'অসমীয়া' },
];

const translations: Record<Language, any> = {
  en: enMessages,
  ta: taMessages,
  hi: hiMessages,
  te: teMessages,
  kn: knMessages,
  ml: mlMessages,
  bn: bnMessages,
  mr: mrMessages,
  gu: guMessages,
  pa: paMessages,
  or: orMessages,
  as: asMessages,
};

export function getNestedTranslation(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export function translate(
  path: string,
  lang: Language = 'en',
  params: Record<string, string | number> = {}
): string {
  const dict = translations[lang] || translations.en;
  let text = getNestedTranslation(dict, path);
  if (text === path && lang !== 'en') {
    text = getNestedTranslation(translations.en, path);
  }
  for (const [key, value] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return text;
}

export function getRiskColors(level: RiskLevel) {
  switch (level) {
    case 'SAFE':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dot: 'bg-emerald-500',
        hex: '#10B981',
      };
    case 'WARNING':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-900 border-amber-300',
        dot: 'bg-amber-500',
        hex: '#F59E0B',
      };
    case 'CRITICAL':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-900',
        border: 'border-rose-300',
        badge: 'bg-rose-100 text-rose-900 border-rose-400',
        dot: 'bg-rose-600',
        hex: '#E11D48',
      };
    default:
      return {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        border: 'border-slate-200',
        badge: 'bg-slate-100 text-slate-800 border-slate-300',
        dot: 'bg-slate-500',
        hex: '#64748B',
      };
  }
}

export function getNodeStatusColors(status: NodeStatus) {
  switch (status) {
    case 'NORMAL':
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'WARNING':
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'CRITICAL':
      return {
        badge: 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse',
        dot: 'bg-rose-600',
      };
    case 'OFFLINE':
      return {
        badge: 'bg-slate-100 text-slate-500 border-slate-200',
        dot: 'bg-slate-400',
      };
  }
}

export function getAlertSeverityColors(severity: AlertSeverity) {
  switch (severity) {
    case 'Critical':
      return 'bg-rose-100 text-rose-800 border-rose-300 font-semibold';
    case 'Warning':
      return 'bg-amber-100 text-amber-800 border-amber-300 font-medium';
    case 'Info':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Normal':
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

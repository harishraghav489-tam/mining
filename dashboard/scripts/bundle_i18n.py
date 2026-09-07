# -*- coding: utf-8 -*-
import os
import shutil
import zipfile

base_dir = "/home/jarvis/mine"
package_dir = os.path.join(base_dir, "i18n-package")

if os.path.exists(package_dir):
    shutil.rmtree(package_dir)

os.makedirs(os.path.join(package_dir, "messages"), exist_ok=True)
os.makedirs(os.path.join(package_dir, "components"), exist_ok=True)
os.makedirs(os.path.join(package_dir, "hooks"), exist_ok=True)
os.makedirs(os.path.join(package_dir, "utils"), exist_ok=True)
os.makedirs(os.path.join(package_dir, "types"), exist_ok=True)
os.makedirs(os.path.join(package_dir, "store"), exist_ok=True)

# Copy all 12 message files
src_messages = os.path.join(base_dir, "dashboard/frontend/shared/messages")
for fname in os.listdir(src_messages):
    if fname.endswith(".json"):
        shutil.copy2(os.path.join(src_messages, fname), os.path.join(package_dir, "messages", fname))

# Copy components
shutil.copy2(
    os.path.join(base_dir, "dashboard/frontend/shared/components/LanguageSelector.tsx"),
    os.path.join(package_dir, "components", "LanguageSelector.tsx")
)
shutil.copy2(
    os.path.join(base_dir, "dashboard/frontend/shared/components/GisMineMap.tsx"),
    os.path.join(package_dir, "components", "GisMineMap.tsx")
)

# Copy hooks, utils, types, store
shutil.copy2(
    os.path.join(base_dir, "dashboard/frontend/admin/hooks/useSimulation.ts"),
    os.path.join(package_dir, "hooks", "useSimulation.ts")
)
shutil.copy2(
    os.path.join(base_dir, "dashboard/frontend/shared/utils/index.ts"),
    os.path.join(package_dir, "utils", "index.ts")
)
shutil.copy2(
    os.path.join(base_dir, "dashboard/frontend/shared/types/index.ts"),
    os.path.join(package_dir, "types", "index.ts")
)
shutil.copy2(
    os.path.join(base_dir, "dashboard/frontend/shared/store/simulationStore.ts"),
    os.path.join(package_dir, "store", "simulationStore.ts")
)

integration_guide = """# MineGuard AI — Multilingual (i18n) Integration Guide

This package contains the complete, scalable, and portable **12 Indian Languages i18n System** built for the MineGuard AI Dashboard.

---

## 1. Supported Languages (12 Indian Languages)

| Language | Code | Native Name | Script |
| :--- | :--- | :--- | :--- |
| **English** (Default / Fallback) | `en` | English | Latin |
| **Tamil** | `ta` | தமிழ் | Tamil |
| **Hindi** | `hi` | हिन्दी | Devanagari |
| **Telugu** | `te` | తెలుగు | Telugu |
| **Kannada** | `kn` | ಕನ್ನಡ | Kannada |
| **Malayalam** | `ml` | മലയാളം | Malayalam |
| **Bengali** | `bn` | বাংলা | Bengali |
| **Marathi** | `mr` | मराठी | Devanagari |
| **Gujarati** | `gu` | ગુજરાતી | Gujarati |
| **Punjabi** | `pa` | ਪੰਜਾਬੀ | Gurmukhi |
| **Odia** | `or` | ଓଡ଼ିଆ | Odia |
| **Assamese** | `as` | অসমীয়া | Assamese |

---

## 2. Package File Tree & Placement

Place the contents of this package into your project under `src/` or `frontend/shared/`:

```
i18n-package/
├── messages/                    --> Place in frontend/shared/messages/
│   ├── en.json                  (English master dictionary)
│   ├── ta.json                  (Tamil)
│   ├── hi.json                  (Hindi)
│   ├── te.json                  (Telugu)
│   ├── kn.json                  (Kannada)
│   ├── ml.json                  (Malayalam)
│   ├── bn.json                  (Bengali)
│   ├── mr.json                  (Marathi)
│   ├── gu.json                  (Gujarati)
│   ├── pa.json                  (Punjabi)
│   ├── or.json                  (Odia)
│   └── as.json                  (Assamese)
├── components/
│   ├── LanguageSelector.tsx     --> Reusable dropdown/grid language picker
│   └── GisMineMap.tsx           --> Fully i18n-translated Leaflet satellite map
├── hooks/
│   └── useSimulation.ts         --> Hook providing `t(key, params)` & `changeLanguage()`
├── utils/
│   └── index.ts                 --> `translate()` engine & `SUPPORTED_LANGUAGES` metadata
├── types/
│   └── index.ts                 --> `Language` union type & telemetry interfaces
├── store/
│   └── simulationStore.ts       --> Reactive state with `localStorage` persistence
└── INTEGRATION_GUIDE.md         --> This file
```

---

## 3. Required NPM Dependencies

This system is lightweight and requires zero heavyweight external translation libraries:

```bash
npm install lucide-react leaflet
npm install --save-dev @types/leaflet
```

---

## 4. How to Initialize and Use Translations

### Basic Usage with `useSimulation` Hook
```tsx
import React from 'react';
import { useSimulation } from '../hooks/useSimulation';

export function DashboardHeader() {
  const { state, t, changeLanguage } = useSimulation();

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.lastUpdated')}: {state.lastUpdated}</p>

      {/* Dynamic Status Display */}
      <span>{t(`risk.${state.mode.toLowerCase()}`)}</span>

      {/* Interpolation example */}
      <p>{t('user.greeting', { name: 'Karthik' })}</p>
    </div>
  );
}
```

### Direct Utility Usage (Outside React Components)
```ts
import { translate, Language } from './utils';

const label = translate('risk.critical', 'ta'); // Returns: "மிக அபாயகரமானது"
```

---

## 5. Adding the Language Selector

### Dropdown Mode (For Headers / Navbars):
```tsx
import { LanguageSelector } from './components/LanguageSelector';
import { useSimulation } from './hooks/useSimulation';

export function Header() {
  const { state, changeLanguage } = useSimulation();

  return (
    <LanguageSelector
      currentLanguage={state.language}
      onLanguageChange={changeLanguage}
      variant="dropdown"
    />
  );
}
```

### Grid Mode (For Worker Settings / Profile Pages):
```tsx
<LanguageSelector
  currentLanguage={state.language}
  onLanguageChange={changeLanguage}
  variant="grid"
/>
```

---

## 6. How to Add Another Language Later

1. Create a new JSON file in `messages/`, e.g., `messages/ur.json` (Urdu).
2. Add the language code `'ur'` to the `Language` type in `types/index.ts`:
   ```ts
   export type Language = 'en' | 'ta' | ... | 'ur';
   ```
3. Import `urMessages from '../messages/ur.json'` in `utils/index.ts`.
4. Add the option to `SUPPORTED_LANGUAGES` in `utils/index.ts`:
   ```ts
   { code: 'ur', label: 'اردو (Urdu)', nativeName: 'اردو' }
   ```
5. Register it in the `translations` object inside `utils/index.ts`.

---

## 7. Guarantee of Non-Interference
- **ML Engine**: ML probabilities (`score: 0.92`), risk matrices, and XGBoost/Isolation Forest outputs remain 100% numerical and language-independent.
- **Sensor Streams**: Raw telemetry values (`14.8 mm`, `4.25°`, `1.25 g`, `RSSI`, battery `%`) and coordinates (`latitude`/`longitude`) are untouched.
- **Dynamic Key Resolution**: `t(\`risk.${level.toLowerCase()}\`)` dynamically renders the localized string.
- **Instant Switching**: `simulationStore` broadcasts updates to all active components with `localStorage` persistence (`mineguard_lang`), requiring no full page reloads.
- **Fallback**: If any translation key is missing in a regional language, it automatically falls back to English (`en`).
"""

with open(os.path.join(package_dir, "INTEGRATION_GUIDE.md"), "w", encoding="utf-8") as f:
    f.write(integration_guide)

# Create Zip archive
zip_path_1 = os.path.join(base_dir, "i18n-package.zip")
zip_path_2 = os.path.join(base_dir, "dashboard", "i18n-package.zip")

with zipfile.ZipFile(zip_path_1, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, _, files in os.walk(package_dir):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, package_dir)
            zipf.write(full_path, rel_path)

shutil.copy2(zip_path_1, zip_path_2)
print(f"Created portable zip at {zip_path_1} and {zip_path_2}")

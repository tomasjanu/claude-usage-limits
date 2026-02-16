# Claude Usage Limits - VS Code Extension

Zobrazuje aktuální využití Claude.ai limitů přímo ve status baru VS Code.

![Status bar ukázka](https://img.shields.io/badge/☁_Claude:_5h_12%25_|_7d_35%25-blue?style=flat-square)

## Co zobrazuje

- **5h** - využití aktuální 5hodinové session (%)
- **7d** - týdenní využití všech modelů (%)
- Barevné kódování: zelená (<50%), žlutá (50-80%), červená (>80%)
- Tooltip s detailním přehledem (Sonnet, Opus, časy resetů)

## Instalace

### Ze souboru .vsix (pro uživatele)

1. Stáhni soubor `claude-usage-limits-X.X.X.vsix`
2. Otevři VS Code
3. `Ctrl+Shift+X` (Extensions) → klikni na `...` vpravo nahoře → **"Install from VSIX..."**
4. Vyber stažený `.vsix` soubor
5. Restartuj VS Code (`Ctrl+Shift+P` → "Reload Window")

Nebo přes terminál:
```bash
code --install-extension claude-usage-limits-0.1.0.vsix
```

### Ze zdrojového kódu (pro vývojáře)

```bash
# Naklonuj repozitář
git clone <url-repozitare>
cd vsc-claude-limits

# Nainstaluj závislosti
npm install

# Zkompiluj TypeScript
npm run compile

# Zabal jako .vsix
npx @vscode/vsce package --allow-missing-repository

# Nainstaluj do VS Code
code --install-extension claude-usage-limits-0.1.0.vsix
```

## Nastavení autentizace

Rozšíření potřebuje přístup k tvému Claude.ai účtu. Podporuje dva způsoby:

### 1. Automatická detekce (výchozí)

Pokud máš nainstalovaný **Claude Code**, rozšíření automaticky najde OAuth token z `~/.claude/.credentials.json`. Nemusíš nic nastavovat.

### 2. Session cookie z prohlížeče

Pokud nemáš Claude Code nebo automatická detekce nefunguje:

1. Otevři https://claude.ai a přihlas se
2. Otevři DevTools (`F12`)
3. Přejdi na **Application** → **Cookies** → `https://claude.ai`
4. Najdi cookie `sessionKey` (začíná na `sk-ant-sid01-...`) a zkopíruj jeho hodnotu
5. Ve VS Code: `Ctrl+Shift+P` → **"Claude Usage: Set Session Key"** → vlož hodnotu

> **Poznámka:** Session cookie expiruje, takže ho občas budeš muset obnovit.

## Nastavení rozšíření

Otevři Settings (`Ctrl+,`) a hledej "Claude Usage":

| Nastavení | Výchozí | Popis |
|-----------|---------|-------|
| `claudeUsage.authMethod` | `auto` | `auto` = OAuth + fallback na cookie, `cookie` = pouze cookie |
| `claudeUsage.sessionKey` | (prázdné) | Session cookie z prohlížeče |
| `claudeUsage.refreshInterval` | `5` | Interval obnovení dat v minutách (1-60) |

## Příkazy

Otevři Command Palette (`Ctrl+Shift+P`):

- **Claude Usage: Refresh** - ručně obnoví data
- **Claude Usage: Set Session Key** - nastaví session cookie

## Vývoj

### Struktura projektu

```
vsc-claude-limits/
├── src/
│   ├── extension.ts    # Vstupní bod, aktivace, polling
│   ├── api.ts          # API klient (OAuth + web cookie)
│   └── statusBar.ts    # Status bar UI, formátování, barvy
├── out/                # Zkompilovaný JavaScript (generováno)
├── package.json        # Manifest rozšíření
└── tsconfig.json       # TypeScript konfigurace
```

### Užitečné příkazy

```bash
# Kompilace
npm run compile

# Kompilace s automatickým sledováním změn
npm run watch

# Zabalení do .vsix
npx @vscode/vsce package --allow-missing-repository

# Instalace do VS Code
code --install-extension claude-usage-limits-0.1.0.vsix
```

### Testování při vývoji

1. Otevři projekt ve VS Code
2. Stiskni `F5` → spustí se nové okno VS Code s rozšířením
3. Uprav kód, ulož, restartuj debug session (`Ctrl+Shift+F5`)

### Po úpravách - nová verze

1. Uprav číslo verze v `package.json` (`"version": "0.2.0"`)
2. Zkompiluj a zabal:
   ```bash
   npm run compile
   npx @vscode/vsce package --allow-missing-repository
   ```
3. Nainstaluj nový `.vsix`:
   ```bash
   code --install-extension claude-usage-limits-0.2.0.vsix
   ```

## Odinstalace

```bash
code --uninstall-extension claude-usage-limits
```

Nebo přes VS Code: `Ctrl+Shift+X` → najdi "Claude Usage Limits" → **Uninstall**.

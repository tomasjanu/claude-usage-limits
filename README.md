# Claude Usage Limits - VS Code Extension

Displays your current Claude.ai usage limits directly in the VS Code status bar.

![Status bar example](https://img.shields.io/badge/☁_Claude:_5h_12%25_|_7d_35%25-blue?style=flat-square)

## What It Shows

- **5h** - current 5-hour session usage (%)
- **7d** - weekly usage across all models (%)
- Color coding: green (<50%), yellow (50-80%), red (>80%)
- Tooltip with detailed breakdown (Sonnet, Opus, reset times)

## Installation

### From .vsix file (for users)

1. Download the `claude-usage-limits-X.X.X.vsix` file
2. Open VS Code
3. `Ctrl+Shift+X` (Extensions) → click `...` in the top right → **"Install from VSIX..."**
4. Select the downloaded `.vsix` file
5. Restart VS Code (`Ctrl+Shift+P` → "Reload Window")

Or via terminal:
```bash
code --install-extension claude-usage-limits-0.1.0.vsix
```

### From source (for developers)

```bash
# Clone the repository
git clone https://github.com/tomasjanu/claude-usage-limits.git
cd claude-usage-limits

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package as .vsix
npx @vscode/vsce package

# Install in VS Code
code --install-extension claude-usage-limits-0.1.3.vsix
```

## Authentication Setup

The extension needs access to your Claude.ai account. Two methods are supported:

### 1. Automatic detection (default)

If you have **Claude Code** installed, the extension will automatically find the OAuth token from `~/.claude/.credentials.json`. No configuration needed.

### 2. Session cookie from browser

If you don't have Claude Code or automatic detection doesn't work:

1. Open https://claude.ai and log in
2. Open DevTools (`F12`)
3. Go to **Application** → **Cookies** → `https://claude.ai`
4. Find the `sessionKey` cookie (starts with `sk-ant-sid01-...`) and copy its value
5. In VS Code: `Ctrl+Shift+P` → **"Claude Usage: Set Session Key"** → paste the value

> **Note:** The session cookie expires, so you may need to refresh it occasionally.

## Extension Settings

Open Settings (`Ctrl+,`) and search for "Claude Usage":

| Setting | Default | Description |
|---------|---------|-------------|
| `claudeUsage.authMethod` | `auto` | `auto` = OAuth + fallback to cookie, `cookie` = cookie only |
| `claudeUsage.sessionKey` | (empty) | Session cookie from browser |
| `claudeUsage.refreshInterval` | `5` | Data refresh interval in minutes (1-60) |

## Commands

Open Command Palette (`Ctrl+Shift+P`):

- **Claude Usage: Refresh** - manually refresh data
- **Claude Usage: Set Session Key** - set session cookie

## Development

### Project Structure

```
claude-usage-limits/
├── src/
│   ├── extension.ts    # Entry point, activation, polling
│   ├── api.ts          # API client (OAuth + web cookie)
│   └── statusBar.ts    # Status bar UI, formatting, colors
├── out/                # Compiled JavaScript (generated)
├── package.json        # Extension manifest
└── tsconfig.json       # TypeScript configuration
```

### Useful Commands

```bash
# Compile
npm run compile

# Compile with file watching
npm run watch

# Package as .vsix
npx @vscode/vsce package

# Install in VS Code
code --install-extension claude-usage-limits-0.1.3.vsix
```

### Testing During Development

1. Open the project in VS Code
2. Press `F5` → a new VS Code window will launch with the extension
3. Edit code, save, restart debug session (`Ctrl+Shift+F5`)

### After Changes - New Version

1. Update the version number in `package.json` (`"version": "0.2.0"`)
2. Compile and package:
   ```bash
   npm run compile
   npx @vscode/vsce package
   ```
3. Install the new `.vsix`:
   ```bash
   code --install-extension claude-usage-limits-0.2.0.vsix
   ```

## Uninstall

```bash
code --uninstall-extension claude-usage-limits
```

Or via VS Code: `Ctrl+Shift+X` → find "Claude Usage Limits" → **Uninstall**.

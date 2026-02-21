# Productivity Suite Chrome Extension

## Features
- Save and restore tab sessions
- Persistent notes
- Website blocker with sync storage
- Custom new tab dashboard
- Context menu integration
- Keyboard shortcuts
- Export all data as JSON

## Installation

1. Clone repository
2. Run:
   npm install
3. Build:
   npm run build
4. Open Chrome → chrome://extensions
5. Enable Developer Mode
6. Click "Load Unpacked"
7. Select the dist folder

## Project Structure
- src/ (source code)
- dist/ (production build)
- manifest.json
- webpack.config.js

## Permissions Used
- storage
- tabs
- scripting
- contextMenus
- downloads

## Keyboard Shortcuts
- Ctrl+Shift+P → Open popup
- Ctrl+Shift+S → Save session

## Export File
Exports productivity_suite_export.json containing:
- sessions
- notes
- blockedSites
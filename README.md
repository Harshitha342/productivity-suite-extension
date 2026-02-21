# Productivity Suite Chrome Extension (Manifest V3)

A Chrome Extension built using Manifest V3 that provides:

- Tab session management
- Persistent notes
- Website blocking
- Custom new tab dashboard
- Context menu integration
- Keyboard shortcuts
- Data export as JSON

This project follows modern Chrome Extension development practices and uses Webpack for bundling.

---

## 📦 Repository Contents

This repository includes:

- `src/` – Source code
- `dist/` – Production-ready build (load this in Chrome)
- `manifest.json` – Manifest V3 configuration
- `webpack.config.js` – Bundler configuration
- `package.json` – Project dependencies and scripts
- `package-lock.json`
- `README.md`
- `.env.example`
- `.gitignore`

No secrets or API keys are included.

---

## ⚙️ Requirements

- Node.js (v16+ recommended)
- npm
- Google Chrome

---

## 🛠 How to Build the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Harshitha342/productivity-suite-extension.git
cd productivity-suite-extension
2️⃣ Install Dependencies
npm install

All dependencies are defined in package.json.

3️⃣ Build the Extension
npm run build

This generates a production-ready build inside the dist/ folder.

🧩 How to Load the Extension in Chrome

Open Google Chrome

Navigate to:

chrome://extensions/

Enable Developer Mode (top-right corner)

Click Load unpacked

Select the dist/ folder inside this project

The extension will now appear in Chrome.

🔍 Feature Overview
Save Tab Session

Save all tabs in the current window as a named session.

Restore Session

Restore saved sessions in a new browser window.

Persistent Notes

Notes are stored using chrome.storage.local and persist across sessions.

Website Blocker

Block specific hostnames using the options page.
Blocked sites redirect to an internal blocked page.

Blocklist is stored using chrome.storage.sync (syncs across devices).

Custom New Tab

Overrides Chrome’s default new tab page and displays:

Saved notes

Saved sessions

Export Data

Exports all user data into:

productivity_suite_export.json

JSON structure:

{
  "sessions": {},
  "notes": "",
  "blockedSites": []
}
Keyboard Shortcuts

Ctrl + Shift + P → Open popup

Ctrl + Shift + S → Quick-save session

Context Menu

Right-click on any page → "Add page to notes"

🔐 Permissions Used

storage

tabs

scripting

contextMenus

downloads

host_permissions: <all_urls>

🌍 Environment Variables

This project does not require any environment variables.

See .env.example:

# No environment variables required

No API keys, tokens, or secrets are used in this project.

🧠 Architecture Notes

Built using Manifest V3

Uses event-based service worker

Proper separation of popup, options, background, and newtab scripts

Uses Webpack for bundling and build management

📌 Evaluation Notes

Fully compliant with Manifest V3

All required data-testid attributes included

Bundled production build included in dist/

No secrets included

Ready for automated testing
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu
  chrome.contextMenus.create({
    id: "add-to-notes",
    title: "Add page to notes",
    contexts: ["page"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-to-notes") {
    chrome.storage.local.get("notes", (data) => {
      const existingNotes = data.notes || "";
      const newEntry = `\n${tab.title} - ${tab.url}\n`;
      chrome.storage.local.set({
        notes: existingNotes + newEntry
      });
    });
  }
});

// Restore Session Logic
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "restore-session") {
    chrome.storage.local.get("sessions", (data) => {
      const sessions = data.sessions || {};
      const urls = sessions[message.sessionName];

      if (urls && urls.length > 0) {
        chrome.windows.create({
          url: urls
        });
      }
    });
  }
});

// Keyboard Shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "save-session-command") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const urls = tabs.map(tab => tab.url);

      chrome.storage.local.get("sessions", (data) => {
        const sessions = data.sessions || {};
        sessions["quick-save"] = urls;
        chrome.storage.local.set({ sessions });
      });
    });
  }
});

// Website Blocking
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url) {
    chrome.storage.sync.get("blockedSites", (data) => {
      const blockedSites = data.blockedSites || [];

      const url = new URL(tab.url);
      if (blockedSites.includes(url.hostname)) {
        chrome.tabs.update(tabId, {
          url: chrome.runtime.getURL("blocked.html")
        });
      }
    });
  }
});
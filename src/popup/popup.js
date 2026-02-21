document.addEventListener("DOMContentLoaded", () => {
  const saveSessionBtn = document.querySelector('[data-testid="save-session-btn"]');
  const sessionsList = document.querySelector('[data-testid="sessions-list"]');
  const notesTextarea = document.querySelector('[data-testid="notes-textarea"]');
  const saveNotesBtn = document.querySelector('[data-testid="save-notes-btn"]');
  const openOptionsBtn = document.querySelector('[data-testid="open-options-btn"]');

  // Load saved notes
  chrome.storage.local.get("notes", (data) => {
    if (data.notes) {
      notesTextarea.value = data.notes;
    }
  });

  // Save Notes
  saveNotesBtn.addEventListener("click", () => {
    chrome.storage.local.set({ notes: notesTextarea.value });
  });

  // Open Options Page
  openOptionsBtn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // Save Session
  saveSessionBtn.addEventListener("click", async () => {
    const sessionName = prompt("Enter session name:");
    if (!sessionName) return;

    const tabs = await chrome.tabs.query({ currentWindow: true });
    const urls = tabs.map(tab => tab.url);

    chrome.storage.local.get("sessions", (data) => {
      const sessions = data.sessions || {};
      sessions[sessionName] = urls;

      chrome.storage.local.set({ sessions }, () => {
        renderSessions(sessions);
      });
    });
  });

  function renderSessions(sessions) {
    sessionsList.innerHTML = "";
    Object.keys(sessions).forEach(name => {
      const btn = document.createElement("button");
      btn.textContent = `Restore ${name}`;
      btn.setAttribute("data-testid", `restore-session-${name}`);

      btn.addEventListener("click", () => {
        chrome.runtime.sendMessage({
          action: "restore-session",
          sessionName: name
        });
      });

      sessionsList.appendChild(btn);
      sessionsList.appendChild(document.createElement("br"));
    });
  }

  // Load saved sessions
  chrome.storage.local.get("sessions", (data) => {
    if (data.sessions) {
      renderSessions(data.sessions);
    }
  });
});
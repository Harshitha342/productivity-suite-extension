document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.querySelector('[data-testid="widget-notes"]');
  const sessionsContainer = document.querySelector('[data-testid="widget-sessions"]');

  // Load Notes
  chrome.storage.local.get("notes", (data) => {
    notesContainer.textContent = data.notes || "No notes yet.";
  });

  // Load Sessions
  chrome.storage.local.get("sessions", (data) => {
    const sessions = data.sessions || {};

    if (Object.keys(sessions).length === 0) {
      sessionsContainer.textContent = "No saved sessions.";
      return;
    }

    Object.keys(sessions).forEach(name => {
      const div = document.createElement("div");
      div.textContent = name;
      sessionsContainer.appendChild(div);
    });
  });
});
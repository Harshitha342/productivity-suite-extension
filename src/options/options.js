document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector('[data-testid="block-hostname-input"]');
  const addBtn = document.querySelector('[data-testid="add-block-btn"]');
  const listContainer = document.querySelector('[data-testid="blocked-sites-list"]');
  const exportBtn = document.querySelector('[data-testid="export-data-btn"]');

  // Load existing blocked sites
  function renderBlockedSites() {
    chrome.storage.sync.get("blockedSites", (data) => {
      const sites = data.blockedSites || [];
      listContainer.innerHTML = "";

      sites.forEach(site => {
        const div = document.createElement("div");
        div.textContent = site;
        listContainer.appendChild(div);
      });
    });
  }

  renderBlockedSites();

  // Add new hostname
  addBtn.addEventListener("click", () => {
    const hostname = input.value.trim();
    if (!hostname) return;

    chrome.storage.sync.get("blockedSites", (data) => {
      const sites = data.blockedSites || [];
      if (!sites.includes(hostname)) {
        sites.push(hostname);
        chrome.storage.sync.set({ blockedSites: sites }, () => {
          input.value = "";
          renderBlockedSites();
        });
      }
    });
  });

  // Export Data
  exportBtn.addEventListener("click", () => {
    chrome.storage.local.get(null, (localData) => {
      chrome.storage.sync.get(null, (syncData) => {

        const exportData = {
          sessions: localData.sessions || {},
          notes: localData.notes || "",
          blockedSites: syncData.blockedSites || []
        };

        const blob = new Blob(
          [JSON.stringify(exportData, null, 2)],
          { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        chrome.downloads.download({
          url: url,
          filename: "productivity_suite_export.json"
        });
      });
    });
  });
});
const scripts = ["client.js"];

const injectScriptsTo = (tabId: number) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: scripts,
  });
};

export const injectClientIntoOpenedPages = () => {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id !== undefined) {
        injectScriptsTo(tab.id);
      }
    }
  });
};

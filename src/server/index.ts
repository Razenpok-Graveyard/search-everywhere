import { injectClientIntoOpenedPages } from "./page-inject";
import { SearchEngine } from "./search-engine";

const searchEngine = new SearchEngine();
searchEngine.start();

chrome.runtime.onMessage.addListener((id: string) => {
  const item = searchEngine.getItem(id);
  if (item.tab.id !== undefined) {
    chrome.tabs.update(item.tab.id, {
      active: true,
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "extension_update") {
    return;
  }
  if (port.name === "search") {
    port.onMessage.addListener((query: string) => {
      const result = searchEngine.search(query);
      port.postMessage(result);
    });
    return;
  }
});

injectClientIntoOpenedPages();

export class SearchItem {
  id: string;
  tab: chrome.tabs.Tab;

  constructor(id: string, tab: chrome.tabs.Tab) {
    this.id = id;
    this.tab = tab;
  }
}

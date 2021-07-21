import { SearchIndex } from "./search-index";
import { SearchDatabase } from "./search-database";
import { SearchListing } from "../shared/search-listing";
import { SearchItem } from "./search-item";
import { uuid } from "./uuid";

export class SearchEngine {
  searchDatabase: SearchDatabase;
  searchIndex: SearchIndex;

  constructor() {
    this.searchDatabase = new SearchDatabase();
    this.searchIndex = new SearchIndex();
  }

  async start() {
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    while (true) {
      const tabs = await chrome.tabs.query({});
      this.addTabs(tabs);
      await sleep(100);
    }
  }

  getItem(id: string) {
    return this.searchDatabase.items[id];
  }

  addTabs(tabs: chrome.tabs.Tab[]) {
    const existingTabs: number[] = [];
    const db = this.searchDatabase;
    for (const id in db.items) {
      const item = db.items[id];
      if (tabs.find((tab) => tab.id === item.tab.id)) {
        existingTabs.push(item.tab.id!);
        continue;
      }

      delete db.items[id];
      this.searchIndex.remove(id);
    }

    const items = tabs
      .filter((tab) => tab.id !== undefined && !existingTabs.includes(tab.id))
      .map((tab) => new SearchItem(uuid(), tab));
    for (const item of items) {
      db.items[item.id] = item;
      if (item.tab.title !== undefined) {
        this.searchIndex.add(item.id, item.tab.title);
      }
      if (item.tab.url !== undefined) {
        this.searchIndex.add(item.id, item.tab.url);
      }
    }
  }

  search(query: string) {
    const ids = this.searchIndex.search(query);
    return ids
      .map((id) => this.searchDatabase.items[id])
      .map(
        (item) =>
          new SearchListing(
            item.id,
            item.tab.title!,
            item.tab.url!,
            item.tab.favIconUrl!
          )
      );
  }
}

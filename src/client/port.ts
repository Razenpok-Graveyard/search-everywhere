import { SearchListing } from "./../shared/search-listing";

class Port {
  private port?: chrome.runtime.Port;

  onMessage: (listings: SearchListing[]) => void = () => {};

  constructor() {}

  connect() {
    this.port = chrome.runtime.connect({ name: "search" });
    this.port.onMessage.addListener((listings: SearchListing[]) =>
      this.onMessage(listings)
    );
    this.port.onDisconnect.addListener(() => {
      this.connect();
    });
  }

  postMessage(message: string) {
    this.port?.postMessage(message);
  }
}

export const port = new Port();

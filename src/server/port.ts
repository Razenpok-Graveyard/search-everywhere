export class Port {
  port: chrome.runtime.Port;

  constructor(port: chrome.runtime.Port) {
    this.port = port;
  }
}

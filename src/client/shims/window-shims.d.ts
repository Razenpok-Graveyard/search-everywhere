export {};

declare global {
  interface Window {
    "search-everywhere": {
      loadStyles: (el: Node) => void;
    };
  }
}

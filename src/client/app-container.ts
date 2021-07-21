import { App } from "vue";
import { ShiftShiftTracker } from "./shift-shift-tracker";

export class AppContainer {
  private root: HTMLElement;
  private appRoot: HTMLElement;
  private shiftShiftTracker: ShiftShiftTracker;
  private app?: App<Element>;
  requestShow: () => void = () => {};
  requestHide: () => void = () => {};

  constructor() {
    this.root = document.createElement("search-everywhere-extension");
    const shadow = this.root.attachShadow({ mode: "open" });
    const styleRoot = document.createElement("div");
    this.appRoot = document.createElement("div");

    styleRoot.appendChild(this.appRoot);
    window["search-everywhere"].loadStyles(styleRoot);
    shadow.appendChild(styleRoot);
    document.documentElement.appendChild(this.root);

    this.shiftShiftTracker = new ShiftShiftTracker();
    this.shiftShiftTracker.requestShow = () => this.requestShow();
  }

  setOutsideClickTracking(isEnabled: boolean) {
    if (isEnabled) {
      document.addEventListener("mousedown", this.outsideClickListener);
    } else {
      document.removeEventListener("mousedown", this.outsideClickListener);
    }
  }

  private outsideClickListener = (event: any) => {
    if (!this.root.contains(event.target) && this.isElementVisible(this.root)) {
      this.requestHide();
    }
  };

  private isElementVisible = (elem: HTMLElement) => {
    return (
      !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
    );
  };

  mount(app: App<Element>) {
    this.app = app;
    app.mount(this.appRoot);
  }

  unmount() {
    document.removeEventListener("mousedown", this.outsideClickListener);
    this.shiftShiftTracker.unmount();
    this.app?.unmount();
    this.root.remove();
  }
}

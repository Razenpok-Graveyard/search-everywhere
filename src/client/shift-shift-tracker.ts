export class ShiftShiftTracker {
  requestShow: () => void = () => {};

  pressed: string = "";
  lastPressed: string = "";
  isDoublePress: boolean = false;
  timeout?: NodeJS.Timeout;

  constructor() {
    window.addEventListener("keyup", this.keyPress);
  }

  unmount() {
    window.removeEventListener("keyup", this.keyPress);
  }

  private keyPress = (key: KeyboardEvent) => {
    this.pressed = key.key;

    if (this.isDoublePress && this.pressed === this.lastPressed) {
      this.isDoublePress = false;
      if (key.key === "Shift") {
        this.requestShow();
      }
      if (this.timeout != undefined) {
        clearTimeout(this.timeout);
      }
    } else {
      this.isDoublePress = true;
      this.timeout = setTimeout(() => (this.isDoublePress = false), 500);
    }

    this.lastPressed = this.pressed;
  };
}

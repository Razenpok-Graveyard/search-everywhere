import { port } from "./port";
import { createApp, watch } from "vue";
import { store } from "./store";
import App from "./App.vue";
import { AppContainer } from "./app-container";
import { Action } from "./store/action-types";

const app = createApp(App);
app.use(store);

const container = new AppContainer();
container.requestShow = () => store.dispatch(Action.SHOW);
container.requestHide = () => store.dispatch(Action.HIDE);
watch(
  () => store.state.isVisible,
  (value) => container.setOutsideClickTracking(value)
);
container.mount(app);

port.onMessage = (listings) => {
  store.dispatch(Action.UPDATE_LISTINGS, listings);
};
port.connect();
port.postMessage("");

chrome.runtime
  .connect({ name: "extension_update" })
  .onDisconnect.addListener(() => container.unmount());

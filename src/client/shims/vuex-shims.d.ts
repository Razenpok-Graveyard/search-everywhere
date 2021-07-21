import { TypedStore } from "../store/types";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: TypedStore;
  }
}

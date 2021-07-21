import { createStore } from "vuex";
import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { TypedStore } from "./types";

export const store = <TypedStore>createStore({
  state,
  getters,
  mutations,
  actions,
});

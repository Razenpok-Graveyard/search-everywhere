import { TypedActionContext as Context } from "./types.d";
import { port } from "../port";
import { Action } from "./action-types";
import { Mutation } from "./mutation-types";
import { SearchListing } from "../../shared/search-listing";

export const actions = {
  [Action.SHOW]({ commit }: Context) {
    commit(Mutation.SET_IS_VISIBLE, true);
  },
  [Action.HIDE]({ commit }: Context) {
    commit(Mutation.SET_IS_VISIBLE, false);
  },
  [Action.SEARCH]({}: Context, payload: string) {
    port.postMessage(payload);
  },
  [Action.MOVE_UP]({ state, commit }: Context) {
    if (state.listingIndex > 0) {
      commit(Mutation.SET_LISTING_INDEX, state.listingIndex - 1);
    }
  },
  [Action.MOVE_DOWN]({ state, commit }: Context) {
    if (state.listingIndex < state.listings.length - 1) {
      commit(Mutation.SET_LISTING_INDEX, state.listingIndex + 1);
    }
  },
  [Action.UPDATE_LISTINGS]({ commit }: Context, payload: SearchListing[]) {
    commit(Mutation.SET_LISTING_INDEX, 0);
    commit(Mutation.SET_LISTINGS, payload);
  },
  [Action.OPEN_LISTING]({ getters, dispatch }: Context, id: string) {
    chrome.runtime.sendMessage(id);
    dispatch(Action.HIDE);
  },
  [Action.OPEN_SELECTED_LISTING]({ getters, dispatch }: Context) {
    dispatch(Action.OPEN_LISTING, getters.selectedListingId);
  },
};

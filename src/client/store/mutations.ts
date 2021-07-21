import { SearchListing } from "../../shared/search-listing";
import { Mutation } from "./mutation-types";
import { State } from "./state";

export const mutations = {
  [Mutation.SET_IS_VISIBLE](state: State, payload: boolean) {
    state.isVisible = payload;
  },
  [Mutation.SET_LISTINGS](state: State, payload: SearchListing[]) {
    state.listings = payload;
  },
  [Mutation.SET_LISTING_INDEX](state: State, payload: number) {
    state.listingIndex = payload;
  },
};

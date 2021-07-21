import { State } from "./state";

export const getters = {
  selectedListingId: (state: State) => {
    if (state.listings.length === 0) {
      return "";
    }
    return state.listings[state.listingIndex].id;
  },
};

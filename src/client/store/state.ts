import { SearchListing } from "../../shared/search-listing";

export interface State {
  isVisible: boolean;
  listings: SearchListing[];
  listingIndex: number;
}

export const state: State = {
  isVisible: false,
  listings: [],
  listingIndex: 0,
};

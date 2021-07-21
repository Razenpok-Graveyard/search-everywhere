import { SearchItem } from "./search-item";

export class SearchDatabase {
  items: { [id: string]: SearchItem } = {};
}

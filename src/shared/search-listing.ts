export class SearchListing {
  id: string;
  title: string;
  details: string;
  icon: string;

  constructor(id: string, title: string, details: string, icon: string) {
    this.id = id;
    this.title = title;
    this.details = details;
    this.icon = icon;
  }
}

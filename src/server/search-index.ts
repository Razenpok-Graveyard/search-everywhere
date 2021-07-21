export class SearchIndex {
  items: { id: string; text: string }[] = [];

  add(id: string, text: string) {
    this.items.push({ id, text });
  }

  remove(id: string) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  search(query: string) {
    const result: string[] = [];
    for (const item of this.items) {
      if (result.includes(item.id)) {
        continue;
      }

      if (item.text.toLowerCase().includes(query.toLowerCase())) {
        result.push(item.id);
      }
    }

    return result;
  }
}

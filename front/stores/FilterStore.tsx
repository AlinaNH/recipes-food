import { decorate, observable, computed, action } from 'mobx';

class FilterStore {
  filters = new Map();

  get getFilters(): string[] {
    return Array.from(this.filters.values());
  }

  setFilter(filter: string): void {
    const id = this._generateId();
    this.filters.set(id, filter);
  }

  deleteFilter(filter: string): void {
    const id = this._getKeyByValue(filter);
    this.filters.delete(id);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }

  _getKeyByValue(filter: string): string {
    return [...this.filters].find(([key, value]) => value === filter)[0];
  }
}

decorate(FilterStore, {
  filters: observable,
  getFilters: computed,
  setFilter: action,
  deleteFilter: action,
});

export default FilterStore;

import { decorate, observable, computed, toJS } from 'mobx';

type cuisinesType = {
    id: string
    cuisine: string
}

class CuisinesStore {
  cuisines = [];
  isLoading = false;
  transportLayer;

  constructor() {
    this.fulfillStore();
  }

  private async fulfillStore() {
    this.cuisines = await fetch(window.location.href.split('#')[0] + 'cuisines')
      .then((response) => response.json());
  }

  get getCuisines(): cuisinesType[] {
    return toJS(this.cuisines);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }
}

decorate(CuisinesStore, {
  cuisines: observable,
  getCuisines: computed
});

export default CuisinesStore;

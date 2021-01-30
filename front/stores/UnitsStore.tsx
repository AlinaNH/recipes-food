import { decorate, observable, computed, toJS } from 'mobx';

type unitsType = {
    id: string
    unit: string
}

class UnitsStore {
  units = [];

  constructor() {
    this.fulfillStore();
  }

  private async fulfillStore() {
    this.units = await fetch(window.location.href.split('#')[0] + 'units')
      .then((response) => response.json());
  }

  get getUnits(): unitsType[] {
    return toJS(this.units);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }
}

decorate(UnitsStore, {
  units: observable,
  getUnits: computed
});

export default UnitsStore;

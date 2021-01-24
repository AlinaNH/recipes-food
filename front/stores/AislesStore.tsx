import { decorate, observable, computed, toJS } from 'mobx';

type aislesType = {
    id: string
    aisle: string
}

class AislesStore {
  aisles = [];

  private async fulfillStore() {
    this.aisles = await fetch(window.location.href.split('#')[0] + 'aisles')
      .then((response) => response.json());
  }

  get getAisles(): aislesType[] {
    this.fulfillStore();
    return toJS(this.aisles);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }
}

decorate(AislesStore, {
  aisles: observable,
  getAisles: computed
});

export default AislesStore;

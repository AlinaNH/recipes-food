import { decorate, observable, computed, toJS } from 'mobx';

type mealtypesType = {
    id: string
    mealtype: string
}

class MealtypesStore {
  mealtypes = [];

  constructor() {
    this.fulfillStore();
  }

  private async fulfillStore() {
    this.mealtypes = await fetch(window.location.href.split('#')[0] + 'mealtypes')
      .then((response) => response.json());
  }

  get getMealtypes(): mealtypesType[] {
    return toJS(this.mealtypes);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }
}

decorate(MealtypesStore, {
  mealtypes: observable,
  getMealtypes: computed
});

export default MealtypesStore;

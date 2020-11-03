import AutocompleteStore from './storeAutocomplete';

class mainStore {
  AutocompleteStore: object;
  constructor() {
    this.AutocompleteStore = new AutocompleteStore();
  }
}

export default new mainStore();

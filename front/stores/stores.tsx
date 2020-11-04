import FilterStore from './FilterStore';
import AutocompleteStore from './storeAutocomplete';

export const stores = {
  filterStore: new FilterStore(),
  autocompleteStore: new AutocompleteStore(),
};

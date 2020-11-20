import FilterStore from './FilterStore';
import AutocompleteStore from './storeAutocomplete';
import UserPageNavigationStore from './UserPageNavigationStore';

export const stores = {
  filterStore: new FilterStore(),
  autocompleteStore: new AutocompleteStore(),
  userPageNavStore: new UserPageNavigationStore()
};

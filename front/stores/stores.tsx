import FilterStore from './FilterStore';
import AutocompleteStore from './storeAutocomplete';
import UserPageNavigationStore from './UserPageNavigationStore';
import ProductsStore from './ProductsStore';
import AislesStore from './AislesStore';


export const stores = {
  filterStore: new FilterStore(),
  autocompleteStore: new AutocompleteStore(),
  userPageNavStore: new UserPageNavigationStore(),
  productsStore: new ProductsStore(),
  aislesStore: new AislesStore
};

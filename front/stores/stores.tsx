import FilterStore from './FilterStore';
import AutocompleteStore from './storeAutocomplete';
import UserPageNavigationStore from './UserPageNavigationStore';
import ProductsStore from './ProductsStore';
import AislesStore from './AislesStore';
import CuisinesStore from './CuisinesStore';
import MealtypesStore from './MealtypesStore';
import UnitsStore from './UnitsStore';


export const stores = {
  filterStore: new FilterStore(),
  autocompleteStore: new AutocompleteStore(),
  userPageNavStore: new UserPageNavigationStore(),
  productsStore: new ProductsStore(),
  aislesStore: new AislesStore(),
  cuisinesStore: new CuisinesStore(),
  mealtypesStore: new MealtypesStore(),
  unitsStore: new UnitsStore()
};

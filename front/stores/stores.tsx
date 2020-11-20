import FilterStore from './FilterStore';
import AutocompleteStore from './storeAutocomplete';
import UserPageNavigationStore from './UserPageNavigationStore';
import IngredientsStore from './IngredientsStore';


export const stores = {
  filterStore: new FilterStore(),
  autocompleteStore: new AutocompleteStore(),
  userPageNavStore: new UserPageNavigationStore()
  ingredientsStore: new IngredientsStore()
};

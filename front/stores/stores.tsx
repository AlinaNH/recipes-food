import FilterStore from './FilterStore';
import AutocompleteStore from './storeAutocomplete';
import IngredientsStore from './IngredientsStore';

export const stores = {
  filterStore: new FilterStore(),
  autocompleteStore: new AutocompleteStore(),
  ingredientsStore: new IngredientsStore()
};

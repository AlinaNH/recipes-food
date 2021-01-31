import { decorate, observable, computed, toJS } from 'mobx';

type recipesType = {
    title: string,
    image?: string,
    servings: number,
    minutes: number,
    source?: string,
    instruction?: string,
    cuisine: string,
    mealtypes: string[],
    ingredients?: Array<{product: string, quantity: number, unit: string}>
}

class RecipesStore {
  recipesData = [];
  recipesShortData = [];

  constructor() {
    this.loadRecipesData();
    this.loadRecipesShortData();
  }

  async loadRecipesData() {
    this.recipesData = await fetch(window.location.href.split('#')[0] + 'recipes')
      .then((response) => response.json());
  }

  async loadRecipesShortData() {
    this.recipesShortData
      = await fetch(window.location.href.split('#')[0] + 'recipes/short')
        .then((response) => response.json());
  }

  get getRecipesData(): recipesType[] {
    return toJS(this.recipesData);
  }

  get getRecipesShortData(): recipesType[] {
    return toJS(this.recipesShortData);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }
}

decorate(RecipesStore, {
  recipesData: observable,
  recipesShortData: observable,
  getRecipesData: computed,
  getRecipesShortData: computed
});

export default RecipesStore;

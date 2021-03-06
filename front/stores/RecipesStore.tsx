import { decorate, observable, computed, toJS, action } from 'mobx';

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
  searchedTitle = '';
  recipesTitles = [];
  searchedRecipes = [];

  constructor() {
    this.loadRecipesData();
    this.loadRecipesShortData();
    this.loadRecipesTitles();
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

  async loadRecipesTitles() {
    this.recipesTitles
      = await fetch(window.location.href.split('#')[0] + 'recipes/titles')
        .then((response) => response.json());
  }

  get getRecipesData(): recipesType[] {
    return toJS(this.recipesData);
  }

  get getRecipesShortData(): recipesType[] {
    return toJS(this.recipesShortData);
  }

  get getSearchedTitle(): string {
    return this.searchedTitle;
  }

  get getRecipesTitles(): string[] {
    return this.recipesTitles;
  }

  setSearchedTitle(title: string): void {
    this.searchedTitle = title;
  }

  get getSearchedRecipes() {
    return this.searchedRecipes;
  }

  setSearchedRecipes(recipes) {
    this.searchedRecipes = recipes;
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
  recipesTitles: observable,
  getRecipesData: computed,
  getRecipesTitles: computed,
  getRecipesShortData: computed,
  getSearchedTitle: computed,
  setSearchedTitle: action,
  getSearchedRecipes: computed,
  setSearchedRecipes: action
});

export default RecipesStore;

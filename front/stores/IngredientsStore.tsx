import { decorate, observable, computed, action, toJS } from 'mobx';

type ingredientType = {
    id: string
    name: string,
    type: string,
    unit: string
}

class IngredientsStore {
  ingredients = [];

  get getIngredients(): ingredientType[] {
    return toJS(this.ingredients);
  }

  setIngredient(ingredient: ingredientType): void {
    ingredient.id = this._generateId();
    this.ingredients.push(ingredient);
  }

  deleteIngredient(name: string): void {
    const id = this._findIngredientByName(name);
    this.ingredients.splice(id, 1);
  }

  _generateId(): string {
    return (
      performance.now().toString(36) + Math.random().toString(36)
    ).replace(/\./g, '');
  }

  _findIngredientByName(name: string): number {
    return [...this.ingredients].findIndex(
      (ingredient) => ingredient.name === name
    )[0];
  }
}

decorate(IngredientsStore, {
  ingredients: observable,
  getIngredients: computed,
  setIngredient: action,
  deleteIngredient: action,
});

export default IngredientsStore;

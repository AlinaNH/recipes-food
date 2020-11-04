/* eslint-disable no-invalid-this */
import { action, observable, toJS } from 'mobx';
import colorsTag from '../HomePage/SearchPanel/AutocompleteSearch/AutocompleteTagColors';

export interface AutocompleteStorProps {
  selectedIngredients: Array<selectedIngredientsType>;
  colorsIndex: Array<number>;
  getSelectedIngredients(): void;
  addIngredients(ingredients: any[]): void;
  addColorIndex(colorIndex: Array<number>): void;
  removeSelectedIngredients(optionType: string, optionColor: string): void;
  clearAllSelectedIngredients(): void;
  removeLastSelectedIngredients(): void;
  addIngredientsWhitColor(newValue: any[], reason: string): void;
}

interface selectedIngredientsType {
  type: string;
  color: string;
}

export default class AutocompleteStore {
  @observable selectedIngredients: Array<selectedIngredientsType> = [];
  @observable colorsIndex: Array<number> = [];

  @action getRandomUniqColorIndex = () => {
    while (true) {
      const randomIndex = Math.floor(Math.random() * colorsTag.length);
      if (!toJS(this.colorsIndex).includes(randomIndex)) {
        this.addColorIndex([...toJS(this.colorsIndex), randomIndex]);
      } else if (toJS(this.selectedIngredients).length == colorsTag.length) {
        this.addColorIndex([randomIndex]);
      } else {
        continue;
      }
      return randomIndex;
    }
  };

  @action clearAllSelectedIngredients() {
    this.addColorIndex([]);
    this.addIngredients([]);
  }

  @action removeLastSelectedIngredients() {
    const updateColorIndex = toJS(this.colorsIndex).filter(
      (e, i) => i != toJS(this.colorsIndex).length - 1,
    );
    const updateValue = toJS(this.selectedIngredients).filter(
      (e, i) => i != toJS(this.selectedIngredients).length - 1,
    );
    this.addColorIndex(updateColorIndex);
    this.addIngredients(updateValue);
  }

  @action getSelectedIngredients() {
    return toJS(this.selectedIngredients);
  }

  @action addIngredientsWhitColor(newValue, reason) {
    const randomColor = colorsTag[this.getRandomUniqColorIndex()];
    const addColorElement = newValue.map((e, i) => {
      if (i == newValue.length - 1 && reason !== 'remove-option') {
        return { ...e, color: randomColor };
      }
      return e;
    });
    this.addIngredients(addColorElement);
  }

  @action addIngredients(ingredients) {
    this.selectedIngredients = ingredients;
  }

  @action addColorIndex(colorIndex) {
    this.colorsIndex = colorIndex;
  }

  @action removeSelectedIngredients(optionType, optionColor) {
    this.addIngredients(
      toJS(this.selectedIngredients).filter((e) => e.type !== optionType),
    );
    this.addColorIndex(
      toJS(this.colorsIndex).filter((e) => e !== colorsTag.indexOf(optionColor)),
    );
  }
}

import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import IngredientsTable from './IngredientsTable';
import IngredientsStore from './../../stores/IngredientsStore';

let container = null;
const ingredientsStore = new IngredientsStore();

function addIngredient(name: string, type: string, unit: string) {
  (document
    .querySelector('#addIngredientButton') as HTMLButtonElement)
    .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  (document.querySelector('#nameInput') as HTMLInputElement).value = name;
  (document.querySelector('#typeInput') as HTMLInputElement).value = type;
  (document.querySelector('#unitInput') as HTMLInputElement).value = unit;
  (document
    .querySelector('#saveIngredientButton') as HTMLButtonElement)
    .dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

beforeAll(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  const ingredientsTable = React.createElement(
    IngredientsTable,
    { ingredientsStore: ingredientsStore }
  );
  render(ingredientsTable, container);
});

afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Add ingredient', () => {
  it('Click on button \'add ingredient\' opens a dialog modal', () => {
    (document
      .querySelector('#addIngredientButton') as HTMLButtonElement)
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelector('.MuiDialog-root')).not.toBeNull;
  });

  it('Modal inputs must not be null', () => {
    const initialIngredientsQty = ingredientsStore.getIngredients.length;
    addIngredient('', '', '');
    expect(document.querySelector('.MuiDialog-root')).not.toBeNull;
    expect(ingredientsStore.getIngredients.length).toBe(initialIngredientsQty);
  });

  it('Modal inputs must not contain numbers', () => {
    const initialIngredientsQty = ingredientsStore.getIngredients.length;
    act(() => {
      addIngredient('0', '0', '0');
    });
    expect(document.querySelector('.MuiDialog-root')).not.toBeNull;
    expect(ingredientsStore.getIngredients.length).toBe(initialIngredientsQty);
  });

  it('Modal inputs save text values into ingredientsStore', () => {
    const initialIngredientsQty = ingredientsStore.getIngredients.length;
    addIngredient('test1', 'test1', 'test1');
    expect(document.querySelector('.MuiDialog-root')).not.toBeNull;
    expect(ingredientsStore.getIngredients.length).toBe(initialIngredientsQty + 1);
  });

  it('Modal inputs don\'t save dublicate data', () => {
    const initialIngredientsQty = ingredientsStore.getIngredients.length;
    act(() => {
      addIngredient('test1', 'test1', 'test1');
    });
    expect(document.querySelector('.MuiDialog-root')).toBeNull;
    expect(ingredientsStore.getIngredients.length).toBe(initialIngredientsQty);
  });

  it('Close error message after trying to save a duplicate ingredient', () => {
    act(() => {
      addIngredient('test1', 'test1', 'test1');
    });
    (document
      .querySelector('.MuiSnackbar-root button') as HTMLButtonElement)
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelector('.MuiSnackbar-root')).toBeNull;
  });

  it('New ingredient is added to ingredients table', () => {
    addIngredient('test2', 'test2', 'test2');
    expect(
      (document.querySelector('tr:last-child td:nth-child(2)') as HTMLTableCellElement)
        .textContent
    ).toBe('test2');
  });

  it('Button \'cancel\' in modal closes the modal', () => {
    (document
      .querySelector('#addIngredientButton') as HTMLButtonElement)
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    (document
      .querySelector('#closeModalButton') as HTMLButtonElement)
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.querySelector('.MuiDialog-root')).toBeNull;
  });
});

describe('Delete ingredient', () => {
  it('Delete one ingredient ', () => {
    act(() => {
      addIngredient('test3', 'test3', 'test3');
    });
    const initialIngredientsQty = ingredientsStore.getIngredients.length;
    act(() => {
      (document
        .querySelector(`tr:nth-last-child(1) td:nth-child(1)`) as HTMLInputElement)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    act(() => {
      (document
        .querySelector('#deleteIngredientButton') as HTMLButtonElement)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(
      (document
        .querySelector('tr:last-child td:nth-child(2)') as HTMLTableCellElement)
        .textContent
    ).not.toBe('test3');
    expect(ingredientsStore.getIngredients.length).toBe(initialIngredientsQty - 1);
  });

  it('Delete two ingredients', () => {
    act(() => {
      addIngredient('test4', 'test4', 'test4');
      addIngredient('test5', 'test5', 'test5');
    });
    const initialIngredientsQty = ingredientsStore.getIngredients.length;
    act(() => {
      (document
        .querySelector(`tr:nth-last-child(2) td:nth-child(1)`) as HTMLInputElement)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
      (document
        .querySelector(`tr:nth-last-child(1) td:nth-child(1)`) as HTMLInputElement)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    act(() => {
      (document
        .querySelector('#deleteIngredientButton') as HTMLButtonElement)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(
      (document
        .querySelector('tr:nth-last-child(1) td:nth-child(2)') as HTMLTableCellElement)
        .textContent
    ).not.toBe('test5');
    expect(ingredientsStore.getIngredients.length).toBe(initialIngredientsQty - 2);
  });
});

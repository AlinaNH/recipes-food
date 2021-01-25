import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProductsTable from './ProductsTable';
import ProductsStore from '../../stores/ProductsStore';
import AislesStore from '../../stores/AislesStore';

let container = null;
const productsStore = new ProductsStore();
const aislesStore = new AislesStore();

function addProduct(product: string) {
  (document
    .querySelector('#addProductButton') as HTMLButtonElement)
    .dispatchEvent(new MouseEvent('click', { bubbles: true }));
  (document.querySelector('#productInput') as HTMLInputElement).value = product;
  const autocomplete = (
    document.querySelectorAll('.MuiAutocomplete-popupIndicator')[0] as HTMLDivElement
  );
  autocomplete.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  autocomplete.dispatchEvent(new KeyboardEvent('keydown', {
    bubbles: true,
    key: 'ArrowDown'
  }));
  autocomplete.dispatchEvent(new KeyboardEvent('keydown', {
    bubbles: true,
    key: 'Enter'
  }));
  (document
    .querySelector('#saveProductButton') as HTMLButtonElement)
    .dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

beforeAll(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  const productsTable = React.createElement(
    ProductsTable,
    {
      productsStore: productsStore,
      aislesStore: aislesStore
    }
  );
  render(productsTable, container);
});

afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Add product', () => {
  it('Modal inputs must not be null', () => {
    const initialProductsQty = productsStore.getProducts.length;
    addProduct('');
    expect(productsStore.getProducts.length).toBe(initialProductsQty);
  });

  it('Modal inputs must not contain numbers', () => {
    const initialProductsQty = productsStore.getProducts.length;
    act(() => {
      addProduct('0');
    });
    expect(productsStore.getProducts.length).toBe(initialProductsQty);
  });

  // it('Modal inputs save text values into productsStore', () => {
  //   const initialProductsQty = productsStore.getProducts.length;
  //   act(() => {
  //     addProduct('test');
  //   });
  //   expect(productsStore.getProducts.length).toBe(initialProductsQty + 1);
  // });

  it('Modal inputs don\'t save dublicate data', () => {
    const initialProductsQty = productsStore.getProducts.length;
    act(() => {
      addProduct('test');
    });

    expect(productsStore.getProducts.length).toBe(initialProductsQty);
  });

  // it('New product is added to product table', () => {
  //   expect(
  //     (document.querySelector('tr:last-child td:nth-child(2)') as HTMLTableCellElement)
  //       .textContent
  //   ).toBe('test');
  // });
});

// describe('Delete product', () => {
//   it('Delete product', () => {
//     const initialProductsQty = productsStore.getProducts.length;
//     act(() => {
//       (document
//         .querySelector(`tr:nth-last-child(1) td:nth-child(1)`) as HTMLInputElement)
//         .dispatchEvent(new MouseEvent('click', { bubbles: true }));
//     });
//     act(() => {
//       (document
//         .querySelector('#deleteProductButton') as HTMLButtonElement)
//         .dispatchEvent(new MouseEvent('click', { bubbles: true }));
//     });
//     expect(productsStore.getProducts.length).toBe(initialProductsQty - 1);
//   });
// });

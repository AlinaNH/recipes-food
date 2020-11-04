import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import '@testing-library/jest-dom';

import FilterStore from './../../../stores/FilterStore';
import FilterBean from './FilterBean';
import { FILTER_BEANS_COLORS } from './FilterBeansColors';

let container = null;
const filterStore = new FilterStore();
const colors = Object.values(FILTER_BEANS_COLORS);
const filterBeansQuantity = colors.length + 1;

function generateFilterBeans(quantity: number) {
  const filterBeans = [];

  for (let i = 0; i < quantity; i++) {
    filterBeans.push(
      React.createElement(FilterBean, {
        name: `test ${i}`,
        filterStore: filterStore,
        key: i,
      }),
    );
  }

  return filterBeans;
}

beforeAll(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  const filterBeans = generateFilterBeans(filterBeansQuantity);
  render(filterBeans, container);
});

afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('FilterBeans rendering', () => {
  it('Сontainer is not empty', () => {
    expect(container.innerHTML).not.toBe('');
  });

  it(`Сontainer renders ${filterBeansQuantity} filterBeans`, () => {
    expect(container.children.length).toBe(filterBeansQuantity);
  });
});

describe('FilterBeans click testing', () => {
  let renderedFilterBeans = [];
  let randomFilterBean: HTMLButtonElement;

  beforeAll(() => {
    renderedFilterBeans = [...container.querySelectorAll('.filter-button')];
    renderedFilterBeans.forEach(e =>
      e.dispatchEvent(new MouseEvent('click', { bubbles: true })),
    );
    randomFilterBean =
      renderedFilterBeans[
        Math.floor(Math.random() * renderedFilterBeans.length)
      ];
  });

  it('Click on FilterBean changes its background to the color from FILTER_BEANS_COLORS in order', () => {
    renderedFilterBeans.forEach((e, i) =>
      expect(e).toHaveStyle(`background: ${colors[i]}`),
    );
  });

  it('All names of clicked filterBeans are saved in FilterStore', () => {
    const filterBeanNames = [];
    renderedFilterBeans.forEach(e => filterBeanNames.push(e.textContent));
    expect(filterBeanNames).toStrictEqual(filterStore.getFilters);
  });

  it('Click on random FilterBean changes its background to default', () => {
    randomFilterBean.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(randomFilterBean).toHaveStyle('background: #D3D3D3');
  });

  it('After Click name of random FilterBean removes from FilterStore', () => {
    expect(filterStore.getFilters.includes(randomFilterBean.textContent))
      .toBeFalsy;
  });
});

describe('Render FilterBean more than quantity of FILTER_BEANS_COLORS', () => {
  let lastFilterBean: HTMLButtonElement;
  beforeAll(() => {
    render(generateFilterBeans(filterBeansQuantity + 1), container);
    lastFilterBean = container.lastChild;
  });

  it(`Сontainer renders ${filterBeansQuantity + 1} filterBeans`, () => {
    expect(container.children.length).toBe(filterBeansQuantity + 1);
  });

  it(`Click on the last filter bean changes its background to the first color from FILTER_BEANS_COLORS`, () => {
    lastFilterBean.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(lastFilterBean).toHaveStyle(`background: ${colors[0]}`);
  });
});

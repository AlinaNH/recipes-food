import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { FilterBean } from './FilterBean';
import { FILTER_BEANS_COLORS } from './FilterBeansColors';
import { storeFilter } from '../../../stores/storeFilter';

let container = null;
beforeAll(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const rgb2hex = c =>
  '#' +
  c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, '0'))
    .join``.toUpperCase();

describe('FilterBean', () => {
  it("FilerBean component renders a button with class name 'filter-button' and with text 'test'", () => {
    act(() => {
      render(React.createElement(FilterBean, { name: 'test' }), container);
    });
    expect(container.firstChild.nodeName).toBe('BUTTON');
    expect(container.firstChild.classList[0]).toBe('filter-button');
    expect(container.firstChild.textContent).toBe('test');
  });

  it('clicked FilterBean changed its background color to first color of FILTER_BEANS_COLORS', () => {
    act(() => {
      container
        .querySelector('.filter-button')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(rgb2hex(container.firstChild.style.backgroundColor)).toBe(
      Object.values(FILTER_BEANS_COLORS)[0],
    );
  });

  it("clicked FilterBean's name, index, path were saved into mobx store", () => {
    expect(storeFilter.getSelectedFilterBeans().length).toBe(1);
    expect(storeFilter.getSelectedFilterBeans()[0].name).toBe('test');
    expect(storeFilter.getSelectedFilterBeans()[0].index).toBe(0);
    expect(
      storeFilter.getSelectedFilterBeans()[0].path.getAttribute('class'),
    ).toBe('filter-button');
    expect(
      storeFilter.getSelectedFilterBeans()[0].path.getAttribute('id'),
    ).toBe('test');
  });

  it('second rendered clicked FilterBean changed its background color to second color of FILTER_BEANS_COLORS and its name, index, path were saved into mobx store', () => {
    act(() => {
      const twoFilterBeans = React.createElement(
        React.Fragment,
        null,
        React.createElement(FilterBean, { name: 'first FilterBean' }),
        React.createElement(FilterBean, { name: 'second FilterBean' }),
      );
      render(twoFilterBeans, container);
    });
    expect(container.querySelectorAll('.filter-button')[1].textContent).toBe(
      'second FilterBean',
    );
    act(() => {
      container
        .querySelectorAll('.filter-button')[1]
        .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(rgb2hex(container.children[1].style.backgroundColor)).toBe(
      Object.values(FILTER_BEANS_COLORS)[1],
    );
    expect(storeFilter.getSelectedFilterBeans().length).toBe(2);
    expect(storeFilter.getSelectedFilterBeans()[1].name).toBe(
      'second FilterBean',
    );
    expect(storeFilter.getSelectedFilterBeans()[1].index).toBe(1);
    expect(
      storeFilter.getSelectedFilterBeans()[1].path.getAttribute('id'),
    ).toBe('second FilterBean');
  });

  it('next clicked FilterBean which index is more than length of FILTER_BEANS_COLORS has index 0 and background color of first color of FILTER_BEANS_COLORS', () => {
    act(() => {
      const filterBeansWithAllBackgroundColors = [];
      for (let i = 0; i < Object.values(FILTER_BEANS_COLORS).length - 2; i++) {
        filterBeansWithAllBackgroundColors.push(
          React.createElement(FilterBean, { name: 'FilterBean-' + i, key: i }),
        );
      }
      render(
        React.createElement(
          React.Fragment,
          null,
          filterBeansWithAllBackgroundColors,
        ),
        container,
      );
    });
    act(() => {
      [].forEach.call(container.querySelectorAll('.filter-button'), e =>
        e.dispatchEvent(new MouseEvent('click', { bubbles: true })),
      );
    });
    expect(rgb2hex(container.lastChild.style.backgroundColor)).toBe(
      Object.values(FILTER_BEANS_COLORS)[0],
    );
    expect(storeFilter.getSelectedFilterBeans().length).toBe(
      Object.values(FILTER_BEANS_COLORS).length,
    );
    expect(
      storeFilter.getSelectedFilterBeans()[
        storeFilter.getSelectedFilterBeans().length - 1
      ].index,
    ).toBe(0);
  });

  it('randomly clicked FilterBean change its background color to default and its data is deleted from mobx store', () => {
    const randomIndex = Math.floor(
      Math.random() * container.querySelectorAll('.filter-button').length,
    );
    act(() => {
      container
        .querySelectorAll('.filter-button')
        [randomIndex].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(
      rgb2hex(
        container.querySelectorAll('.filter-button')[randomIndex].style
          .backgroundColor,
      ),
    ).toBe(
      Object.values(FILTER_BEANS_COLORS)[
        Object.values(FILTER_BEANS_COLORS).length - 1
      ],
    );
    expect(
      storeFilter
        .getSelectedFilterBeans()
        .findIndex(
          e =>
            e.name ===
            container.querySelectorAll('.filter-button')[randomIndex]
              .textContent,
        ),
    ).toBe(-1);
  });
});

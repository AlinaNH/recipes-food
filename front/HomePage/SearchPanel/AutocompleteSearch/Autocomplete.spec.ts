import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AutocompleteSearch } from './AutocompleteSearch';
import AutocompleteStore from './../../../stores/storeAutocomplete';

let container = null;
const autocompleteStore = new AutocompleteStore();
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Autocomplete', () => {
  it('Renders without crashing', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch, { autocompleteStore }), container);
    });
    expect(container).not.toBe(null);
  });

  it('Open list-option after click', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch, { autocompleteStore }), container);
    });
    const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
    expect(buttonOpen.title).toBe('Open');
    act(() => {
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(buttonOpen.title).toBe('Close');
    expect(document.querySelector('.MuiAutocomplete-popper')).not.toBe(null);
  });

  it('List-option not empty', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch, { autocompleteStore }), container);
      const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(
      document.querySelector('.MuiAutocomplete-listbox').children.length > 0,
    ).toBe(true);
  });
  it('Select option and add tag', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch, { autocompleteStore }), container);
      const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const option = document.querySelector('.MuiAutocomplete-option');
    act(() => {
      option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('.MuiAutocomplete-tag')).not.toBe(null);
  });

  it('Delete tag', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch, { autocompleteStore }), container);
    });
    const tagDeleteButton = container.querySelector('.MuiChip-deleteIcon');
    act(() => {
      tagDeleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('.MuiAutocomplete-tag')).toBe(null);
  });
});

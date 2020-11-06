import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AutocompleteSearch } from './AutocompleteSearch';

let container = null;
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
  it('renders without crashing', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch), container);
    });
    expect(container).not.toBe(null);
  });

  it('open list-option after click', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch), container);
    });
    const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
    expect(buttonOpen.title).toBe('Open');
    act(() => {
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(buttonOpen.title).toBe('Close');
    expect(document.querySelector('.MuiAutocomplete-popper')).not.toBe(null);
  });
  it('list-option not empty', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch), container);
    });
    const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
    act(() => {
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(
      document.querySelector('.MuiAutocomplete-listbox').children.length > 0,
    ).toBe(true);
  });
  it('select option and add tag', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch), container);
    });
    const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
    act(() => {
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const option = document.querySelector('.MuiAutocomplete-option');
    act(() => {
      option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('.MuiAutocomplete-tag')).not.toBe(null);
  });

  it('delete tag', () => {
    act(() => {
      render(React.createElement(AutocompleteSearch), container);
    });
    const buttonOpen = container.querySelector('.MuiAutocomplete-popupIndicator');
    act(() => {
      buttonOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const option = document.querySelector('.MuiAutocomplete-option');
    act(() => {
      option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('.MuiAutocomplete-tag')).not.toBe(null);
    const tagDeleteButton = container.querySelector('.MuiChip-deleteIcon');
    expect(tagDeleteButton).not.toBe(null);
    act(() => {
      tagDeleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(container.querySelector('.MuiAutocomplete-tag')).toBe(null);
  });
});

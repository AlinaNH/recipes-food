import * as React from 'react';
import './SearchPanel.css';
import { CgSearch } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { AutocompleteSearch } from './AutocompleteSearch/AutocompleteSearch';

export const SearchPanel: React.FunctionComponent = () => {
  return (
    <div className="SearchPanel">
      <div className="SearchPanel_wrapper">
        <form onSubmit={(e) => e.preventDefault}>
          <div className="SearchPanel_searchInput">
            <AutocompleteSearch />
          </div>
          <div className="SearchPanel_buttonGroup">
            <Link to="/searchResults">
              <button onClick={(e) => e.preventDefault}>
                <CgSearch />
              </button>
            </Link>
            <button>Get random dishes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* eslint-disable max-len */
import * as React from 'react';
import './SearchPanel.css';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Chip,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField
} from '@material-ui/core';
import { TiArrowSortedDown } from 'react-icons/ti';
import { inject, observer } from 'mobx-react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colors from './AutocompleteSearch/AutocompleteTagColors';
import { useHistory } from 'react-router-dom';

type searchPanelProps = {
  recipesStore?: any,
  productsStore?: any,
  mealtypesStore?: any
};

const SearchPanel: React.FunctionComponent<searchPanelProps> = ({
  recipesStore, productsStore, mealtypesStore
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [inputValues, setInputValues] = React.useState([]);
  const history = useHistory();

  const options = [
    'search by ingredients',
    'search by recipe\'s title',
    'search by meal type'
  ];

  const stores = [
    productsStore.getProductsNames,
    recipesStore.getRecipesTitles,
    mealtypesStore.getMealtypes
  ];

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const renderAutocomplete = () => {
    const store = stores[selectedIndex];
    return (
      <Autocomplete
        id="autocomplete"
        multiple
        key={selectedIndex}
        limitTags={4}
        options={store}
        getOptionLabel={(option) => option.toString()}
        renderInput={(params) => (
          <TextField {...params} variant='outlined' />
        )}
        onChange={(event, value) => setInputValues(value)}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            return (
              <Chip
                {...getTagProps({ index })}
                style={{ background: `${colors[index]}`, transition: 'none' }}
                label={option.toString()}
              />
            );
          });
        }}
      />
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    switch (options[selectedIndex]) {
        case 'Search by recipe\'s title': {
          const recipes = await fetch(
            window.location.href.split('#')[0] + 'recipes/bytitles/' + JSON.stringify(inputValues)
          )
            .then((response) => response.json());
          recipesStore.setSearchedRecipes(recipes);
          break;
        }
        case 'Search by ingredients': {
          const recipes = await fetch(
            window.location.href.split('#')[0] + 'recipes/byingredients/' + JSON.stringify(inputValues)
          )
            .then((response) => response.json());
          recipesStore.setSearchedRecipes(recipes);
          break;
        }
        case 'Search by meal type': {
          const recipes = await fetch(
            window.location.href.split('#')[0] + 'recipes/bymealtypes/' + JSON.stringify(inputValues)
          )
            .then((response) => response.json());
          recipesStore.setSearchedRecipes(recipes);
          break;
        }
        default: return;
    }
    history.push('/searchResults');
  };

  return (
    <div className='SearchPanel'>
      <div className='SearchPanel_wrapper'>
        <form onSubmit={(e) => e.preventDefault}>
          <div className='SearchPanel_searchInput'>
            {renderAutocomplete()}
          </div>
          <div className='SearchPanel_buttonGroup'>
            <ButtonGroup
              variant='contained'
              color='primary'
              ref={anchorRef}
              aria-label='split button'
            >
              <Link to='/searchResults'>
                <Button
                  onClick={(e) => handleClick(e)}
                  color='primary'
                  variant='contained'
                  className='SearchPanel-submitButton buttonGroup'
                >{options[selectedIndex]}</Button>
              </Link>
              <Button
                color='primary'
                size='small'
                className='SearchPanel-autocompleteButton buttonGroup'
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='menu'
                onClick={handleToggle}
              >
                <TiArrowSortedDown />
              </Button>
            </ButtonGroup>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </form>
      </div>
    </div>
  );
};

export default inject(
  'recipesStore',
  'productsStore',
  'mealtypesStore'
)(observer(SearchPanel));

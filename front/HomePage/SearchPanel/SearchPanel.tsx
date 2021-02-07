import * as React from 'react';
import './SearchPanel.css';
import { Link } from 'react-router-dom';
import { AutocompleteSearch } from './AutocompleteSearch/AutocompleteSearch';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@material-ui/core';
import { TiArrowSortedDown } from 'react-icons/ti';

export const SearchPanel: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const options = [
    'Search by ingredients',
    'Search by recipe\'s title',
    'Search by meal type'
  ];

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
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

  return (
    <div className='SearchPanel'>
      <div className='SearchPanel_wrapper'>
        <form onSubmit={(e) => e.preventDefault}>
          <div className='SearchPanel_searchInput'>
            <AutocompleteSearch />
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
                  onClick={handleClick}
                  color='primary'
                  variant='contained'
                  className='SearchPanel-submitButton'
                >{options[selectedIndex]}</Button>
              </Link>
              <Button
                color='primary'
                size='small'
                className='SearchPanel-autocompleteButton'
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
                    // eslint-disable-next-line max-len
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

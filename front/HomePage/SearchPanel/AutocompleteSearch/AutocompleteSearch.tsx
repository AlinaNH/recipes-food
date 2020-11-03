import * as React from 'react';
import './AutocompleteSearch.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { observer, inject } from 'mobx-react';
import { AutocompleteStorProps } from '../../../stores/storeAutocomplete';


interface IngredientsType {
  type: string;
  color?: string;
}

let ingredientsData: Array<IngredientsType> = [
  { type: 'apple' },
  { type: 'tomato' },
  { type: 'pepper' },
  { type: 'kiwi' },
  { type: 'lemon' },
  { type: 'orange' },
  { type: 'carrot' },
  { type: 'onion' },
  { type: 'pumpkin' },
  { type: 'turnips' },
  { type: 'cabbage' },
  { type: 'cucumber' },
  { type: 'radish' },
  { type: 'celery' },
  { type: 'garlic' },
  { type: 'pumpkins' },
  { type: 'turnipss' },
  { type: 'cabbages' },
  { type: 'cucumbers' },
  { type: 'radishs' },
  { type: 'celerys' },
  { type: 'garlics' },
];

interface AutocompleteProps {
  AutocompleteStore?: AutocompleteStorProps;
}

export const AutocompleteSearch = inject('AutocompleteStore')(
  observer((props: AutocompleteProps) => {
    const store = props.AutocompleteStore;
    const [inputValue, setInputValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const maxAvailableTag = 20;
    const onChangeHandler = (reason: string, newValue: Array<IngredientsType>) => {
      switch (reason) {
        case 'clear':
          store.clearAllSelectedIngredients();
          break;
        case 'remove-option':
          store.removeLastSelectedIngredients();
          break;
        default:
          store.addIngredientsWhitColor(newValue, reason);
      }
    };
    return (
      <Autocomplete
        id="autocomplete"
        multiple
        value={store.selectedIngredients}
        open={open}
        inputValue={inputValue}
        onOpen={() => {
          store.selectedIngredients.length == maxAvailableTag ? setOpen(false): setOpen(true);
        }}
        onClose={() => setOpen(false)}
        filterSelectedOptions
        options={ingredientsData}
        getOptionSelected={(option, value) => option.type === value.type}
        getOptionLabel={option => option.type}
        onChange={(_,newValue: Array<IngredientsType> | null,reason: string) => {
          onChangeHandler(reason, newValue);
        }}
        onInputChange={(_, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        renderInput={params => <TextField {...params} variant="outlined" />}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            return (
              <Chip
                {...getTagProps({ index })}
                style={{ background: `${option.color}`, transition: 'none' }}
                label={option.type}
                onDelete={() => {
                  store.removeSelectedIngredients(option.type, option.color);
                }}
              />
            );
          });
        }}
      />
    );
  }),
);

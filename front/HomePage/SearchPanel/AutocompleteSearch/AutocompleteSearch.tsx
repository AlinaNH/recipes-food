import * as React from 'react';
import './AutocompleteSearch.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

let ingredientsData: object[] = [
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

let colors: string[] = [
  'green',
  'blue',
  'crimson',
  'orange',
  'pink',
  'coral',
  'olive',
  'gold',
  'beige',
  'HotPink',
  'violet',
  'aqua',
  'SpringGreen',
  'cadetblue',
  'darkslateblue',
  'greenyellow',
  'tomato',
  'slateblue',
  'skyblue',
];

export const AutocompleteSearch: React.FunctionComponent = () => {
  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [colorIndex, setColorIndex] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const maxAvailableTag = 20;
  const getRandomUniqIndex = (
    indexRange: number,
    indexStore: number[],
  ): number => {
    while (true) {
      let randomIndex = Math.floor(Math.random() * indexRange);
      if (!indexStore.includes(randomIndex)) {
        setColorIndex([...indexStore, randomIndex]);
      } else if (indexStore.length == indexRange) {
        setColorIndex([randomIndex]);
      } else {
        continue;
      }
      return randomIndex;
    }
  };
  const onChangeHandler = (reason: string, newValue: object[]) => {
    switch (reason) {
      case 'clear':
        setColorIndex([]);
        setValue([]);
        break;
      case 'remove-option':
        let updateColorIndex = colorIndex.filter(
          (e, i) => i != colorIndex.length - 1,
        );
        let updateValue = value.filter((e, i) => i != value.length - 1);
        setColorIndex(updateColorIndex);
        setValue(updateValue);
        break;
      default:
        let randomColor = colors[getRandomUniqIndex(colors.length, colorIndex)];
        let addColorElement = newValue.map((e, i) => {
          if (i == newValue.length - 1 && reason !== 'remove-option') {
            return { ...e, color: randomColor };
          }
          return e;
        });
        setValue(addColorElement);
    }
  };
  return (
    <Autocomplete
      id="autocomplete"
      multiple
      value={value}
      open={open}
      inputValue={inputValue}
      onOpen={() => {
        value.length == maxAvailableTag ? setOpen(false) : setOpen(true);
      }}
      onClose={() => setOpen(false)}
      filterSelectedOptions
      options={ingredientsData}
      getOptionSelected={(option, value) => option.type === value.type}
      getOptionLabel={option => option.type}
      onChange={(_, newValue: object[] | null, reason: string) => {
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
                setValue(value.filter(e => e.type !== option.type));
                setColorIndex(
                  colorIndex.filter(e => e !== colors.indexOf(option.color)),
                );
              }}
            />
          );
        });
      }}
    />
  );
};

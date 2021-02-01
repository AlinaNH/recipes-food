/* eslint-disable max-len */
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert/Alert';
import { Fab, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Snackbar, Typography } from '@material-ui/core';
import { FaPlus, FaTrash } from 'react-icons/fa';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecipesTable.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GoPlus, GoX } from 'react-icons/go';
import Chip from '@material-ui/core/Chip/Chip';

interface RecipesTableProps {
  cuisinesStore?: any;
  mealtypesStore?: any;
  productsStore?: any;
  unitsStore?: any;
  recipesStore?: any;
}

const RecipesTable: React.FunctionComponent<RecipesTableProps> = (
  { cuisinesStore, mealtypesStore, productsStore, unitsStore, recipesStore }
) => {
  const { SearchBar } = Search;

  const columnsData = [
    {
      dataField: 'title',
      text: 'Title',
      sort: true
    },
    {
      dataField: 'servings',
      text: 'Servings',
      sort: true
    },
    {
      dataField: 'minutes',
      text: 'Minutes',
      sort: true
    },
    {
      dataField: 'cuisine',
      text: 'Cuisine',
      sort: true
    },
    {
      dataField: 'mealtypes',
      text: 'Mealtypes',
      sort: true
    }
  ];

  const selectRow: SelectRowProps<any> = {
    mode: 'checkbox',
    clickToSelect: true,
    style: { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [servings, setServings] = React.useState(2);
  const [minutes, setMinutes] = React.useState(15);
  const [cuisine, setCuisine] = React.useState('');
  const [mealtypes, setMealtypes] = React.useState([]);
  const [product, setProduct] = React.useState('ale');
  const [quantity, setQuantity] = React.useState(1);
  const [unit, setUnit] = React.useState('can');
  const [ingredients, setIngredients] = React.useState([]);
  const [ingredientsInputs, setIngredientsInputs] = React.useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  function addNewIngredient(e) {
    e.preventDefault();
    e.stopPropagation();
    setIngredients([...ingredients, {
      product: product,
      quantity: quantity,
      unit: unit
    }]);

    const result = [(
      <div className='ingredient ingredient-data'>
        <TextField
          disabled
          label='Product'
          variant='outlined'
          size='small'
          defaultValue={ product }
          className='recipe-quantity recipe-product-data'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          disabled
          label='Quantity'
          variant='outlined'
          size='small'
          defaultValue={ quantity }
          className='recipe-quantity recipe-quantity-data'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          disabled
          label='Unit'
          variant='outlined'
          size='small'
          defaultValue={ unit }
          className='recipe-quantity recipe-unit-data'
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    )];
    setIngredientsInputs([...ingredientsInputs, result]);
  }

  async function addRecipe(e) {
    e.preventDefault();
    const recipe = {
      title: (document.querySelector('#recipe-title') as HTMLInputElement).value,
      servings: servings,
      minutes: minutes,
      image: (document.querySelector('#recipe-image') as HTMLInputElement).value,
      source: (document.querySelector('#recipe-source') as HTMLInputElement).value,
      cuisine: cuisine,
      mealtypes: mealtypes,
      instruction: (document.querySelector('#recipe-description') as HTMLInputElement).value,
      ingredients: ingredients
    };

    console.log(recipe);
    if (recipe) {
      await fetch(window.location.href.split('#')[0] + 'recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ recipe: recipe })
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
      setOpenSuccessAlert(true);
      setTimeout(() => {
        setOpenModal(false);
        setOpenSuccessAlert(true);
      }, 3000);
      recipesStore.loadRecipesData();
      recipesStore.loadRecipesShortData();
      forceUpdate();
    } else {
      setOpenErrorAlert(true);
    }
  }

  function deleteRecipe() {
    const checkboxesToDelete = document.querySelectorAll(
      'input[type=\'checkbox\']:checked'
    );
    [].forEach.call(checkboxesToDelete, async (checkbox) => {
      const recipeToDelete = checkbox.parentNode.nextSibling.textContent;
      await fetch(window.location.href.split('#')[0] + 'recipes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ recipeTitle: recipeToDelete })
      });
    });
    recipesStore.loadRecipesData();
    recipesStore.loadRecipesShortData();
    forceUpdate();
  }

  React.useEffect(() => console.log(ingredients), [ingredients]);

  return (
    <div className='recipe-table-container'>
      <form id='ingredients-form' onSubmit={(e) => addNewIngredient(e)}></form>
      <h2 className='recipe-table-header'>Recipes Table</h2>
      <ToolkitProvider
        keyField='title'
        data={ recipesStore.getRecipesShortData }
        columns={ columnsData }
        search
        bootstrap4
      >
        {
          (props) => (
            <div>
              <SearchBar {...props.searchProps} />
              <div className='recipe-table-button-container'>
                <Dialog
                  fullScreen
                  open={openModal}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                  className='add-recipe-modal'
                >
                  <form onSubmit={(e) => addRecipe(e)}>
                    <DialogTitle className='rt-title'>
                      <Typography variant='h6'>Add New Recipe</Typography>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText component={'span'} className='add-recipe-container'>
                        <div>
                          <TextField
                            id='recipe-title'
                            className='recipe-table-input'
                            label='Title'
                            required />
                          <div className='rt-container'>
                            <RadioGroup
                              aria-label='servings'
                              defaultValue='2'
                              className='rt-part-input-container'
                              onChange={(e) => setServings(+(e.target as HTMLInputElement).value)}
                            >
                              <FormLabel component='legend'>Servings</FormLabel>
                              <FormControlLabel
                                value='2'
                                control={<Radio color='primary' />}
                                label='2'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='4'
                                control={<Radio color='primary' />}
                                label='4'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='6'
                                control={<Radio color='primary' />}
                                label='6'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='8'
                                control={<Radio color='primary' />}
                                label='8'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='10'
                                control={<Radio color='primary' />}
                                label='10'
                                labelPlacement='top' />
                            </RadioGroup>
                            <RadioGroup
                              aria-label='Minutes'
                              defaultValue='15'
                              className='rt-part-input-container'
                              onChange={(e) => setMinutes(+(e.target as HTMLInputElement).value)}>
                              <FormLabel component='legend'>Minutes</FormLabel>
                              <FormControlLabel
                                value='15'
                                control={<Radio color='secondary' />}
                                label='15'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='25'
                                control={<Radio color='secondary' />}
                                label='25'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='40'
                                control={<Radio color='secondary' />}
                                label='40'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='60'
                                control={<Radio color='secondary' />}
                                label='60'
                                labelPlacement='top' />
                              <FormControlLabel
                                value='120'
                                control={<Radio color='secondary' />}
                                label='120'
                                labelPlacement='top' />
                            </RadioGroup>
                          </div>
                          <TextField
                            id='recipe-image'
                            className='recipe-table-input'
                            label='Image URL'
                            required />
                          <TextField
                            id='recipe-source'
                            className='recipe-table-input'
                            label='Source URL'
                            required />
                          <Autocomplete
                            limitTags={1}
                            className='recipe-table-input'
                            options={cuisinesStore.getCuisines}
                            getOptionLabel={(option) => option.toString()}
                            onChange={(event, value) => setCuisine(value.toString())}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                id='recipe-cuisine'
                                label='Cuisine'
                                placeholder='Cuisine'
                                variant='filled'
                                required />
                            )} />
                          <Autocomplete
                            multiple
                            limitTags={1}
                            className='recipe-table-input'
                            options={mealtypesStore.getMealtypes}
                            getOptionLabel={(option) => option.toString()}
                            onChange={(event, value) => setMealtypes(value)}
                            renderTags={(value: string[], getTagProps) => value.map((option: string, index: number) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                id='recipe-mealtypes'
                                label='Mealtypes'
                                placeholder='Mealtypes'
                                variant='filled'
                                inputProps={{
                                  ...params.inputProps,
                                  required: mealtypes.length === 0
                                }} />
                            )} />
                        </div>
                        <div>
                          <Paper variant='outlined' className='ingredients-container'>
                            <Typography variant='h6'>Add Ingredients</Typography>
                            <div className='ingredients-inputs-container'>
                              <div className='ingredient'>
                                <Autocomplete
                                  size='small'
                                  options={productsStore.getProductsNames}
                                  getOptionLabel={(option) => option.toString()}
                                  onChange={ (event, value) => setProduct(value.toString()) }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant='outlined'
                                      label='Product'
                                      className='recipe-product'
                                      required />
                                  )} />
                                <TextField
                                  required
                                  label='Quantity'
                                  variant='outlined'
                                  type='number'
                                  InputProps={{ inputProps: { min: 1, step: 0.01 } }}
                                  size='small'
                                  className='recipe-quantity'
                                  onChange={(event) => setQuantity(+event.target.value) } />
                                <Autocomplete
                                  size='small'
                                  options={unitsStore.getUnits}
                                  getOptionLabel={(option) => option.toString()}
                                  onChange={(event, value) => setUnit(value.toString()) }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className='recipe-unit'
                                      label='Unit'
                                      variant='outlined'
                                      required />
                                  )} />
                                <Fab
                                  color='primary'
                                  size='small'
                                  className='add-ingredient-button'
                                  type='submit'
                                  form='ingredients-form'
                                  onSubmit={(e) => addNewIngredient(e)}
                                >
                                  <GoPlus />
                                </Fab>
                              </div>
                              {ingredientsInputs}
                            </div>
                          </Paper>
                          <TextField
                            label='Description'
                            id='recipe-description'
                            multiline
                            rows={10}
                            variant='outlined'
                            className='rt-description'
                            required />
                        </div>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className='rt-buttons'>
                      <Button
                        onClick={() => setOpenModal(false)}
                        id='closeModalButton'
                        variant='contained'
                      >
                      Cancel
                      </Button>
                      <Button
                        id='saveRecipeButton'
                        variant='contained'
                        color='primary'
                        type='submit'
                        autoFocus
                      >
                      Save
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
                <Button
                  variant='contained'
                  color='primary'
                  className='recipe-table-button'
                  id='addRecipeButton'
                  onClick={() => setOpenModal(true)}
                >
                  <FaPlus />
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  className='recipe-table-button'
                  id='deleteRecipeButton'
                  onClick={deleteRecipe}
                >
                  <FaTrash />
                </Button>
              </div><BootstrapTable
                selectRow={selectRow}
                pagination={paginationFactory({})}
                {...props.baseProps} /><Snackbar
                open={openErrorAlert}
                autoHideDuration={3000}
                onClose={() => setOpenErrorAlert(false)}
              >
                <Alert onClose={() => setOpenErrorAlert(false)} severity='error'>
                                   Error occured.Please, try again.
                </Alert>
              </Snackbar>
              <Snackbar
                open={openSuccessAlert}
                autoHideDuration={3000}
                onClose={() => setOpenSuccessAlert(false)}
              >
                <Alert onClose={() => setOpenSuccessAlert(false)} severity='success'>
                    Product has been saved!
                </Alert>
              </Snackbar>
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  );
};

export default inject(
  'cuisinesStore',
  'mealtypesStore',
  'productsStore',
  'unitsStore',
  'recipesStore'
)(observer(RecipesTable));

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
import { GoPlus } from 'react-icons/go';

interface RecipesTableProps {
  productsStore?: any;
  aislesStore?: any;
}

const RecipesTable: React.FunctionComponent<RecipesTableProps> = (
  { productsStore, aislesStore }
) => {
  const { SearchBar } = Search;

  const columnsData = [
    {
      dataField: 'title',
      text: 'Title',
      sort: true
    },
    {
      dataField: 'title',
      text: 'Cuisine',
      sort: true
    },
    {
      dataField: 'mealtype',
      text: 'Mealtype',
      sort: true
    },
    {
      dataField: 'cuisine',
      text: 'Cuisine',
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
    }
  ];

  const selectRow: SelectRowProps<any> = {
    mode: 'checkbox',
    clickToSelect: true,
    style: { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
  };

  const ingredientInputsElement = (
    <div className='ingredient'>
      <TextField
        required
        label='Product'
        variant='outlined'
        size='small'
        className='ingredients-input'
      />
      <TextField
        required
        label='Quantity'
        variant='outlined'
        type='number'
        InputProps={{ inputProps: { min: 1 } }}
        size='small'
        className='ingredients-input'
      />
      <TextField
        required
        label='Unit'
        variant='outlined'
        size='small'
        className='ingredients-input'
      />
      <Fab
        color='primary'
        size='small'
        className='add-ingredient-button'
        onClick={() => addNewIngredient()}
      >
        <GoPlus />
      </Fab>
    </div>
  );

  const [openModal, setOpenModal] = React.useState(false);
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [ingredientInputs, setIngredientInput] = React.useState([ingredientInputsElement]);
  const [aisles, setAisles] = React.useState([]);

  function addNewIngredient() {
    const ingredients = document.querySelectorAll('.ingredient');
    const result = [ingredientInputsElement];
    ingredients.forEach((e) => result.push(ingredientInputsElement));
    console.log(result);
    setIngredientInput(result);
    const buttons = document.querySelectorAll('.add-ingredient-button');
    buttons[buttons.length - 1].remove();
  }

  React.useEffect(() => console.log(ingredientInputs), [ingredientInputs]);

  async function addRow() {
    // const product =
    // (document.querySelector('#productInput') as HTMLInputElement).value;

    // if (
    //   product && aisles
    //   && isNaN(+product) && isNaN(+aisles)
    //   && !productsStore.hasProduct(product)
    // ) {
    //   const productData = {
    //     product: {
    //       name: product,
    //       aisles: aisles
    //     }
    //   };
    //   await fetch(window.location.href.split('#')[0] + 'products', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify(productData)
    //   });
    //   setOpenSuccessAlert(true);
    //   setTimeout(() => {
    //     setOpenModal(false);
    //     setOpenSuccessAlert(true);
    //   }, 3000);
    // } else {
    //   setOpenErrorAlert(true);
    // }
  }

  function deleteRow() {
    // const checkboxesToDelete = document.querySelectorAll(
    //   'input[type=\'checkbox\']:checked'
    // );
    // [].forEach.call(checkboxesToDelete, async (checkbox) => {
    //   const ingredientToDelete = checkbox.parentNode.nextSibling.textContent;
    //   await fetch(window.location.href.split('#')[0] + 'products', {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify({ productName: ingredientToDelete })
    //   });
    // });
  }
  return (
    <div className='recipe-table-container'>
      <h2 className='recipe-table-header'>Recipes Table</h2>
      <ToolkitProvider
        keyField='recipe'
        data={ [] /* productsStore.getProducts */ }
        columns={ columnsData }
        search
        bootstrap4
      >
        {
          (props) => (
            <div>
              <SearchBar { ...props.searchProps } />
              <div className='recipe-table-button-container'>
                <Dialog
                  fullScreen
                  open={openModal}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                  className='add-recipe-modal'
                >
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
                          inputProps={{ pattern: '[A-Za-z]+' }}
                          required
                        />
                        <div className='rt-container'>
                          <RadioGroup aria-label='servings' name='servings' className='rt-part-input-container'/* value={value} onChange={handleChange} */>
                            <FormLabel component='legend'>Servings</FormLabel>
                            <FormControlLabel
                              value='2'
                              control={<Radio color='primary' />}
                              label='2'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='4'
                              control={<Radio color='primary' />}
                              label='4'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='6'
                              control={<Radio color='primary' />}
                              label='6'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='8'
                              control={<Radio color='primary' />}
                              label='8'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='10'
                              control={<Radio color='primary' />}
                              label='10'
                              labelPlacement='top'
                            />
                          </RadioGroup>
                          <RadioGroup aria-label='servings' name='servings' className='rt-part-input-container'/* value={value} onChange={handleChange} */>
                            <FormLabel component='legend'>Minutes</FormLabel>
                            <FormControlLabel
                              value='15'
                              control={<Radio color='secondary' />}
                              label='15'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='25'
                              control={<Radio color='secondary' />}
                              label='25'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='40'
                              control={<Radio color='secondary' />}
                              label='40'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='60'
                              control={<Radio color='secondary' />}
                              label='60'
                              labelPlacement='top'
                            />
                            <FormControlLabel
                              value='120'
                              control={<Radio color='secondary' />}
                              label='120'
                              labelPlacement='top'
                            />
                          </RadioGroup>
                        </div>
                        <TextField
                          id='recipe-image'
                          className='recipe-table-input'
                          label='Image URL'
                          inputProps={{ pattern: '[A-Za-z]+' }}
                          required
                        />
                        <TextField
                          id='recipe-source'
                          className='recipe-table-input'
                          label='Source URL'
                          inputProps={{ pattern: '[0-9]+' }}
                          required
                        />
                        <Autocomplete
                          limitTags={1}
                          id='tags-standard'
                          className='recipe-table-input'
                          options={ aislesStore.getAisles }
                          // getOptionLabel={ (option) => option.toString() }
                          // onChange={(event, value) => setAisles(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id='recipe-cuisine'
                              label='Cuisine'
                              placeholder='Cuisine'
                              variant='filled'
                              required
                            />
                          )}
                        />
                        <Autocomplete
                          multiple
                          limitTags={1}
                          id='tags-standard'
                          className='recipe-table-input'
                          options={ aislesStore.getAisles }
                          // getOptionLabel={ (option) => option.toString() }
                          // onChange={(event, value) => setAisles(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id='recipe-mealtypes'
                              label='Mealtypes'
                              placeholder='Mealtypes'
                              variant='filled'
                              required
                            />
                          )}
                        />
                      </div>
                      <div>
                        <Paper variant='outlined' className='ingredients-container'>
                          <Typography variant='h6'>Add Ingredients</Typography>
                          <div className='ingredients-inputs-container'>
                            { ingredientInputs }
                          </div>
                        </Paper>
                        <TextField
                          label='Description'
                          multiline
                          rows={10}
                          variant='outlined'
                          className='rt-description'
                        />
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
                      onClick={addRow}
                      id='saveRecipeButton'
                      variant='contained'
                      color='primary'
                      autoFocus
                    >
                      Save
                    </Button>
                  </DialogActions>
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
                  onClick={deleteRow}
                >
                  <FaTrash />
                </Button>
              </div>
              <BootstrapTable
                selectRow={ selectRow }
                pagination={ paginationFactory({}) }
                { ...props.baseProps }
              />
              <Snackbar
                open={openErrorAlert}
                autoHideDuration={3000}
                onClose={() => setOpenErrorAlert(false) }
              >
                <Alert onClose={() => setOpenErrorAlert(false) } severity='error'>
                  Products data must be not empty, numbers, duplicate.
                </Alert>
              </Snackbar>
              <Snackbar
                open={openSuccessAlert}
                autoHideDuration={3000}
                onClose={() => setOpenSuccessAlert(false) }
              >
                <Alert onClose={() => setOpenSuccessAlert(false) } severity='success'>
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

export default inject('productsStore', 'aislesStore')(observer(RecipesTable));

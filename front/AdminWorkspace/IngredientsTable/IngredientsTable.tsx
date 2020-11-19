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
import { Snackbar } from '@material-ui/core';
import { FaPlus, FaTrash } from 'react-icons/fa';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IngredientsTable.css';

interface IngredientsTableProps {
  ingredientsStore?: any;
}

const IngredientsTable: React.FunctionComponent<IngredientsTableProps> = (
  { ingredientsStore }
) => {
  const { SearchBar } = Search;

  const columnsData = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true
    },
    {
      dataField: 'unit',
      text: 'Unit',
      sort: true
    }
  ];

  const selectRow: SelectRowProps<any> = {
    mode: 'checkbox',
    clickToSelect: true,
    style: { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  function addRow() {
    const [name, type, unit] = [
      (document.querySelector('#nameInput') as HTMLInputElement).value,
      (document.querySelector('#typeInput') as HTMLInputElement).value,
      (document.querySelector('#unitInput') as HTMLInputElement).value
    ];

    if (
      name && type && unit
      && isNaN(+name) && isNaN(+type) && isNaN(+unit)
      && !ingredientsStore.hasIngredient(name)
    ) {
      ingredientsStore.setIngredient({
        name: name,
        type: type,
        unit: unit
      });
      setOpenModal(false);
    } else {
      setOpenAlert(true);
    }
  }

  function deleteRow() {
    const checkboxesToDelete = document.querySelectorAll(
      'input[type=\'checkbox\']:checked'
    );
    [].forEach.call(checkboxesToDelete, (checkbox) => {
      const ingredientToDelete = checkbox.parentNode.nextSibling.textContent;
      ingredientsStore.deleteIngredient(ingredientToDelete);
    });
  }

  return (
    <div className='ingredients-table-container'>
      <h2 className='ingredients-table-header'>Ingredients Table</h2>
      <ToolkitProvider
        keyField='name'
        data={ ingredientsStore.getIngredients }
        columns={ columnsData }
        search
        bootstrap4
      >
        {
          (props) => (
            <div>
              <SearchBar { ...props.searchProps } />
              <div className='ingredients-table-button-container'>
                <Dialog
                  open={openModal}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle>
                    {'Add New Ingredient'}
                    <hr />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText component={'span'}>
                      <TextField
                        id='nameInput'
                        label='Name'
                        inputProps={{ pattern: '[A-Za-z]+' }}
                        required
                      />
                      <TextField
                        id='typeInput'
                        label='Type'
                        inputProps={{ pattern: '[A-Za-z]+' }}
                        required
                      />
                      <TextField
                        id='unitInput'
                        label='Unit'
                        inputProps={{ pattern: '[A-Za-z]+' }}
                        required
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenModal(false)}
                      color='primary'
                      id='closeModalButton'
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addRow}
                      id='saveIngredientButton'
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
                  className='ingredients-table-button'
                  id='addIngredientButton'
                  onClick={() => setOpenModal(true)}
                >
                  <FaPlus />
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  className='ingredients-table-button'
                  id='deleteIngredientButton'
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
                open={openAlert}
                autoHideDuration={3000}
                onClose={() => setOpenAlert(false) }
              >
                <Alert onClose={() => setOpenAlert(false) } severity="error">
                  Ingredients data must be not empty, numbers, duplicate.
                </Alert>
              </Snackbar>
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  );
};

export default inject('ingredientsStore')(observer(IngredientsTable));


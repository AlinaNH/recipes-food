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
import './ProductsTable.css';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ProductsTableProps {
  productsStore?: any;
  aislesStore?: any;
}

const ProductsTable: React.FunctionComponent<ProductsTableProps> = (
  { productsStore, aislesStore }
) => {
  const { SearchBar } = Search;

  const columnsData = [
    {
      dataField: 'product',
      text: 'Product',
      sort: true
    },
    {
      dataField: 'aisles',
      text: 'Aisles',
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
  const [aisles, setAisles] = React.useState([]);


  async function addRow() {
    const product = (document.querySelector('#productInput') as HTMLInputElement).value;

    if (
      product && aisles
      && isNaN(+product) && isNaN(+aisles)
      && !productsStore.hasProduct(product)
    ) {
      const productData = {
        product: {
          name: product,
          aisles: aisles
        }
      };
      await fetch(window.location.href.split('#')[0] + 'products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(productData)
      });
      setOpenSuccessAlert(true);
      setTimeout(() => {
        setOpenModal(false);
        setOpenSuccessAlert(true);
      }, 3000);
    } else {
      setOpenErrorAlert(true);
    }
  }

  function deleteRow() {
    const checkboxesToDelete = document.querySelectorAll(
      'input[type=\'checkbox\']:checked'
    );
    [].forEach.call(checkboxesToDelete, async (checkbox) => {
      const ingredientToDelete = checkbox.parentNode.nextSibling.textContent;
      await fetch(window.location.href.split('#')[0] + 'products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ productName: ingredientToDelete })
      });
    });
  }
  return (
    <div className='products-table-container'>
      <h2 className='products-table-header'>Products Table</h2>
      <ToolkitProvider
        keyField='product'
        data={ productsStore.getProducts }
        columns={ columnsData }
        search
        bootstrap4
      >
        {
          (props) => (
            <div>
              <SearchBar { ...props.searchProps } />
              <div className='products-table-button-container'>
                <Dialog
                  open={openModal}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle>
                    {'Add New Product'}
                    <hr />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText component={'span'}>
                      <TextField
                        id='productInput'
                        className='product-table-input'
                        label='Product'
                        inputProps={{ pattern: '[A-Za-z]+' }}
                        required
                      />
                      <Autocomplete
                        multiple
                        limitTags={1}
                        id='tags-standard'
                        className='product-table-input'
                        options={ aislesStore.getAisles }
                        getOptionLabel={ (option) => option.toString() }
                        onChange={(event, value) => setAisles(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant='standard'
                            id='aislesInput'
                            label='Multiple values'
                            placeholder='Aisles'
                            required
                          />
                        )}
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
                      id='saveProductButton'
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
                  className='products-table-button'
                  id='addProductButton'
                  onClick={() => setOpenModal(true)}
                >
                  <FaPlus />
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  className='products-table-button'
                  id='deleteProductButton'
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

export default inject('productsStore', 'aislesStore')(observer(ProductsTable));


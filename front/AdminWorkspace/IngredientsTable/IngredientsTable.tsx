import * as React from 'react';
import { useState } from 'react';
import BootstrapTable, { SelectRowProps } from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FaPlus, FaTrash } from 'react-icons/fa';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IngredientsTable.css';

export const IngredientsTable: React.FunctionComponent = () => {
  const rowsData = [
    {
      name: 'test1',
      type: 'test1',
      unit: 'test1'
    },
    {
      name: 'test2',
      type: 'test2',
      unit: 'test2'
    },
    {
      name: 'test3',
      type: 'test3',
      unit: 'test3'
    },
    {
      name: 'test11',
      type: 'test11',
      unit: 'test11'
    }
  ];

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

  const { SearchBar } = Search;

  const selectRow: SelectRowProps<any> = {
    mode: 'checkbox',
    clickToSelect: true,
    style: { backgroundColor: '#007bff33' }
  };

  const [openModal, setOpenModal] = React.useState(false);

  function addRow() {
    rowsData.push({
      name: (document.querySelector('#nameInput') as HTMLInputElement).value,
      type: (document.querySelector('#typeInput') as HTMLInputElement).value,
      unit: (document.querySelector('#unitInput') as HTMLInputElement).value
    });
    console.log(rowsData);
    setOpenModal(false);
    (document.querySelector('tbody') as HTMLTableSectionElement).insertAdjacentHTML(
      'beforeend',
      `<tr>
        <td class="selection-cell">
          <input type="checkbox" class="selection-input-4">
        </td>
        <td>${rowsData[rowsData.length-1].name}</td>
        <td>${rowsData[rowsData.length-1].type}</td>
        <td>${rowsData[rowsData.length-1].unit}</td>
      </tr>`
    );
  }

  function deleteRow() {
    const checkboxesToDelete = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    [].forEach.call(checkboxesToDelete, (checkbox) => {
      const id = checkbox.parentNode.nextSibling.textContent;
      const indexToDelete = rowsData.findIndex((data) => data.name === id);
      rowsData.splice(indexToDelete, 1);
      const row = checkbox.parentNode.parentNode;
      row.parentNode.removeChild(row);
    });
  }

  return (
    <div className='ingredients-table-container'>
      <h2 className='ingredients-table-header'>Ingredients Table</h2>
      <ToolkitProvider
        keyField="name"
        data={ rowsData }
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
                  onClose={() => setOpenModal(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle>
                    {'Add New Ingredient'}
                    <hr />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText className="alert-dialog-description">
                      <input
                        type='text'
                        placeholder='Name'
                        id='nameInput'
                        className='form-control'
                        required/>
                      <input
                        type='text'
                        placeholder='Type'
                        id='typeInput'
                        className='form-control'
                        required
                      />
                      <input
                        type='text'
                        placeholder='Unit'
                        id='unitInput'
                        className='form-control'
                        required
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={addRow} color="primary" autoFocus>
                    Save
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  variant="contained"
                  color="primary"
                  className='ingredients-table-button'
                  onClick={() => setOpenModal(true)}
                >
                  <FaPlus />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className='ingredients-table-button'
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
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  );
};

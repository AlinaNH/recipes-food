import * as React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {
  BsFillGridFill,
  BsFileEarmarkPlus,
  BsTable,
  BsFillPeopleFill
} from 'react-icons/bs';
import { HiLogout } from 'react-icons/hi';
import './AdminWorkspace.css';

export const AdminWorkspace: React.FunctionComponent = () => {
  return (
    <div className='admin-workspace-container'>
      <List component='nav' className='admin-workspace-nav'>
        <div className='admin-workspace-heading'>
          App Logo
        </div>
        <ListItem button>
          <ListItemIcon>
            <BsFillGridFill />
          </ListItemIcon>
          <ListItemText primary='All Recipes' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BsFileEarmarkPlus />
          </ListItemIcon>
          <ListItemText primary='Add New Recipe' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BsTable />
          </ListItemIcon>
          <ListItemText primary='Ingredients Table' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BsFillPeopleFill />
          </ListItemIcon>
          <ListItemText primary='User Management' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HiLogout />
          </ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>
    </div>
  );
};

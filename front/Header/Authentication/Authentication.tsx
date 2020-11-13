import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormControl, TextField, Button } from '@material-ui/core';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';
import './Authentication.css';

interface AuthenticationProps extends RouteComponentProps {
  operation: string;
}

export const Authentication = ({
  history,
  operation,
}: AuthenticationProps): any => {
  return (
    <div className="authentication-container-fade">
      <div className="authentication-container">
        <span
          className="authentication-container-close"
          onClick={() => history.push('/')}
        >
          &times;
        </span>
        <FormControl className="authentication-form">
          <div className="authentication-form-icon">
            <span>
              {operation === 'Sign Up' ? (
                <BsFillPersonPlusFill />
              ) : (
                <BsFillPersonCheckFill />
              )}
            </span>
          </div>
          <div className="authentication-form-name">{operation}</div>
          <TextField
            required
            label="Login"
            type="text"
            className="authentication-form-input"
          />
          <TextField
            required
            label="Password"
            type="password"
            className="authentication-form-input"
          />
          {operation === 'Sign Up' ? (
            <TextField
              required
              label="Сonfirm password"
              type="password"
              className="authentication-form-input"
            />
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            color="primary"
            className="authentication-form-button"
          >
            SUBMIT
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

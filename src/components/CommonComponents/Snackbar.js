import React from 'react';
import styled from 'styled-components';
import {
  Snackbar,
  IconButton,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Close,
  NotificationImportant,
} from '@material-ui/icons';

import colors from '../../colors';

const theme = createMuiTheme();

const CustomIconButton = styled(IconButton)`
  padding: ${theme.spacing(2)}px;
`;

const CustomSnackbar = styled(Snackbar)`
  & > * {
    color: ${
    (props) => {
      if (props.variant === 'error') {
        return colors.fg;
      } else {
        return colors.black;
      }
    }};
    background-color: ${
    (props) => {
      if (props.variant === 'error') {
        return colors.error;
      } else {
        return colors.fg;
      }
    }};
  }
`;

const Message = styled.span`
  display: flex;
  align-items: center;
`;

const CustomIcon = styled(NotificationImportant)`
  margin-right: ${theme.spacing(2)}px;
`;

const SimpleSnackbar = ({ open, setOpen, variant, message}) => {

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <CustomSnackbar
      variant={variant}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        <Message id="message-id">
          <CustomIcon />
          {message}
        </Message>
      }
      action={[
      <CustomIconButton
        key="close"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close />
      </CustomIconButton>,
      ]}
    />
  );
}

export default SimpleSnackbar;

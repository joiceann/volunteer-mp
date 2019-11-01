import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  ClearButton,
  PrecautionButton,
} from '../CommonComponents';

import styled from 'styled-components';
import colors from '../../colors';


const CustomDialogTitle = styled(DialogTitle)`
  color: ${colors.main};
`



const Alert = ({ children, open, onClose, title }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <CustomDialogTitle id="alert-dialog-title">
        {title}
      </CustomDialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ClearButton onClick={() => onClose(false)} color="primary">
          Cancelar
        </ClearButton>
        <PrecautionButton onClick={() => onClose(true)} color="primary" autoFocus>
          Aceptar
        </PrecautionButton>
      </DialogActions>
    </Dialog>
  );
}

export default Alert;

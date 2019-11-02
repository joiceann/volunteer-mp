import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import {
  TextField,
  ClearButton,
  DatePicker as MyDatePicker,
} from '../CommonComponents';
import{
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import colors from '../../colors';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

const CustomDialogTitle = styled(DialogTitle)`
  color: ${colors.main};
`

const Description = styled(TextField)`
  height: 100px;
  max-height: 100px;
`;

const DateComp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DatePicker = styled(MyDatePicker)`
  margin-right: ${theme.spacing(5)}px;
  margin-left: ${theme.spacing(5)}px;
`;

const EditProject = ({ open, projectData, setProjectData, onClose }) => {

  return (
    <Dialog
      open={open}
      maxWidth="xl"
    >
      <CustomDialogTitle>
        Editar proyecto
      </CustomDialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Nombre"
          value={projectData.name}
          onChange={(event) => setProjectData({
            ...projectData,
            name: event.target.value,
          })
          }
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          onChange={(event) => setProjectData({
            ...projectData,
            address: event.target.value,
          })
          }
          label="Dirección"
          value={projectData.address}
          autoFocus
        />
        <Description
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={projectData.desc}
          onChange={(event) => setProjectData({
            ...projectData,
            desc: event.target.value,
          })
          }
          multiline
          rows={3}
          rowsMax={3}
          label="Descripción"
          autoFocus
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateComp>
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Inicio del proyecto"
              value={projectData.fdate}
              onChange={(date) => setProjectData({...projectData, fdate: date})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <DatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fin del proyecto"
              value={projectData.fdatei}
              onChange={(date) => setProjectData({...projectData, fdatei: date})}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </DateComp>

        </MuiPickersUtilsProvider>

      </DialogContent>
      <DialogActions>
        <ClearButton onClick={() => onClose(false)} color="primary">
          Cancelar
        </ClearButton>
        <ClearButton onClick={() => onClose(true)} color="primary" autoFocus>
          Aceptar
        </ClearButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProject;

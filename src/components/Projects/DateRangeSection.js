import React from 'react';
import {
  DarkTitle,
  DatePicker as MyDatePicker,
} from '../CommonComponents';
import {
  Paper,
} from '@material-ui/core';
import{
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
const theme = createMuiTheme();

const DatePaper = styled(Paper)`
  width: 100px;
  padding: ${theme.spacing(2)}px;;
  margin-bottom: ${theme.spacing(5)}px;;
  display: flex;
  align-items: center;
`;

const DateSection = styled.div`
  width: 100%;
  display: flex;
`;

const DateRange = styled(Paper)`
  flex-grow: 1;
  padding: ${theme.spacing(2)}px;;
  margin-left: ${theme.spacing(5)}px;;
  margin-bottom: ${theme.spacing(5)}px;;
  text-align: center;
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


const DateRangeSection = ({ project }) => {
  return (
    <DateSection>
      <DatePaper>
        <DarkTitle variant="h6">
          Fecha:
        </DarkTitle>
      </DatePaper>
      <DateRange>
        <DarkTitle variant="h6">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateComp>
              <DatePicker
                disableToolbar
                readOnly={true}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Inicio"
                value={project.fdate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <DatePicker
                disableToolbar
                variant="inline"
                readOnly={true}
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Fin"
                value={project.fdatei}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </DateComp>
          </MuiPickersUtilsProvider>
        </DarkTitle>
      </DateRange>
    </DateSection>
  );
};

export default DateRangeSection;

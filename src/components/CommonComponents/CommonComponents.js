import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';
import MuButton from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  TextField as MuTextField,
  Typography,
} from '@material-ui/core';
import{
  KeyboardDatePicker,
} from '@material-ui/pickers';

const theme = createMuiTheme();


export const Button = styled(MuButton)`
  background-color: ${colors.secondary};
  &:hover {
    background-color: ${colors.main};
  }
`;

export const ClearButton = styled(MuButton)`
  color: ${colors.main};
`;

export const PrecautionButton = styled(MuButton)`
  color: ${colors.error};
`;

export const TextField = styled(MuTextField)`
  & label.Mui-focused {
    color: ${colors.main};
  }
  & fieldset.MuiOutlinedInput-notchedOutline {
    border-color: ${colors.main} !important;
  }
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: ${colors.main};
`;

export const DatePicker = styled(KeyboardDatePicker)`
  & .MuiFormLabel-root.Mui-focused {
    color: ${colors.main};
  }

  & .MuiInput-underline::after {
      border-color: ${colors.main} !important;
    }
`;

export const DarkTitle = styled(Typography)`
  color: ${colors.main};
`;

const Title = styled(Typography)`
  color: white;
`;


export const Header = (props) => {
  return (
    <Title variant="h2">
      {props.children}
    </Title>
  );
};

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${theme.spacing(7)}px;
`;

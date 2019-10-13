import React from 'react';
import {
  Paper,
  InputBase,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

const theme = createMuiTheme();

const CustomPaper = styled(Paper)`
  display: flex;
  padding-top: ${theme.spacing(1)}px;
  padding-bottom: ${theme.spacing(1)}px;
  padding-left: ${theme.spacing(3)}px;
  padding-right: ${theme.spacing(3)}px;
`;

const CustomInput = styled(InputBase)`
  height: ${theme.spacing(6)}px;
  flex: 1;
`;

const SearchBar = ({ className, placeholder, value, onChange }) => {
  return (
    <CustomPaper className={className}>
      <CustomInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      <IconButton disabled={true}>
        <SearchIcon />
      </IconButton>
    </CustomPaper>
  );
};

export default SearchBar;

import React from 'react';
import {
  Fab as MuFab,
} from '@material-ui/core';
import {
  Add,
}from '@material-ui/icons';
import styled from 'styled-components';
import colors from '../../colors';

const CustomFab = styled(MuFab)`
  background-color: ${colors.yellow};
`;


const Fab = ({ onClick }) => {
  return (
    <CustomFab onClick={onClick}>
      <Add />
    </CustomFab>
  );
};

export default Fab;

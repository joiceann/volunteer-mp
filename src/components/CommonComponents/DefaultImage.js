import React from 'react';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Photo,
} from '@material-ui/icons';


const theme = createMuiTheme();

const Wrapper = styled.div`
  height: ${theme.spacing(10)}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultImage = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Photo />
    </Wrapper>
  );
};

export default DefaultImage;

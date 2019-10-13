import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';

import {
  CircularProgress,
} from '@material-ui/core';


const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomLoader = styled(CircularProgress)`
  color: ${colors.fg};
`;

const LoadingScreen = () => {
  return (
    <Wrapper>
      <CustomLoader />
    </Wrapper>
  );
};

export default LoadingScreen;

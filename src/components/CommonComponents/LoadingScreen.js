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
  color: ${({ dark }) => dark != null && dark ? colors.main : colors.fg};
`;

const LoadingScreen = ({ dark }) => {
  return (
    <Wrapper>
      <CustomLoader dark={dark} />
    </Wrapper>
  );
};

export default LoadingScreen;

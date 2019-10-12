import React from 'react';
import Menu from '../Menu';
import styled, { createGlobalStyle } from 'styled-components';
import Overview from '../Overview';
import Projects from '../Projects';
import Profile from '../Profile';
import colors from '../../colors';
import {
  Route,
  Switch,
} from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.main};
  }

`;

const MainContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Content = styled.section`
  flex-grow: 1;
`;


const Main = ({ logout }) => {
  return (
    <MainContainer>
      <GlobalStyle />
      <Menu logout={logout} />
      <Content>
        <Switch>
          <Route path="/dashboard/projects" component={Projects}/>
          <Route path="/dashboard/profile" component={Profile}/>
          <Route component={Overview}/>
        </Switch>
      </Content>
    </MainContainer>
  );
}

export default Main;

import React from 'react';
import Menu from '../Menu';
import styled, { createGlobalStyle } from 'styled-components';
import Overview from '../Overview';
import Projects from '../Projects';
import Profile from '../Profile';

/* MyProjects Page import */
import MyProjects from '../MyProjects/index';

import colors from '../../colors';
import {
  Route,
  Switch,
} from 'react-router-dom';
import ProjectsSearchComponent from '../HomePageComponent/ProjectsSearchComponent';

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
  display: flex;
  flex-grow: 1;
`;


const Main = ({ logout }) => {
  return (
    <MainContainer>
      <GlobalStyle />
      <Menu logout={logout} />
      <Content>
        <Switch>          
          <Route path="/dashboard/my-projects" render={() => <MyProjects />} />
          {/* <Route path="/dashboard/projects" render={() => <Projects />}/> */}
          <Route path="/dashboard/profile" render={() => <Profile />}/>
          <Route path="/dashboard/search" render={() => <ProjectsSearchComponent main />} />
          <Route render={() => <MyProjects />}/>
        </Switch>
      </Content>
    </MainContainer>
  );
}

export default Main;

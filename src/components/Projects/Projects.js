import React, {
  useEffect,
} from 'react';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Header,
  Section,
  SearchBar
} from '../CommonComponents';

import axios from '../../axios';
import * as Constants from '../../constants';

const theme = createMuiTheme();

const CustomSearchBar = styled(SearchBar)`
  color: blue;
  margin-top: ${theme.spacing(6)}px;
`;

const Projects = () => {

  const fetchData = () => {
    axios.get(Constants.PROJECTS_LIST)
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(fetchData)

  return (
    <Section>
      <Header>
        Proyectos
      </Header>
      <CustomSearchBar />
    </Section>
  );
};

export default Projects;

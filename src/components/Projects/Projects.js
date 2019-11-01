import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Header,
  Section,
  SearchBar,
  Snackbar,
  Fab,
} from '../CommonComponents';
import ProjectsList from './ProjectList';
import axios from 'axios';
import instace from '../../axios';
import * as Constants from '../../constants';

const theme = createMuiTheme();

const CustomSearchBar = styled(SearchBar)`
  color: blue;
  margin-top: ${theme.spacing(6)}px;
`;

const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [showError, setShowError] = useState(false);

  const fetchData = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    instace.get(Constants.PROJECTS_LIST, {
      cancelToken: source.token,
    }).then((response) => {
        setProjects(response.data);
      }).catch(() => {
        setShowError(true);
      });

    return () => {
      source.cancel();
    };
  };

  useEffect(fetchData, [])

  return (
    <Section>
      <HeaderLine>
        <Header>
          Proyectos
        </Header>
        <Fab />
      </HeaderLine>
      <CustomSearchBar
        placeholder="Buscar un proyecto"
        value={search}
        onChange={setSearch}
      />
      <ProjectsList search={search} projects={projects} />
      <Snackbar
        open={showError}
        variant="error"
        setOpen={setShowError}
        message="No fue posible obtener la lista de proyectos"
      />
    </Section>
  );
};

export default Projects;

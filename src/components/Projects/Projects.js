import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  Header,
  HeaderLine,
  Section,
  SearchBar,
  Snackbar,
  Fab,
} from '../CommonComponents';
import ProjectsList from './ProjectList';
import EditProject from './EditProject';
import axios from 'axios';
import instace from '../../axios';
import * as Constants from '../../constants';

const theme = createMuiTheme();

const CustomSearchBar = styled(SearchBar)`
  color: blue;
  margin-top: ${theme.spacing(6)}px;
`;

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [showError, setShowError] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

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

  const onCreateClose = (accept) => {
    console.log(accept);
    setOpenCreate(false);
  };

  useEffect(fetchData, [])

  return (
    <Section>
      <EditProject
        open={openCreate}
        project={{
          organinfo: {},
          name: '',
          desc: '',
          address: '',
          fdate: new Date(),
          fdatei: new Date(),
          volunteers: [],
          photo: [],
          news: [],
        }}
        onClose={onCreateClose}
      />
      <HeaderLine>
        <Header>
          Proyectos
        </Header>
        <Fab onClick={() => setOpenCreate(true)}/>
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

import React, {
  useState,
  useEffect,
} from 'react';
import {
  Header,
  HeaderLine,
  Section,
  SearchBar,
  Snackbar,
} from '../CommonComponents';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import NewsList from './NewsList';
import axios from 'axios';
import instace from '../../axios';
import * as Constants from '../../constants';
const theme = createMuiTheme();

const CustomSearchBar = styled(SearchBar)`
  color: blue;
  margin-top: ${theme.spacing(6)}px;
`;

const Overview = () => {

  const [search, setSearch] = useState('');
  const [news, setNews] = useState([]);
  const [showError, setShowError] = useState(false);


  const fetchData = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    instace.get(Constants.NEW_LIST, {
      cancelToken: source.token,
    }).then((response) => {
        setNews(response.data);
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
          Mis noticias
        </Header>
      </HeaderLine>
      <CustomSearchBar
        placeholder="Buscar una noticia"
        value={search}
        onChange={setSearch}
      />
      <NewsList search={search} news={news} />
      <Snackbar
        open={showError}
        variant="error"
        setOpen={setShowError}
        message="No fue posible obtener la lista de proyectos"
      />
    </Section>
  );
};

export default Overview;

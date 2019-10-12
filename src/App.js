import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from "react-router-dom";
import devices from './devices';
import Session from './components/Session';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  html {
    width: 100%;
    height: 100%;
    font-family: 'Roboto';
    @media ${devices.labtop} {
      font-size: 1.0em;
    }
    @media ${devices.laptopL} {
      font-size: 1.2em;
    }
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;


function App() {
  return (
    <StylesProvider injectFirst>
      <GlobalStyle />
      <Router>
        <Session />
      </Router>
    </StylesProvider>
  );
}

export default App;

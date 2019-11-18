import React, {
  useState,
} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import colors from '../../colors';
import styled, { createGlobalStyle } from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Button, TextField } from '../CommonComponents';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as Constants from '../../constants';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import {
  LoadingScreen,
} from '../CommonComponents';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.main};
  }
`;

const MainContainer = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
`;

const Logo = styled.h1`
  font-family: 'Josefin Sans', sans-serif;
  user-select: none;
  margin-right: 8px;
`;

const CustomAvatar = styled(Avatar)`
  background-color: ${colors.main};
  margin-bottom: 8px;
`;

const SeparatedButton = styled(Button)`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Login = ({ login }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, showFormError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post(Constants.LOGIN,
      JSON.stringify({email, password}),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((response) => {
      console.log(response.data)
      login(response.data.token);

      // save user type
      localStorage.setItem('V_USER_TYPE', response.data.type)

      setLoading(false);
      history.push('/dashboard/my-projects');
    }).catch(() => {
      showFormError(true);
      setLoading(false);
    });
  };
  return (
    <MainContainer maxWidth="xs">
      <GlobalStyle />
      <StyledPaper>
        <Logo>
          Voluntourist
        </Logo>
        <CustomAvatar>
          <LockOutlinedIcon />
        </CustomAvatar>
        <Typography variant="h5">
          Inicio de sesión
        </Typography>
        <Form noValidate onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={handleEmailChange}
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {
            formError &&
            <Typography color="error">
              Correo electrónico o contraseña incorrectos
            </Typography>
          }
          {
            isLoading && <LoadingScreen dark="true" />
          }
          <SeparatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
          </SeparatedButton>
        </Form>
      </StyledPaper>
    </MainContainer>
  );
};

export default Login;

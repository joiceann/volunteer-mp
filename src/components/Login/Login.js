import React from 'react';
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

  let [email, setEmail] = React.useState('');
  let [password, setPassword] = React.useState('');
  const history = useHistory();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const submit = (event) => {
    event.preventDefault();
    axios.post(Constants.LOGIN_ENDPOINT,
      JSON.stringify({email, password}),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((response) => {
      login(response.data.token);
      history.push('/dashboard/overview');
    }).catch((error) => {
      console.log(error);
      alert('Usuario o contraseña invalido');
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

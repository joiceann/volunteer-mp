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

//{8,}
const generalInputRegex = /^[a-zA-Z0-9¡¿?@.:+]*$/gim;
const emailRegex = /^([\w.%+-]+)@([\w-])+(\.+[\w]{2,})*$/gim;
const credentialRegex  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡¿?@:+]).{8,}$/gim;

const Login = ({ login }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, showFormError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validTries, setValidTries] = useState(0);
  const history = useHistory();
  const [validEmailText, setET] = useState("");
  const [validPasswordText, setPT] = useState("");
  const [validTriesText, setTT] = useState("");



  const handleEmailChange = (event) => {
    console.log(event.target.value);
    let emailValid = event.target.value.match(emailRegex);
    let inputValid = event.target.value.match(generalInputRegex);
    let reeval = emailValid != null && inputValid != null;
    setValidEmail();

    console.log(emailValid);
    console.log(inputValid);

    if (reeval){
      setET("");
    }
    else{
      setET("Ingreso de texto en correo inválido\n");    }
    setEmail(event.target.value);

  };

  const handlePasswordChange = (event) => {
    let passwordValidate = event.target.value.match(credentialRegex);
    setValidPassword(passwordValidate != null);
    if (passwordValidate != null){
      setPT("");
    }
    else{
      setPT("Ingreso de texto en correo inválido\n");
    }
    setPassword(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    if ({validEmail} && {validPassword} || 4 < {validTries}){
      axios.post(Constants.LOGIN,
          JSON.stringify({email, password}),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
      ).then((response) => {
        console.log('user logged in: ', response)
        login(response.data.token, response.data.type);
        setLoading(false);
        history.push('/dashboard/my-projects');
      }).catch((response) => {
        console.log(response);
        if (response.data == "Invalid Credentials") {
            setValidTries({validTries} + 1);
        }
        showFormError(true);
        setLoading(false);
      });
    }
    else{
        if (4 < {validTries}) {
            setTT("Se alcanzó el maximo de intentos permitido");
        }
        showFormError(true);
        setLoading(false);
    }
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
              Correo electrónico o contraseña incorrectos {validEmailText} {validPasswordText}
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

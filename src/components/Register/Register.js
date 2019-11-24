import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import colors from "../../colors";
import styled, { createGlobalStyle } from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "../CommonComponents";
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as Constants from "../../constants";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { LoadingScreen } from "../CommonComponents";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.main};
  }
`;

const MainContainer = styled(Container)`
  height: 180%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  position: relative;
  display: flex;
  width: 70%;
  margin-top: 30%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
`;

const StyledPaper2 = styled(Paper)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  margin-top: 160%;
  margin-left: -100%;
`;

const Logo = styled.h1`
  font-family: "Josefin Sans", sans-serif;
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
  width: 40%;
`;
const box = styled(Container)`
  display: flex;
  flex-direction: row;
`;

//{8,}
const generalInputRegex = /^[a-zA-Z0-9¡¿?@.:+]*$/gim;
const emailRegex = /^([\w.%+-]+)@([\w-])+(\.+[\w]{2,})*$/gim;
const credentialRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡¿?@:+]).{8,}$/gim;

const Register = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, showFormError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validTries, setValidTries] = useState(0);
  const history = useHistory();
  const [validEmailText, setET] = useState("");
  const [validPasswordText, setPT] = useState("");
  const [validTriesText, setTT] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [civilStatus, setCivilStatus] = useState("1");
  const [gender, setGender] = useState("0");
  const [type, setType] = useState("");
  const [educationLevel, setEducationLevel] = useState("1");
  const [timeTravel, setTimeTravel] = useState("1");
  const [biography, setBiography] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [knowCountry, setKnowCountry] = useState("1");
  const [preferWorkWith, setPreferWorkWith] = useState("");
  const [projectInterest, setProjectInterest] = useState("4");
  const [foodInfo, setFoodInfo] = useState("0");
  const handleEmailChange = event => {
    console.log(event.target.value);
    let emailValid = event.target.value.match(emailRegex);
    let inputValid = event.target.value.match(generalInputRegex);
    let reeval = emailValid != null && inputValid != null;
    setValidEmail();

    console.log(emailValid);
    console.log(inputValid);

    if (reeval) {
      setET("");
    } else {
      setET("Ingreso de texto en correo inválido\n");
    }
    setEmail(event.target.value);
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleLastNameChange = event => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };
  const handleBirthDateChange = event => {
    console.log(event.target.value);
    setBirthDate(event.target.value);
  };
  const handleOccupationChange = event => {
    console.log(event.target.value);
    setOccupation(event.target.value);
  };
  const handlePhoneChange = event => {
    console.log(event.target.value);
    setPhone(event.target.value);
  };
  const handleNationalityChange = event => {
    console.log(event.target.value);
    setNationality(event.target.value);
  };
  const handleCivilStatusChange = event => {
    console.log(event.target.value);
    setCivilStatus(event.target.value);
  };
  const handleTypeChange = event => {
    console.log(event.target.value);
    setType(event.target.value);
  };
  const handleGenderChange = event => {
    console.log(event.target.value);
    setGender(event.target.value);
  };
  const handleEducationLevelChange = event => {
    console.log(event.target.value);
    setEducationLevel(event.target.value);
  };
  const handleTimeTravelChange = event => {
    console.log(event.target.value);
    setTimeTravel(event.target.value);
  };
  const handleBiographyChange = event => {
    console.log(event.target.value);
    setBiography(event.target.value);
  };
  const handleNationalCodeChange = event => {
    console.log(event.target.value);
    setNationalCode(event.target.value);
  };
  const handleKnowCountryChange = event => {
    console.log(event.target.value);
    setKnowCountry(event.target.value);
  };
  const handleProjectInterestChange = event => {
    console.log(event.target.value);
    setProjectInterest(event.target.value);
  };
  const handlePreferWorkWithChange = event => {
    console.log(event.target.value);
    setPreferWorkWith(event.target.value);
  };
  const handleFoodInfoChange = event => {
    console.log(event.target.value);
    setFoodInfo(event.target.value);
  };
  const handlePasswordChange = event => {
    let passwordValidate = event.target.value.match(credentialRegex);
    setValidPassword(passwordValidate != null);
    if (passwordValidate != null) {
      setPT("");
    } else {
      setPT("Ingreso de texto en correo inválido\n");
    }

    setPassword(event.target.value);
  };

  const submit = event => {
    event.preventDefault();
    alert(civilStatus);
    setLoading(true);
    /*axios
        .post(Constants.REGISTER, JSON.stringify({ email, password }), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log("user logged in: ", response);
        })
        .catch(response => {
          console.log(response);
          if (response.data == "Invalid Credentials") {
            setValidTries({ validTries } + 1);
          }
          showFormError(true);
          setLoading(false);
        });*/
  };
  return (
    <MainContainer>
      <GlobalStyle />
      <StyledPaper>
        <Logo>Voluntourist</Logo>
        <CustomAvatar>
          <LockOutlinedIcon />
        </CustomAvatar>
        <Typography variant="h5">Crear una cuenta</Typography>
        <Form noValidate onSubmit={submit}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={handleNameChange}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={lastName}
              onChange={handleLastNameChange}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={nationalCode}
              onChange={handleNationalCodeChange}
              fullWidth
              id="nationalCode"
              label="nationalCode"
              name="nationalCode"
              autoComplete="nationalCode"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              id="phone"
              label="Phone"
              name="Phone"
              autoComplete="Phone"
              autoFocus
            />
          </div>
          <InputLabel id="label">Select your birth date</InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={birthDate}
            onChange={handleBirthDateChange}
            fullWidth
            type="date"
            id="BirthDate"
            //label="BirthDate"
            defaultValue="2001-01-01"
            name="BirthDate"
            autoFocus
          />

          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={occupation}
              onChange={handleOccupationChange}
              fullWidth
              id="Occupation"
              label="Occupation"
              name="Occupation"
              autoComplete="Occupation"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={nationality}
              onChange={handleNationalityChange}
              fullWidth
              id="nationality"
              label="Nationality"
              name="Nationality"
              autoComplete="Nationality"
              autoFocus
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={handleEmailChange}
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}></div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={biography}
            onChange={handleBiographyChange}
            fullWidth
            id="bio"
            label="Biography"
            name="Biography"
            autoComplete="Biography"
            autoFocus
          />
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Civil Status
            </InputLabel>
            <Select
              labelId="civilStatus"
              id="civilStatus"
              value={civilStatus}
              onChange={handleCivilStatusChange}
            >
              <MenuItem value="1">Soltero</MenuItem>
              <MenuItem value="2">Casado</MenuItem>
              <MenuItem value="3">Viudo</MenuItem>
              <MenuItem value="4">Divorciado</MenuItem>
              <MenuItem value="5">Union libre</MenuItem>
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10%",
              marginTop: "5%"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Gender
            </InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <MenuItem value="0">Prefiero no decir</MenuItem>
              <MenuItem value="1">Femenino</MenuItem>
              <MenuItem value="2">Masculino</MenuItem>
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10%"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Education Level
            </InputLabel>
            <Select
              labelId="educationLevel"
              id="educationLevel"
              value={educationLevel}
              onChange={handleEducationLevelChange}
              style={{ marginRight: "5%" }}
            >
              <MenuItem value="1">Primaria</MenuItem>
              <MenuItem value="2">Secundaria</MenuItem>
              <MenuItem value="3">Licenciatura</MenuItem>
              <MenuItem value="4">Maestra</MenuItem>
              <MenuItem value="5">Doctorado</MenuItem>
            </Select>
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Time to travel
            </InputLabel>
            <Select
              labelId="educationLevel"
              id="educationLevel"
              value={educationLevel}
              onChange={handleEducationLevelChange}
            >
              <MenuItem value="1">1 semana</MenuItem>
              <MenuItem value="2">2 semanas</MenuItem>
              <MenuItem value="3">4 semanas</MenuItem>
              <MenuItem value="4">6 o mas semanas</MenuItem>
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10%"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              ¿Do you know Guatemala?¿Do you know Spanish?
            </InputLabel>
            <Select
              labelId="knowCountry"
              id="knowCountry"
              value={knowCountry}
              onChange={handleKnowCountryChange}
            >
              <MenuItem value="1">Yes,Yes</MenuItem>
              <MenuItem value="2">Yes,No</MenuItem>
              <MenuItem value="3">No,Yes</MenuItem>
              <MenuItem value="4">No,No</MenuItem>
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Which projects do you prefer?
            </InputLabel>
            <Select
              labelId="projectInterest"
              id="projectInterest"
              value={projectInterest}
              onChange={handleProjectInterestChange}
            >
              <MenuItem value="1">Education</MenuItem>
              <MenuItem value="2">Health</MenuItem>
              <MenuItem value="3">Environment</MenuItem>
              <MenuItem value="4">All</MenuItem>
            </Select>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "10%" }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Type of food
            </InputLabel>
            <Select
              labelId="foodInfo"
              id="foodInfo"
              value={foodInfo}
              onChange={handleFoodInfoChange}
            >
              <MenuItem value="0">Nothing in especial</MenuItem>
              <MenuItem value="1">Vegetarian</MenuItem>
              <MenuItem value="2">Vegan</MenuItem>
            </Select>
          </div>

          <Typography variant="h6">Emergency Contact</Typography>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Role
            </InputLabel>
            <Select
              labelId="foodInfo"
              id="foodInfo"
              value={foodInfo}
              onChange={handleFoodInfoChange}
              style={{ marginRight: "5%" }}
            >
              <MenuItem value="0">Other</MenuItem>
              <MenuItem value="1">Mother</MenuItem>
              <MenuItem value="2">Father</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={handleNameChange}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={handleEmailChange}
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              id="phone"
              label="Phone"
              name="Phone"
              autoComplete="Phone"
              autoFocus
            />
          </div>

          <Typography variant="h6">Health Info</Typography>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}
          >
            <InputLabel id="label" style={{ marginRight: "5%" }}>
              Blood type
            </InputLabel>
            <Select
              labelId="foodInfo"
              id="foodInfo"
              value={foodInfo}
              onChange={handleFoodInfoChange}
              style={{ marginRight: "5%" }}
            >
              <MenuItem value="0">Dont know</MenuItem>
              <MenuItem value="1">O-</MenuItem>
              <MenuItem value="2">O+</MenuItem>
              <MenuItem value="3">A+</MenuItem>
              <MenuItem value="4">A-</MenuItem>
              <MenuItem value="5">B-</MenuItem>
              <MenuItem value="6">B+</MenuItem>
              <MenuItem value="7">AB-</MenuItem>
              <MenuItem value="8">AB+</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={handleNameChange}
              fullWidth
              id="name"
              label="Allergies"
              name="name"
              autoComplete="name"
              autoFocus
            />
          </div>
          {formError && (
            <Typography color="error">
              Correo electrónico o contraseña incorrectos {validEmailText}{" "}
              {validPasswordText}
            </Typography>
          )}

          {isLoading && <LoadingScreen dark="true" />}

          <SeparatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Crear cuenta
          </SeparatedButton>
        </Form>
      </StyledPaper>
    </MainContainer>
  );
};

export default Register;

import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import colors from "../../colors";
import styled, { createGlobalStyle } from "styled-components";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, MUCheckbox } from "../CommonComponents";
import { MenuItem, Select, InputLabel } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { TextareaAutosize } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as Constants from "../../constants";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { LoadingScreen } from "../CommonComponents";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.main};
  }
`;

const MainContainer = styled(Container)`
  height: 190%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  position: relative;
  display: flex;
  width: 50%;
  margin-top: 60%;
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
  width: 60%;
`;
const box = styled(Container)`
  display: flex;
  flex-direction: row;
`;



//{8,}
const generalInputRegex = /^[a-zA-Z0-9¡¿?@.:+]*$/gim;
const emailRegex = /^([\w.%+-]+)@([\w-])+(\.+[\w]{2,})*$/gim;
const credentialRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡¿?@:+]).{8,}$/gim;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [checkedGuatemala, setCheckedGuatemala] = useState(false);
  const [checkedSpanish, setCheckedSpanish] = useState(false);
  const [knowCountry, setKnowCountry] = useState("4");
  const [preferWorkWith, setPreferWorkWith] = useState("");
  const [projectInterest, setProjectInterest] = useState("4");
  const [foodInfo, setFoodInfo] = useState("0");
  const [vegetarian, setVegetarian] = useState(false);
  const [role, setRole] = useState("Other");
  const [cName, setCName] = useState("");
  const [cLastName, setCLastname] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cCode, setCCode] = useState("")
  const [cPhone, setCPhone] = useState("");
  const [bType, setBType] = useState("0");
  const [allergies, setAllergies] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  let lang = localStorage.getItem('lang')
  console.log('ESTE ES EL LANG', lang)
  counterpart.setLocale(lang);

  function handleDateChange(date) {
    setSelectedDate(date)
    console.log(date)
    let day = ("0" + date.getDate()).slice(-2)
    console.log('el dia es' + day)
    let month = ("0" + (date.getMonth() + 1)).slice(-2)

    let fulldate = date.getFullYear().toString() + "-" + month + "-" + day
    handleBirthDateChange(fulldate)
  }
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
  const handleAllergiesChange = event => {
    console.log(event.target.value);
    setAllergies(event.target.value);
  };
  const handleCEmailChange = event => {
    console.log(event.target.value);
    setCEmail(event.target.value);
  };
  const handleBTypeChange = event => {
    console.log(event.target.value);
    setBType(event.target.value);
  };
  const handleCCodeChange = event => {
    console.log(event.target.value);
    setCCode(event.target.value);
  }
  const handleCPhoneChange = event => {
    console.log(event.target.value);
    setCPhone(event.target.value);
  };
  const handleCNameChange = event => {
    console.log(event.target.value);
    setCName(event.target.value);
  };
  const handleCLastnameChange = event => {
    console.log(event.target.value);
    setCLastname(event.target.value);
  }
  const handleRoleChange = event => {
    console.log(event.target.value);
    setRole(event.target.value);
  };
  const handleNameChange = event => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleLastNameChange = event => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };
  function handleBirthDateChange(date) {
    console.log("en la funcion")
    console.log(date);
    setBirthDate(date);
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

  function handleKnowCountryChange(guate, esp) {
    if (guate === true && esp === true) {
      setKnowCountry("1")
    }
    if (guate === true && esp === false) {
      setKnowCountry("2")
    }
    if (guate === false && esp === true) {
      setKnowCountry("3")
    }
    if (guate === false && esp === false) {
      setKnowCountry("4")
    }
  };

  const handleChangeCheckedSpanish = (event) => {
    setCheckedSpanish(event.target.checked);
    handleKnowCountryChange(checkedGuatemala, event.target.checked)
  };
  const handleChangeCheckedGuatemala = (event) => {
    setCheckedGuatemala(event.target.checked);
    handleKnowCountryChange(event.target.checked, checkedSpanish)

  };
  const handleProjectInterestChange = event => {
    console.log(event.target.value);
    setProjectInterest(event.target.value);
  };
  const handlePreferWorkWithChange = event => {
    console.log(event.target.value);
    setPreferWorkWith(event.target.value);
  };
  function handleFoodInfoChange(food) {
    console.log(food);
    setFoodInfo(food);
  };
  const handleVegetarianChange = event => {
    setVegetarian(event.target.checked);
    if (event.target.checked) {
      handleFoodInfoChange("2")
    }
    else {
      handleFoodInfoChange("0")
    }
  }
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
  const handleClick = () => {

    history.push("/login")
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    handleClick()
  };

  const submit = event => {
    event.preventDefault();

    let req = {
      name,
      birthDate,
      gender,
      educationLevel,
      occupation,
      email,
      password,
      civilStatus,
      phone,
      timeTravel,
      knowCountry,
      projectInterest,
      preferWorkWith: 0,
      contactInfo: [{
        role,
        name: cName + " " + cLastName,
        phone: cCode + " " + cPhone,
        email: cEmail
      }],
      healthInfo: { "btype": bType, "pcondition": "NA", "allergies": allergies, "medicine": "NA" },
      foodInfo,
      lname: lastName,
      bio: biography,
      nationality,
      ncode: nationalCode,
      password,
      photo: ""

    }
    //alert(JSON.stringify(req));
    setLoading(true);
    axios
      .post(Constants.REGISTER, JSON.stringify(req), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        //alert(response)
        console.log("user logged in: ", response);
        setOpen(true)

      })
      .catch(response => {
        console.log(response);

        //alert(response)
        if (response.data == "Invalid Credentials") {
          setValidTries({ validTries } + 1);
        }
        showFormError(true);
        setLoading(false);
      });
  };
  return (
    <MainContainer>
      <GlobalStyle />
      <StyledPaper>
        <Logo>Voluntourist</Logo>
        <CustomAvatar>
          <LockOutlinedIcon />
        </CustomAvatar>
        <Typography variant="h5">Create account</Typography>
        <Form noValidate onSubmit={submit} variant="outlined" className={classes.formControl}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={handleNameChange}
              fullWidth
              id="name"
              label={<Translate content="name" />}
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
              label={<Translate content="lastname" />}
              name="lastName"
              autoComplete="lastName"
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
              label={<Translate content="countrycode" />}
              name="nationalCode"
              autoComplete="nationalCode"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              id="phone"
              label={<Translate content="phone" />}
              name="Phone"
              autoComplete="Phone"
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
              label={<Translate content="email" />}
              name="email"
              autoComplete="email"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}></div>
          <div style={{ marginBottom: "5%" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              name="password"
              label={<Translate content="password" />}
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={<Translate content="emailText" />}
            />
          </div>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              disableFuture="false"
              label={<Translate content="selectBirth" />}
              format="dd/MM/yyyy"
              value={selectedDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={occupation}
              onChange={handleOccupationChange}
              fullWidth
              id="Occupation"
              label={<Translate content="occup" />}
              name="Occupation"
              autoComplete="Occupation"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={nationality}
              onChange={handleNationalityChange}
              fullWidth
              id="nationality"
              label={<Translate content="nationality" />}
              name="Nationality"
              autoComplete="Nationality"
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
            label={<Translate content="bio" />}
            name="Biography"
            autoComplete="Biography"
            multiline
            rows={4}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
              <Translate content="civilstatus" />
            </InputLabel>
            <Select
              labelId="civilStatus"
              id="civilStatus"
              variant="outlined"
              value={civilStatus}
              onChange={handleCivilStatusChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="1"><Translate content="single" /></MenuItem>
              <MenuItem value="2"><Translate content="married" /></MenuItem>
              <MenuItem value="3"><Translate content="widow" /></MenuItem>
              <MenuItem value="4"><Translate content="divorced" /></MenuItem>
              <MenuItem value="5"><Translate content="freeUnion" /></MenuItem>
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
              <Translate content="gender" />
            </InputLabel>
            <Select
              labelId="gender"
              id="gender"
              variant="outlined"
              value={gender}
              onChange={handleGenderChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="0"><Translate content="noSay" /></MenuItem>
              <MenuItem value="1"><Translate content="female" /></MenuItem>
              <MenuItem value="2"><Translate content="male" /></MenuItem>
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
              <Translate content="eduLevel" />
            </InputLabel>
            <Select
              labelId="educationLevel"
              id="educationLevel"
              variant="outlined"
              value={educationLevel}
              onChange={handleEducationLevelChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="1"><Translate content="middle" /></MenuItem>
              <MenuItem value="2"><Translate content="highschool" /></MenuItem>
              <MenuItem value="3"><Translate content="university" /></MenuItem>
              <MenuItem value="4"><Translate content="master" /></MenuItem>
              <MenuItem value="5"><Translate content="phd" /></MenuItem>
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
              <Translate content="projectsPrefer" />
            </InputLabel>
            <Select
              labelId="projectInterest"
              id="projectInterest"
              variant="outlined"
              value={projectInterest}
              onChange={handleProjectInterestChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="1"><Translate content="education" /></MenuItem>
              <MenuItem value="2"><Translate content="health" /></MenuItem>
              <MenuItem value="3"><Translate content="environment" /></MenuItem>
              <MenuItem value="4"><Translate content="all" /></MenuItem>
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
              <Translate content="timeTravel" />
            </InputLabel>
            <Select
              labelId="timeTravel"
              id="timeTravel"
              variant="outlined"
              value={timeTravel}
              onChange={handleTimeTravelChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="1"><em>1  <Translate content="week"/></em></MenuItem>
              <MenuItem value="2"><em>2  <Translate content="weeks"/></em></MenuItem>
              <MenuItem value="3"><em>4  <Translate content="weeks"/></em></MenuItem>
              <MenuItem value="4"><em>6  <Translate content="moreWeeks"/></em></MenuItem>
            </Select>
          </div>

          <div style={{ display: "flex", flexDirection: "row", marginTop: "10%" }}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedGuatemala}
                    onChange={handleChangeCheckedGuatemala}
                  />
                }
                labelPlacement="start"
                label={<Translate content="knowGuate" />}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedSpanish}
                    onChange={handleChangeCheckedSpanish}
                  />
                }
                labelPlacement="start"
                label={<Translate content="knowSpanish" />}
              />
            </FormGroup>
          </div>

          <div style={{ display: "flex", flexDirection: "row", marginTop: "1%" }}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vegetarian}
                    onChange={handleVegetarianChange}
                  />
                }
                labelPlacement="start"
                label= {<Translate content='vegan'/>}
              />
            </FormGroup>
          </div>


          <Typography variant="h6" style={{ marginTop: "10%" }}><Translate content="emergencyContact" /></Typography>
          <Typography variant="body2" style={{ marginTop: "2%", color: "#70818c" }}> <Translate content="emergencyText" /> </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "25%" }}>
              <Translate content="role" />
            </InputLabel>
            <Select
              labelId="role"
              id="role"
              variant="outlined"
              value={role}
              onChange={handleRoleChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="Other"><Translate content="other" /></MenuItem>
              <MenuItem value="Mother"><Translate content="mother" /></MenuItem>
              <MenuItem value="Father"><Translate content="father" /></MenuItem>
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={cName}
              onChange={handleCNameChange}
              fullWidth
              id="cName"
              label={<Translate content="name" />}
              name="CName"
              autoComplete="cname"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={cLastName}
              onChange={handleCLastnameChange}
              fullWidth
              id="clastName"
              label={<Translate content="lastname" />}
              name="clastName"
              autoComplete="clastName"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={cEmail}
              onChange={handleCEmailChange}
              fullWidth
              id="cEmail"
              label={<Translate content="email" />}
              name="cEmail"
              autoComplete="email"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={cCode}
              onChange={handleCCodeChange}
              fullWidth
              id="cCode"
              label={<Translate content="code" />}
              name="cCode"
              autoComplete="code"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              value={cPhone}
              onChange={handleCPhoneChange}
              fullWidth
              id="cPhone"
              label={<Translate content="phone" />}
              name="cPhone"
              autoComplete="Phone"
            />
          </div>


          <Typography variant="h6" style={{ marginTop: "10%" }}><Translate content="healthInfo" /></Typography>
          <Typography variant="body2" style={{ marginTop: "2%", color: "#70818c" }}> <Translate content="healthText" /> </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }} >
              <Translate content="typeBlood" />
            </InputLabel>
            <Select
              labelId="bType"
              id="bType"
              variant="outlined"
              value={bType}
              onChange={handleBTypeChange}
              style={{ width: "100%" }}
            >
              <MenuItem value="0"><Translate content="dontKnow" /></MenuItem>
              <MenuItem value="1">O-</MenuItem>
              <MenuItem value="2">O+</MenuItem>
              <MenuItem value="3">A+</MenuItem>
              <MenuItem value="4">A-</MenuItem>
              <MenuItem value="5">B-</MenuItem>
              <MenuItem value="6">B+</MenuItem>
              <MenuItem value="7">AB-</MenuItem>
              <MenuItem value="8">AB+</MenuItem>
            </Select>
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={allergies}
              onChange={handleAllergiesChange}
              fullWidth
              id="allergies"
              label={<Translate content="allergies" />}
              name="allergies"
              autoComplete="Allergies"
              helperText={<Translate content="allergiesText" />}
              multiline
              rows={2}
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
            <Translate content="createaccount" />
          </SeparatedButton>
        </Form>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            <Translate content="successAccount" />
          </Alert>
        </Snackbar>
      </StyledPaper>
    </MainContainer>
  );
};

export default Register;

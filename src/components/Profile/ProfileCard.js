import axios from 'axios';
import * as Constants from '../../constants';
import instance from '../../axios';
import React, {
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Select,
  InputLabel,
  MenuItem,
  Typography as MuTypography,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import devices from '../../devices';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  LoadingScreen,
  PrecautionButton,
  TextField,
  YellowButton
} from '../CommonComponents';
import colors from '../../colors';
import { useUserId } from '../../hooks';

import InfoIcon from '@material-ui/icons/Info'
import WcIcon from '@material-ui/icons/Wc';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LanguageIcon from '@material-ui/icons/Language';
import PublicIcon from '@material-ui/icons/Public';
import EditIcon from '@material-ui/icons/Edit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { GiLoveInjection, GiMedicines } from "react-icons/gi";
import SchoolIcon from '@material-ui/icons/School';
import {
  BusinessCenter,
  Email,
  Favorite,
  FastRewind,
  Healing,
  Phone,
} from '@material-ui/icons';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);

const theme = createMuiTheme();

const AdditionalList = styled(List)`
  width: 100%;
`;

const BigAvatar = styled(Avatar)`
  color: ${colors.fg};
  background-color: ${colors.yellow};
  @media ${devices.mobileS} {
    width: 100px;
    height: 100px;
    margin-top: -60px;
    font-size: 2em;
  }
  @media ${devices.laptop} {
    width: 150px;
    height: 150px;
    margin-top: -75px;
    font-size: 3em;
  }
  border: 5px solid ${colors.fg};
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top:15px;
  display: flex;
  justify-content: flex-end;
  margin-right:15px;
`
const ButtonContainerBottom = styled.div`
  margin-top:15px;
  display: flex;
  justify-content: center;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: ${theme.spacing(5)}px;
  padding-left: ${theme.spacing(10)}px;
  padding-right: ${theme.spacing(10)}px;
`;

const Container = styled.div`
  margin-top: ${theme.spacing(40)}px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.main};
`;

const DataAvatar = styled(Avatar)`
  color: ${colors.fg};
  background-color: ${colors.main};
`;

const DetailsList = styled(List)`
  width: 50%;
`;

const FullPaper = styled(Paper)`
  width: 100%;
  height: auto;
  padding-bottom: 5%;
  margin-bottom: 10%;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
`;

const SecondColumn = styled.div`
  width: 50%;
  padding-left: ${theme.spacing(5)}px;
`;

const Typography = styled(MuTypography)`
  margin-top: ${theme.spacing(2)}px;
  color: ${colors.main};
`;


const ProfileCard = ({ user, updateUser }) => {
  let lang = localStorage.getItem('lang')
  console.log('ESTE ES EL LANG', lang)
  counterpart.setLocale(lang);


  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      user: null,
      canEdit: false,
      editing: false,
      loading: false,
      checkedSpanish: false,
      checkedGuate: false,
    }
  );

  const userId = useUserId();

  function handleKnowCountryChange(guate, esp) {
    console.log('update')
    console.log('guate', guate)
    console.log('spanish', esp)
    if (guate === true && esp === true) {
      handleUpdateProperty(1, 'knowCountry')
    }
    if (guate === true && esp === false) {
      handleUpdateProperty(2, 'knowCountry')
    }
    if (guate === false && esp === true) {
      handleUpdateProperty(3, 'knowCountry')
    }
    if (guate === false && esp === false) {
      handleUpdateProperty(4, 'knowCountry')
    }
  };

  const handleChangeCheckedGuatemala = (event) => {
    console.log(event.target.checked)
    setState({ checkedGuate: event.target.checked })
    handleKnowCountryChange(event.target.checked, state.checkedSpanish)
  };

  const handleChangeCheckedSpanish = (event) => {
    console.log(event.target.checked)
    setState({ checkedSpanish: event.target.checked })
    handleKnowCountryChange(state.checkedGuate, event.target.checked)
  };

  const handleToggle = (value) => {
    setState({ editing: !state.editing });
  };
  const handleUpdateUser = () => {
    console.log(state.user)
    setState({ loading: true });
    setState({ editing: false });
    updateUser(state.user)
      .then(() => {
        setState({ loading: false });
      });
  }

  const handleUpdateProperty = (value, property) => {
    const { user } = state;
    switch (property) {
      case 'bio':
      case 'email':
      case 'lname':
      case 'name':
      case 'ncode':
      case 'occup':
      case 'phone':
      case 'occupation':
      case 'gender':
      case 'bdate':
      case 'civilStatus':
      case 'educationLevel':
      case 'foodInfo':
      case 'knowCountry':
      case 'knowSpanish':
      case 'projectInterest':
      case 'timeTravel':
        user[property] = value;
        setState({ user });
        break;
      case 'allergies':
      case 'medicine':
      case 'pcondition':
      case 'btype':
        user.healthInfo[property] = value;
        setState({ user });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (user) {
      setState({
        user: {
          ...user,
        },
        canEdit: userId === user._id,
        checkedSpanish: user.knowCountry == 1 || user.knowCountry == 3,
        checkedGuate: user.knowCountry == 1 || user.knowCountry == 2,
      });
    }

  }, [user, userId]);

  if (!user || state.loading) {
    return <LoadingScreen />;
  }



  return (
    <Container>
      <FullPaper>
        {
          state.canEdit ?
            (
              <ButtonContainer>
                {
                  !state.editing ?  
                    (
                      <IconButton aria-label="delete" size="large" onClick={handleToggle}>
                        <EditIcon />
                      </IconButton>
                    ):
                    ''
                }
              </ButtonContainer>
            ) :
            ''
        }
        <BioContainer>
          <BigAvatar src={user.photo ? user.photo : null}>
            {`${user.name[0]}${user.lname[0]}`}
          </BigAvatar>

          {
            state.editing ?
              (
                <Grid container spacing={3} xs={6}>
                  <Grid item xs={6}>
                    <TextField
                      id="name"
                      label={<Translate content="name" />}
                      name="name"
                      onChange={event => handleUpdateProperty(event.target.value, 'name')}
                      required
                      value={state.user.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="lname"
                      label={<Translate content="lastname" />}
                      name="lname"
                      onChange={event => handleUpdateProperty(event.target.value, 'lname')}
                      required
                      value={state.user.lname}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              ) :
              (
                <Typography variant="h4">
                  {`${user.name} ${user.lname}`}
                </Typography>
              )
          }
          {
            state.editing ?
              (
                <Grid container spacing={3} xs={6} style={{ marginTop: '10px' }}>
                  <TextField
                    fullWidth
                    id="bio"
                    label={<Translate content="bio" />}
                    margin="normal"
                    multiline
                    name="bio"
                    onChange={event => handleUpdateProperty(event.target.value, 'bio')}
                    required
                    value={state.user.bio}
                    variant="outlined"
                    rows={4}
                  />
                </Grid>
              ) :
              (<Typography>
                {user.bio}
              </Typography>)
          }
        </BioContainer>
        <ColumnContainer>
          <DetailsList>
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <Email />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (<TextField
                    autoComplete="email"
                    id="email"
                    label={<Translate content="email" />}
                    name="email"
                    onChange={event => handleUpdateProperty(event.target.value, 'email')}
                    required
                    value={state.user.email}
                    variant="outlined"
                    style={{ width: "75%" }}
                  />) :
                  (<ListItemText
                    primary={<Translate content="email" />}
                    secondary={user.email}
                  />)
              }
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <Phone />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <Grid container spacing={3} >
                      <Grid item xs={3}>
                        <TextField
                          id="name"
                          label={<Translate content="code" />}
                          name="name"
                          onChange={event => handleUpdateProperty(event.target.value, 'ncode')}
                          value={state.user.ncode}
                          variant="outlined"
                          style={{ width: "100%" }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          id="name"
                          label={<Translate content="phone" />}
                          name="name"
                          onChange={event => handleUpdateProperty(event.target.value, 'phone')}
                          value={state.user.phone}
                          variant="outlined"
                          style={{ width: "82%" }}
                        />
                      </Grid>
                    </Grid>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="phone" />}
                      secondary={`+${user.ncode} ${user.phone}`}
                    />
                  )
              }

            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <BusinessCenter />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <TextField
                      id="name"
                      label={<Translate content="occup" />}
                      name="name"
                      onChange={event => handleUpdateProperty(event.target.value, 'occupation')}
                      value={state.user.occupation}
                      variant="outlined"
                      style={{ width: "75%" }}
                    />
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="occup" />}
                      secondary={user.occupation}
                    />
                  )
              }
            </ListItem>
            {/* gender */}
            <ListItem style={{ alignItems: "center" }}>
              <ListItemAvatar>
                <DataAvatar>
                  <WcIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                        <Translate content="gender" />
                      </InputLabel>
                      <Select
                        id="name"
                        label="Gender"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'gender')}
                        value={state.user.gender}
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <MenuItem value={0}>
                          <em>Prefer Not To Say</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          <em>Women</em>
                        </MenuItem>
                        <MenuItem value={2}>
                          <em>Men</em>
                        </MenuItem>
                      </Select>

                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="gender" />}
                      secondary={user.gender === 1 ? 'Women' : user.gender === 2 ? 'Men' : 'Prefer not to say'}
                    />
                  )
              }
            </ListItem>
            {/* civil status */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <Favorite />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                        <Translate content="civilstatus" />
                      </InputLabel>
                      <Select
                        id="name"
                        label="Civil Status"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'civilStatus')}
                        value={state.user.civilStatus}
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <MenuItem value={0}>
                          <em>N/A</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          <em>Single</em>
                        </MenuItem>
                        <MenuItem value={2}>
                          <em>Married</em>
                        </MenuItem>
                        <MenuItem value={3}>
                          <em>Widow</em>
                        </MenuItem>
                        <MenuItem value={4}>
                          <em>Divorced</em>
                        </MenuItem>
                        <MenuItem value={5}>
                          <em>Free Union</em>
                        </MenuItem>
                      </Select>

                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="civilstatus" />}
                      secondary={
                        user.civilStatus === 1 ? 'Single' :
                          user.civilStatus === 2 ? 'Married' :
                            user.civilStatus === 3 ? 'Widow' :
                              user.civilStatus === 4 ? 'Divorced' :
                                user.civilStatus === 5 ? 'Free Union' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
            {/* education level */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <SchoolIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                        <Translate content="eduLevel" />
                      </InputLabel>
                      <Select
                        id="name"
                        label="Education Level"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'educationLevel')}
                        value={state.user.educationLevel}
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <MenuItem value={0}><em>N/A</em></MenuItem>
                        <MenuItem value={1}><em><Translate content="middle" /></em></MenuItem>
                        <MenuItem value={2}><em> <Translate content="highschool" /></em></MenuItem>
                        <MenuItem value={3}><em> <Translate content="university" /></em></MenuItem>
                        <MenuItem value={4}><em> <Translate content="master" /></em></MenuItem>
                        <MenuItem value={5}><em> <Translate content="phd" /></em></MenuItem>

                      </Select>

                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="eduLevel" />}
                      secondary={
                        user.educationLevel === 1 ? 'Elementary' :
                          user.educationLevel === 2 ? 'Highschool' :
                            user.educationLevel === 3 ? 'Licenciatura' :
                              user.educationLevel === 4 ? 'Master' :
                                user.educationLevel === 5 ? 'PhD' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
            {/* special diet */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <FastfoodIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                        <Translate content='specialdiet' />
                      </InputLabel>
                      <Select
                        id="name"
                        label={<Translate content='specialdiet' />}
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'foodInfo')}
                        value={state.user.foodInfo}
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        <MenuItem value={0}>
                          <em>N/A</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          <em><Translate contents='vegan'/></em>
                        </MenuItem>
                        <MenuItem value={2}>
                          <em><Translate content='vegetarian'/></em>
                        </MenuItem>
                      </Select>
                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content='specialdiet' />}
                      secondary={
                        user.foodInfo === 1 ? 'Vegano' :
                          user.foodInfo === 2 ? 'Vegetariano' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
            {/* interests */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                        <Translate content='projectInterests' />
                      </InputLabel>
                      <Select
                        id="name"
                        label="Project Interests"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'projectInterest')}
                        value={state.user.projectInterest}
                        variant="outlined"
                        style={{ width: '100%' }}
                      >
                        <MenuItem value={0}>
                          <em>N/A</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          <em><Translate content='education'/></em>
                        </MenuItem>
                        <MenuItem value={2}>
                          <em><Translate content='health'/></em>
                        </MenuItem>
                        <MenuItem value={3}>
                          <em><Translate content='environment'/></em>
                        </MenuItem>
                        <MenuItem value={4}>
                          <em><Translate content='all'/></em>
                        </MenuItem>
                      </Select>
                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="projectInterests" />}
                      secondary={
                        user.projectInterest === 1 ? 'Educación' :
                          user.projectInterest === 2 ? 'Salud' :
                            user.projectInterest === 3 ? 'Medio Ambiente' :
                              user.projectInterest === 4 ? 'Todas' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
            {/* travel */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <AccessAlarmIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                        <Translate content='timeTravel' />
                      </InputLabel>
                      <Select
                        id="name"
                        label="Time Travel Availability"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'timeTravel')}
                        value={state.user.timeTravel}
                        variant="outlined"
                        style={{ width: '100%' }}
                      >
                        <MenuItem value={0}>
                          <em>N/A</em>
                        </MenuItem>
                        <MenuItem value={1}>
                          <em>1 <Translate content='week'/></em>
                        </MenuItem>
                        <MenuItem value={2}>
                          <em>2 <Translate content='weeks'/></em>
                        </MenuItem>
                        <MenuItem value={3}>
                          <em>4 <Translate content='weeks'/></em>
                        </MenuItem>
                        <MenuItem value={4}>
                          <em>6 <Translate content='moreWeeks'/></em>
                        </MenuItem>
                      </Select>
                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="timeTravel" />}
                      secondary={
                        user.timeTravel === 1 ? '1 semana' :
                          user.timeTravel === 2 ? '2 semanas' :
                            user.timeTravel === 3 ? '4 semanas' :
                              user.timeTravel === 4 ? '6 o más' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
            {/* knows Country */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <PublicIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedGuate}
                              onChange={handleChangeCheckedGuatemala}
                            />
                          }
                          labelPlacement="start"
                          label={<Translate content="knowsGuate" />}
                        />
                      </FormGroup>
                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="knowsGuate" />}
                      secondary={
                        user.knowCountry === 1 ? 'Si' :
                          user.knowCountry === 2 ? 'Si' :
                            user.knowCountry === 3 ? 'No' :
                              user.knowCountry === 4 ? 'No' :
                                user.knowCountry === 0 ? 'N/A' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
            {/* knows Spanish*/}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <LanguageIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                  (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "75%"
                      }}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedSpanish}
                              onChange={handleChangeCheckedSpanish}
                            />
                          }
                          labelPlacement="start"
                          label={<Translate content="knowSpanish" />}
                        />
                      </FormGroup>
                    </div>
                  ) :
                  (
                    <ListItemText
                      primary={<Translate content="knowsSpanish" />}
                      secondary={
                        user.knowCountry === 1 ? 'Si' :
                          user.knowCountry === 2 ? 'No' :
                            user.knowCountry === 3 ? 'Si' :
                              user.knowCountry === 4 ? 'No' :
                                user.knowCountry === 0 ? 'N/A' : 'N/A'
                      }
                    />
                  )
              }
            </ListItem>
          </DetailsList>
          <SecondColumn>
            <AdditionalList>
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <Healing />
                  </DataAvatar>
                </ListItemAvatar>
                {
                  state.editing ?
                    (
                      <TextField
                        id="allergies"
                        label="Allergies"
                        name="allergies"
                        onChange={event => handleUpdateProperty(event.target.value, 'allergies')}
                        value={state.user.healthInfo.allergies}
                        variant="outlined"
                        style={{width:'75%'}}
                        multiline
                        rows={2}
                      />
                    ) :
                    (
                      <ListItemText
                        primary={<Translate content="allergie" />}
                        secondary={user.healthInfo.allergies}
                      />
                    )
                }
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <GiMedicines />
                  </DataAvatar>
                </ListItemAvatar>
                {
                  state.editing ?
                    (
                      <TextField
                        id="medicine"
                        label={<Translate content='specialMedicine'/>}
                        name="allergies"
                        onChange={event => handleUpdateProperty(event.target.value, 'medicine')}
                        value={state.user.healthInfo.medicine}
                        variant="outlined"
                        style={{width:'75%'}}
                        multiline
                        rows={2}
                      />
                    ) :
                    (
                      <ListItemText
                        primary={<Translate content='specialMedicine'/>}
                        secondary={user.healthInfo.medicine}
                      />
                    )
                }
              </ListItem>
              {/* Special previous conditions */}
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <FastRewind />
                  </DataAvatar>
                </ListItemAvatar>
                {
                  state.editing ?
                    (
                      <TextField
                        id="pcondition"
                        label={<Translate content='previousConditions'/>}
                        name="pcondition"
                        onChange={event => handleUpdateProperty(event.target.value, 'pcondition')}
                        value={state.user.healthInfo.pcondition}
                        variant="outlined"
                        style={{width:'75%'}}
                        multiline
                        rows={2}
                      />
                    ) :
                    (
                      <ListItemText
                        primary={<Translate content='previousConditions'/>}
                        secondary={user.healthInfo.pcondition}
                      />
                    )
                }
              </ListItem>
              {/* blood type */}
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <GiLoveInjection />
                  </DataAvatar>
                </ListItemAvatar>
                {
                  state.editing ?
                    (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          width: "75%"
                        }}
                      >
                        <InputLabel id="label" style={{ marginRight: "5%", width: "55%" }}>
                          <Translate content='typeBlood' />
                        </InputLabel>
                        <Select
                          id="name"
                          label={<Translate content="typeBlood" />}
                          name="name"
                          onChange={event => handleUpdateProperty(event.target.value, 'btype')}
                          value={state.user.healthInfo.btype}
                          variant="outlined"
                          style={{width:'100%'}}
                        >
                          <MenuItem value={0}>
                            <em>N/A</em>
                          </MenuItem>
                          <MenuItem value={1}>
                            <em>O-</em>
                          </MenuItem>
                          <MenuItem value={2}>
                            <em>O+</em>
                          </MenuItem>
                          <MenuItem value={3}>
                            <em>A+</em>
                          </MenuItem>
                          <MenuItem value={4}>
                            <em>A-</em>
                          </MenuItem>
                          <MenuItem value={5}>
                            <em>B-</em>
                          </MenuItem>
                          <MenuItem value={6}>
                            <em>B+</em>
                          </MenuItem>
                          <MenuItem value={7}>
                            <em>AB-</em>
                          </MenuItem>
                          <MenuItem value={8}>
                            <em>AB+</em>
                          </MenuItem>
                        </Select>
                      </div>
                    ) :
                    (
                      <ListItemText
                        primary={<Translate content="typeBlood" />}
                        secondary={
                          user.healthInfo.btype === 1 ? 'O-' :
                            user.healthInfo.btype === 2 ? 'O+' :
                              user.healthInfo.btype === 3 ? 'A+' :
                                user.healthInfo.btype === 4 ? 'A-' :
                                  user.healthInfo.btype === 5 ? 'B-' :
                                    user.healthInfo.btype === 6 ? 'B+' :
                                      user.healthInfo.btype === 7 ? 'AB-' :
                                        user.healthInfo.btype === 8 ? 'AB+' : 'N/A'
                        }
                      />
                    )
                }
              </ListItem>
              <Divider variant="inset" component="li" />
            </AdditionalList>
          </SecondColumn>
        </ColumnContainer>
      
        {
          state.canEdit ?
            (
              <ButtonContainerBottom>
                {
                  state.editing ?
                    (
                      <div style={{width:'100%', justifyContent:'center', display: 'flex'}}>
                        <Button variant="outlined" color="secondary" style={{margin:10, width:'15%'}} onClick={handleToggle}>Cancel</Button>
                        <Button variant="contained" style={{backgroundColor: '#06A10B', color: '#fff', margin:10, width:'15%'}} onClick={handleUpdateUser}>Save </Button>
                      </div>
                    ) :
                    ''
                }
              </ButtonContainerBottom>
            ) :
            ''
        }
      </FullPaper>
    </Container>
  );
};

export default ProfileCard;

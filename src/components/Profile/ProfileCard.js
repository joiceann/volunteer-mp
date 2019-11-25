import axios from 'axios';
import * as Constants from '../../constants';
import instance from '../../axios';
import React, {
  useEffect,
  useReducer,
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
  MenuItem,
  Typography as MuTypography,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import devices from '../../devices';
import {
  Button,
  LoadingScreen,
  PrecautionButton,
  TextField,
} from '../CommonComponents';
import colors from '../../colors';
import { useUserId } from '../../hooks';

import InfoIcon from '@material-ui/icons/Info'

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
  display: flex;
  justify-content: flex-end;
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
  const [state , setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      user: null,
      canEdit: false,
      editing: false,
      loading: false,
    }
  );
  const userId = useUserId();

  const handleToggle = (value) => {
    setState({ editing: !state.editing });
  };
  const handleUpdateUser = () => {
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
      case 'bdate' :
      case 'civilStatus':
      case 'educationLevel':
      case 'foodInfo':
      case 'knowCountry':
      case 'pinterest':
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
    if (user)
      setState({ user: {...user}, canEdit: userId === user._id });
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
                state.editing ?
                (
                  <div>
                    <PrecautionButton variant="contained" color="primary" onClick={handleToggle}>Cancel</PrecautionButton>
                    <Button variant="contained" color="primary" onClick={handleUpdateUser}>Save</Button>
                  </div>
                ) :
                (
                  <Button variant="contained" color="primary"onClick={handleToggle}>Edit</Button>
                )
              }
              
            </ButtonContainer>
          ):
          ''
        }
        <BioContainer>
          <BigAvatar src={ user.photo ? user.photo : null }>
            {`${user.name[0]}${user.lname[0]}`}
          </BigAvatar>
          
          {
            state.editing ?
            (
              <Grid container spacing={3} xs={6}>
                <Grid item xs={6}>
                  <TextField
                    id="name"
                    label="Name"
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
                    label="Lastname"
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
              <Grid container spacing={3} xs={6} style={{marginTop: '10px'}}>
                <TextField
                  fullWidth
                  id="bio"
                  label="Biography"
                  margin="normal"
                  multiline
                  name="bio"
                  onChange={event => handleUpdateProperty(event.target.value, 'bio')}
                  required
                  value={state.user.bio}
                  variant="outlined"
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
                  label="Email address"
                  name="email"
                  onChange={event => handleUpdateProperty(event.target.value, 'email')}
                  required
                  value={state.user.email}
                  variant="outlined"
                />) :
                (<ListItemText
                    primary="Email address"
                    secondary={user.email}
                  />)
              }
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <Phone/>
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                ( 
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <TextField
                        id="name"
                        label="Area code"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'ncode')}
                        value={state.user.ncode}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        id="name"
                        label="Phone Number"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'phone')}
                        value={state.user.phone}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                ) :
                (
                  <ListItemText
                    primary="Phone Number"
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
                    label="Occupation"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'occupation')}
                    value={state.user.occupation}
                    variant="outlined"
                  />
                ) :
                (
                  <ListItemText
                    primary="Occupation"
                    secondary={user.occupation}
                  />
                )
              }
            </ListItem>
            {/* gender */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                (
                  <Select
                    id="name"
                    label="Gender"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'gender')}
                    value={state.user.gender}
                    variant="outlined"
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
                ) :
                (
                  <ListItemText
                    primary="Gender"
                    secondary={user.gender === 1 ? 'Women' : user.gender === 2 ? 'Men' : 'Prefer not to say'}
                  />
                )
              }
            </ListItem>
            {/* civil status */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                (
                  <Select
                    id="name"
                    label="Civil Status"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'civilStatus')}
                    value={state.user.civilStatus}
                    variant="outlined"
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
                ) :
                (
                  <ListItemText
                    primary="Civil Status"
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
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                (
                  <Select
                    id="name"
                    label="Education Level"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'educationLevel')}
                    value={state.user.educationLevel}
                    variant="outlined"
                  >
                    <MenuItem value={0}>
                        <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>Elementary</em>
                    </MenuItem>
                    <MenuItem value={2}>
                        <em>Highschool</em>
                    </MenuItem>
                    <MenuItem value={3}>
                        <em>Licenciatura</em>
                    </MenuItem>
                    <MenuItem value={4}>
                        <em>Master</em>
                    </MenuItem>
                    <MenuItem value={5}>
                        <em>PhD</em>
                    </MenuItem>
                  </Select>
                ) :
                (
                  <ListItemText
                    primary="Education Level"
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
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                (
                  <Select
                    id="name"
                    label="Special Diet"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'foodInfo')}
                    value={state.user.foodInfo}
                    variant="outlined"
                  >
                    <MenuItem value={0}>
                        <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>Vegan</em>
                    </MenuItem>
                    <MenuItem value={2}>
                        <em>Vegetarian</em>
                    </MenuItem>                    
                  </Select>
                ) :
                (
                  <ListItemText
                    primary="Special Diet"
                    secondary={
                      user.foodInfo === 1 ? 'Vegan' :
                      user.foodInfo === 2 ? 'Vegetarian' : 'N/A' 
                    }
                  />
                )
              }
            </ListItem>
            {/* knows */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                (
                  <Select
                    id="name"
                    label="Knows country and language"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'knowCountry')}
                    value={state.user.knowCountry}
                    variant="outlined"
                  >
                    <MenuItem value={0}>
                        <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>Yes/Yes</em>
                    </MenuItem>
                    <MenuItem value={2}>
                        <em>Yes/No</em>
                    </MenuItem>   
                    <MenuItem value={3}>
                        <em>No/Yes</em>
                    </MenuItem>
                    <MenuItem value={4}>
                        <em>No/No</em>
                    </MenuItem>                 
                  </Select>
                ) :
                (
                  <ListItemText
                    primary="Knows country and language"
                    secondary={
                      user.knowCountry === 1 ? 'Yes/Yes' :
                      user.knowCountry === 2 ? 'Yes/No' : 
                      user.knowCountry === 3 ? 'No/Yes' :
                      user.knowCountry === 4 ? 'No/No' : 'N/A' 
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
                  <Select
                    id="name"
                    label="Project Interests"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'pinterest')}
                    value={state.user.pinterest}
                    variant="outlined"
                  >
                    <MenuItem value={0}>
                        <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>Education</em>
                    </MenuItem>
                    <MenuItem value={2}>
                        <em>Health</em>
                    </MenuItem>   
                    <MenuItem value={3}>
                        <em>Environment</em>
                    </MenuItem>
                    <MenuItem value={4}>
                        <em>All</em>
                    </MenuItem>                 
                  </Select>
                ) :
                (
                  <ListItemText
                    primary="Project Interests"
                    secondary={
                      user.pinterest === 1 ? 'Education' :
                      user.pinterest === 2 ? 'Health' :
                      user.pinterest === 3 ? 'Environment' :
                      user.pinterest === 4 ? 'All' : 'N/A' 
                    }
                  />
                )
              }
            </ListItem>
            {/* travel */}
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <InfoIcon />
                </DataAvatar>
              </ListItemAvatar>
              {
                state.editing ?
                (
                  <Select
                    id="name"
                    label="Time Travel Availability"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'timeTravel')}
                    value={state.user.timeTravel}
                    variant="outlined"
                  >
                    <MenuItem value={0}>
                        <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>1 week</em>
                    </MenuItem>
                    <MenuItem value={2}>
                        <em>2 weeks</em>
                    </MenuItem>   
                    <MenuItem value={3}>
                        <em>4 weeks</em>
                    </MenuItem>
                    <MenuItem value={4}>
                        <em>6 or more weeks</em>
                    </MenuItem>                 
                  </Select>
                ) :
                (
                  <ListItemText
                    primary="Time Travel Availability"
                    secondary={
                      user.timeTravel === 1 ? '1 week' :
                      user.timeTravel === 2 ? '2 weeks' :
                      user.timeTravel === 3 ? '4 weeks' :
                      user.timeTravel === 4 ? '6 or more weeks' : 'N/A' 
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
                    />
                  ) :
                  (
                    <ListItemText
                      primary="Allergies"
                      secondary={user.healthInfo.allergies}
                    />
                  )
                }
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <Favorite />
                  </DataAvatar>
                </ListItemAvatar>
                {
                  state.editing ?
                  (
                    <TextField
                      id="medicine"
                      label="Special Medicine"
                      name="allergies"
                      onChange={event => handleUpdateProperty(event.target.value, 'medicine')}
                      value={state.user.healthInfo.medicine}
                      variant="outlined"
                    />
                  ) :
                  (
                    <ListItemText
                      primary="Special Medicine"
                      secondary={user.healthInfo.medicine}
                    />
                  )
                }
              </ListItem>
              {/* blood type */}
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <InfoIcon />
                  </DataAvatar>
                </ListItemAvatar>
                {
                  state.editing ?
                  (
                    <Select
                      id="name"
                      label="Blood Type"
                      name="name"
                      onChange={event => handleUpdateProperty(event.target.value, 'btype')}
                      value={state.user.healthInfo.btype}
                      variant="outlined"
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
                      <MenuItem value={5}>
                          <em>B+</em>
                      </MenuItem>
                      <MenuItem value={5}>
                          <em>AB-</em>
                      </MenuItem>
                      <MenuItem value={5}>
                          <em>AB+</em>
                      </MenuItem>
                    </Select>
                  ) :
                  (
                    <ListItemText
                      primary="Blood Type"
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
                      label="Special Previous Conditions"
                      name="pcondition"
                      onChange={event => handleUpdateProperty(event.target.value, 'pcondition')}
                      value={state.user.healthInfo.pcondition}
                      variant="outlined"
                    />
                  ) :
                  (
                    <ListItemText
                      primary="Special Previous Conditions"
                      secondary={user.healthInfo.pcondition}
                    />
                  )
                }
              </ListItem>
            </AdditionalList>            
          </SecondColumn>          
        </ColumnContainer>
      </FullPaper>
    </Container>
  );
};

export default ProfileCard;

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

import {
  BusinessCenter,
  Email,
  Favorite,
  FastRewind,
  Healing,
  Phone,
} from '@material-ui/icons';

const theme = createMuiTheme();

const AdditionalList = styled(List)`
  width: 100%;
`;

const BigAvatar = styled(Avatar)`
  color: ${colors.fg};
  background-color: ${colors.yellow};
  @media ${devices.mobileS} {
    width: 120px;
    height: 120px;
    margin-top: -60px;
    font-size: 2em;
  }
  @media ${devices.laptop} {
    width: 270px;
    height: 270px;
    margin-top: -135px;
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
  margin-top: ${theme.spacing(15)}px;
  width: 100%;
  height: 100%;
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
  @media ${devices.mobileS} {
    width: 90%;
  }
  max-width: 1305px;
  height: 100%;
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
        user[property] = value;
        setState({ user });
        break;
      case 'allergies':
      case 'medicine':
      case 'pcondition':
        user.hinfo[property] = value;
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
        
        <BioContainer>
          <BigAvatar>
            {`${user.name[0]}${user.lname[0]}`}
          </BigAvatar>
          
          {
            state.editing ?
            (
              <Grid container spacing={3} xs={6}>
                <Grid item xs={6}>
                  <TextField
                    id="name"
                    label="Nombres"
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
                    label="Apellidos"
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
              <Typography variant="h3">
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
                  label="Biografía"
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
                  label="Correo electrónico"
                  name="email"
                  onChange={event => handleUpdateProperty(event.target.value, 'email')}
                  required
                  value={state.user.email}
                  variant="outlined"
                />) :
                (<ListItemText
                    primary="Correo electrónico"
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
                        label="Código de Área"
                        name="name"
                        onChange={event => handleUpdateProperty(event.target.value, 'ncode')}
                        value={state.user.ncode}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        id="name"
                        label="Teléfono"
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
                    primary="Teléfono"
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
                    label="Ocupacíón"
                    name="name"
                    onChange={event => handleUpdateProperty(event.target.value, 'occup')}
                    value={state.user.occup}
                    variant="outlined"
                  />
                ) :
                (
                  <ListItemText
                    primary="Ocupación"
                    secondary={user.occup}
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
                      label="Alergias"
                      name="allergies"
                      onChange={event => handleUpdateProperty(event.target.value, 'allergies')}
                      value={state.user.hinfo.allergies}
                      variant="outlined"
                    />
                  ) :
                  (
                    <ListItemText
                      primary="Alergias"
                      secondary={user.hinfo.allergies}
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
                      label="Medicina"
                      name="allergies"
                      onChange={event => handleUpdateProperty(event.target.value, 'medicine')}
                      value={state.user.hinfo.medicine}
                      variant="outlined"
                    />
                  ) :
                  (
                    <ListItemText
                      primary="Medicina"
                      secondary={user.hinfo.medicine}
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
                      label="Condiciones previas"
                      name="pcondition"
                      onChange={event => handleUpdateProperty(event.target.value, 'pcondition')}
                      value={state.user.hinfo.pcondition}
                      variant="outlined"
                    />
                  ) :
                  (
                    <ListItemText
                      primary="Condiciones previas"
                      secondary={user.hinfo.pcondition}
                    />
                  )
                }
              </ListItem>
            </AdditionalList>
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
          </SecondColumn>
        </ColumnContainer>
      </FullPaper>
    </Container>
  );
};

export default ProfileCard;

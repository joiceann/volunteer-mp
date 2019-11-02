import React from 'react';
import {
  Paper,
  Avatar,
  Typography as MuTypography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import devices from '../../devices';
import {
  LoadingScreen,
} from '../CommonComponents';
import colors from '../../colors';

import {
  Email,
  Phone,
  BusinessCenter,
  Healing,
  Favorite,
  FastRewind,
} from '@material-ui/icons';

const theme = createMuiTheme();


const Container = styled.div`
  margin-top: ${theme.spacing(15)}px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.main};
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const DataAvatar = styled(Avatar)`
  color: ${colors.fg};
  background-color: ${colors.main};
`;

const Typography = styled(MuTypography)`
  margin-top: ${theme.spacing(2)}px;
  color: ${colors.main};
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: ${theme.spacing(5)}px;
  padding-left: ${theme.spacing(10)}px;
  padding-right: ${theme.spacing(10)}px;
`;

const DetailsList = styled(List)`
  width: 50%;
`;

const SecondColumn = styled.div`
  width: 50%;
  padding-left: ${theme.spacing(5)}px;
`;

const AdditionalList = styled(List)`
  width: 100%;
`;

const ProfileCard = ({ user }) => {
  if (user === null) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <FullPaper>
        <BioContainer>
          <BigAvatar>
            {`${user.name[0]}${user.lname[0]}`}
          </BigAvatar>
          <Typography variant="h3">
            {`${user.name} ${user.lname}`}
          </Typography>
          <Typography>
            {user.bio}
          </Typography>
        </BioContainer>
        <ColumnContainer>
          <DetailsList>
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <Email />
                </DataAvatar>
              </ListItemAvatar>
              <ListItemText
                primary="Correo electrónico"
                secondary={user.email}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <Phone/>
                </DataAvatar>
              </ListItemAvatar>
              <ListItemText
                primary="Teléfono"
                secondary={`+${user.ncode} ${user.phone}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <DataAvatar>
                  <BusinessCenter />
                </DataAvatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ocupación"
                secondary={user.occup}
              />
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
                <ListItemText
                  primary="Alergias"
                  secondary={user.hinfo.allergies}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <Favorite />
                  </DataAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Medicina"
                  secondary={user.hinfo.medicine}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <DataAvatar>
                    <FastRewind />
                  </DataAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Condiciones previas"
                  secondary={user.hinfo.pcondition}
                />
              </ListItem>
            </AdditionalList>
          </SecondColumn>
        </ColumnContainer>
      </FullPaper>
    </Container>
  );
};

export default ProfileCard;

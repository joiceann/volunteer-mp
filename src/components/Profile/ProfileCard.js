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

const BlueAvatar = styled(Avatar)`
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

const ProjectList = styled(List)`
  width: 100%;
`;

const ProfileCard = ({ user }) => {
  console.log(user);
  if (user === null) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <FullPaper>
        <BioContainer>
          <BlueAvatar>
            {`${user.name[0]}${user.lname[0]}`}
          </BlueAvatar>
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
                <Avatar>
                  <Email />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Correo electrónico"
                secondary={user.email}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Phone/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Teléfono"
                secondary={`+${user.ncode} ${user.phone}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BusinessCenter />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ocupación"
                secondary={user.occup}
              />
            </ListItem>
          </DetailsList>
          <SecondColumn>
            <Typography>
              Proyectos:
            </Typography>
            {
              user.projects.length === 0 &&
              <Typography>
                No hay proyectos existentes
              </Typography>
            }
            <ProjectList>
              {
                user.projects.map(project => (
                  <ListItem>
                    <ListItemText
                      primary={project.name}
                    />
                  </ListItem>
                ))
              }
            </ProjectList>
          </SecondColumn>
        </ColumnContainer>
      </FullPaper>
    </Container>
  );
};

export default ProfileCard;

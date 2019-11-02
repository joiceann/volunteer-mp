import React from 'react';

import styled from 'styled-components';
import {
  Typography,
  Paper,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import {
  DarkTitle as MyDarkTitle,
} from '../CommonComponents';

import colors from '../../colors';
import { createMuiTheme } from '@material-ui/core/styles';
import DateRangeSection from './DateRangeSection';

const theme = createMuiTheme();

const Content = styled.div`
  flex-grow: 1;
  background-color: ${colors.main};
  display: flex;
  flex-direction: column;

  padding-left: 10%;
  padding-right: 10%;
  padding-top: ${theme.spacing(4)}px;
  padding-bottom: ${theme.spacing(4)}px;
`;

const PaperWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const DescriptionPaper = styled(Paper)`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(4)}px;
  flex-shrink: 1;
`;

const NewsPaper = styled(Paper)`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(4)}px;
`;

const ProjectDescription = styled.div`
  padding-top: ${theme.spacing(2)}px;
  max-height: 500px;
  overflow: auto;
`;

const DarkTitle = styled(MyDarkTitle)`
  margin-bottom: ${theme.spacing(2)}px;
`;

const BlueAvatar = styled(Avatar)`
  background-color: ${colors.main};
`;

const ProjectContent = ({ project }) => {
  return (
    <Content>
      <DateRangeSection project={project} />
      <PaperWrapper>
        <DescriptionPaper>
          <DarkTitle variant="h6" align="left">
            Descripción del proyecto:
          </DarkTitle>
          <Divider />
          <ProjectDescription>
            <Typography paragraph={true}>
              {project.desc}
            </Typography>
          </ProjectDescription>
        </DescriptionPaper>
        <NewsPaper>
          <DarkTitle variant="h6" align="left">
            Voluntarios:
          </DarkTitle>
          <Divider />
          <ProjectDescription>
            {
              project.volunteers.map(volunteer => (
                <ListItem key={volunteer.id}>
                  <ListItemAvatar>
                    <BlueAvatar>
                      {`${volunteer.name && volunteer.name[0]}`}
                    </BlueAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${volunteer.name} (${volunteer.phone})`}
                  />
                </ListItem>
              ))
            }
          </ProjectDescription>
        </NewsPaper>
      </PaperWrapper>
    </Content>
  );
};

export default ProjectContent;

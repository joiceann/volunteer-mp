import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  LoadingScreen,
  DefaultImage,
  ClearButton,
  PrecautionButton,
  Alert,
} from '../CommonComponents';
import devices from '../../devices';
import colors from '../../colors';
import ProjectView from './ProjectView';


const theme = createMuiTheme();

const CustomImage = styled(CardMedia)`
  height: ${theme.spacing(10)}px;
  width: 100%;
`;

const CustomCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const CustomCard = styled(Card)`
  width: 345px;
  height: 371px;
  color: ${colors.main};
  @media ${devices.mobileS} {
    width: 100px;
    height: 100px;
  }
  @media ${devices.tablet} {
    width: 286px;
    height: 338px;
  }
  @media ${devices.laptopL} {
    width: 345px;
    height: 371px;
  }
  display: flex;
  flex-direction: column;
`;

const CustomCardAction = styled(CardActionArea)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CustomGrid = styled(Grid)`
  margin-top: 30px;
`;

const ProjectName = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media ${devices.mobileS} {
    max-width: 100px;
  }
  @media ${devices.tablet} {
    max-width: 280px;
  }
`;

const ProjectDescription = styled(Typography)`
  max-height: 168px;
  @media ${devices.tablet} {
    max-height: 140px;
  }
  @media ${devices.desktop} {
    max-height: 168px;
  }
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProjectList = ({ projects, search }) => {
  const [openConfirmDialog, openConfirmation] = useState(false);
  const [selectedProject, setSelectedProject] = useState({
    organinfo: {},
    volunteers: [],
    photo: [],
    news: [],
  });
  const [openProject, setOpenProject] = useState(false);
  let projectList = [];
  search = search.trim().toLowerCase();
  if (search !== '') {
    projectList = projects.filter((project) => {
      return project.name.toLowerCase().match(search);
    });
  } else {
    projectList = [...projects];
  }

  if (projects.length === 0) {
    return <LoadingScreen />
  }


  const deleteProject = (project) => {
    openConfirmation(true);
    setSelectedProject(project);
  };

  const showProject = (project) => {
    setSelectedProject(project);
    setOpenProject(true);
  };

  const onCloseProject = () => {
    setOpenProject(false);
  };

  const onAlertClose = (accept) => {
    // Log accept
    openConfirmation(false);
  };

  return (
    <CustomGrid container spacing={1} justify="space-between">
      <Alert
        open={openConfirmDialog}
        title={`¿Desea eliminar el proyecto ${selectedProject.name}?`}
        onClose={onAlertClose}
      >
        Una vez eliminado el proyecto no podrá volverse a recuperar
      </Alert>
      <ProjectView
        open={openProject}
        project={selectedProject}
        onClose={onCloseProject}
      />
      {
        projectList.map(project => (
          <Grid item key={project['_id']}>
            <CustomCard>
              <CustomCardAction onClick={() => showProject(project)}>
                {
                  (project.photo.length > 0)
                  ? <CustomImage
                    image={project.photo[0]}
                    title={project.name}
                  />
                    : <DefaultImage />
                }
                <CustomCardContent>
                  <ProjectName gutterBottom variant="h6" component="h6">
                    {project.name}
                  </ProjectName>
                  <ProjectDescription variant="body2" color="textSecondary" component="p">
                    {project.desc}
                  </ProjectDescription>
                </CustomCardContent>
              </CustomCardAction>
              <CardActions>
                <ClearButton size="small" color="primary">
                  Editar
                </ClearButton>
                <PrecautionButton
                  size="small"
                  color="primary"
                  onClick={() => deleteProject(project)}
                >
                  Eliminar
                </PrecautionButton>
              </CardActions>
            </CustomCard>
          </Grid>
        ))
      }
    </CustomGrid>
  );
};

export default ProjectList;

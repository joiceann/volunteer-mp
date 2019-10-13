import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  LoadingScreen,
  DefaultImage,
  ClearButton,
} from '../CommonComponents';
import devices from '../../devices';

const theme = createMuiTheme();

const CustomImage = styled(CardMedia)`
  height: ${theme.spacing(10)}px;
`;

const CustomCard = styled(Card)`
  width: 345px;
  height: 371px;
  @media ${devices.mobileS} {
    width: 100px;
    height: 100px;
  }
  @media ${devices.tablet} {
    width: 345px;
    height: 371px;
  }
  display: flex;
  flex-direction: column;
`;

const CustomCardAction = styled(CardActionArea)`
  flex-grow: 1;
`;

const CustomGrid = styled(Grid)`
  margin-top: 30px;
`;

const ProjectName = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProjectList = ({ projects, search }) => {
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
  return (
    <CustomGrid container spacing={1} justify="space-between">
      {
        projectList.map(project => (
          <Grid item key={project['_id']}>
            <CustomCard>
              <CustomCardAction>
                {
                  (project.photo.length > 0)
                  ? <CustomImage
                    image={project.photo[0]}
                    title={project.name}
                  />
                    : <DefaultImage />
                }
                <CardContent>
                  <ProjectName gutterBottom variant="h6" component="h6">
                    {project.name}
                  </ProjectName>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {project.desc}
                  </Typography>
                </CardContent>
              </CustomCardAction>
              <CardActions>
                <ClearButton size="small" color="primary">
                  Editar
                </ClearButton>
                <ClearButton size="small" color="primary">
                  Eliminar
                </ClearButton>
              </CardActions>
            </CustomCard>
          </Grid>
        ))
      }
    </CustomGrid>
  );
};

export default ProjectList;

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import colors from '../../colors';
import devices from '../../devices';

import {
  Avatar as MuAvatar,
} from '@material-ui/core';

import {
  DefaultImage,
} from '../CommonComponents';

const theme = createMuiTheme();


const CustomAppBar = styled(AppBar)`
  position: relative;
  color: ${colors.fg};
  background-color: ${colors.main};
`;


const Title = styled(Typography)`
  margin-left: ${theme.spacing(2)}px;
  flex: 1;
  color: ${colors.main};
  @media ${devices.mobileS} {
    font-size: 2em;
  }
  @media ${devices.laptop} {
    font-size: 3em;
  }
  text-align: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Banner = styled.div`
  height: 30%;
  box-shadow: inset 0 0 1px 1px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  padding-left: 10%;
`;

const ProjectContent = styled.div`
  flex-grow: 1;
  background-color: ${colors.main};
`;

const Avatar = styled(MuAvatar)`
  color: ${colors.fg};
  background-color: ${colors.main};
  @media ${devices.mobileS} {
    width: 120px;
    height: 120px;
    font-size: 2em;
  }
  @media ${devices.laptop} {
    width: 270px;
    height: 270px;
    font-size: 3em;
  }
  box-sizing: border-box;
  border: 5px solid ${colors.main};
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const ProjectInsights = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Insights = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing(10)}px;;
  color: ${colors.main};
  font-weight: bold;
`;

const CompanyInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing(4)}px;;
  color: ${colors.main};
  font-weight: bold;
`;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectView = ({ open, onClose, project }) => {
  console.log(project)
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <CustomAppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Filler>
          </Filler>
          <Button autoFocus color="inherit" onClick={onClose}>
            Suscribirme
          </Button>
        </Toolbar>
      </CustomAppBar>
      <Section>
        <Banner>
          <Avatar src={project.photo && project.photo[0]}/>
          <ProjectInsights>
            <Title variant="h1">
              {project.name}
            </Title>
            <Insights>
              {project.volunteers.length} voluntarios | {project.news.length} noticias
            </Insights>
            <CompanyInfo>
              Promovido por: {project.organinfo.name}
            </CompanyInfo>
          </ProjectInsights>
        </Banner>
        <ProjectContent>
        </ProjectContent>
      </Section>
    </Dialog>
  );
}

export default ProjectView;

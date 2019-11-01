import React from 'react';
import {
  Avatar as MuAvatar,
  Typography,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import colors from '../../colors';
import devices from '../../devices';
import styled from 'styled-components';

const Banner = styled.div`
  height: 30%;
  box-shadow: inset 0 0 1px 1px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  padding-left: 10%;
`;

const theme = createMuiTheme();

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

const ProjectBanner = ({ project }) => {
  return (
    <Banner>
      <Avatar src={project.photo && project.photo[0]}>
        {`${project.name[0]}${project.name[1]}`}
      </Avatar>
      <ProjectInsights>
        <Title variant="h1" align="center">
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
  );
};

export default ProjectBanner;

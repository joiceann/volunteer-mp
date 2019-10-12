import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';


const ProjectView = styled.section`
  display: flex;
  flex-direction: column;
`;


const Projects = () => {

  return (
    <ProjectView>
      <Typography>
        Proyectos
      </Typography>
    </ProjectView>
  );
};

export default Projects;

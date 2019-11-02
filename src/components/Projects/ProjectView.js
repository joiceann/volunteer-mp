import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import styled from 'styled-components';
import colors from '../../colors';
import ProjectBanner from './ProjectBanner';
import ProjectContent from './ProjectContent';


const CustomAppBar = styled(AppBar)`
  position: relative;
  color: ${colors.fg};
  background-color: ${colors.main};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;


const Filler = styled.div`
  flex-grow: 1;
`;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectView = ({ open, onClose, project }) => {
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
        <ProjectBanner project={project}/>
        <ProjectContent project={project} />
      </Section>
    </Dialog>
  );
}

export default ProjectView;

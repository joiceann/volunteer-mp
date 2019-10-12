import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import FaceIcon from '@material-ui/icons/Face';
import ProjectIcon from '@material-ui/icons/Assignment';
import ExitIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import devices from '../devices';
import { RouterLink } from './CommonComponents';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const drawerClosedWidth = '60px';

const StyledDrawer = styled(Drawer)`
  width: ${props => (props.open) ? '270px' : drawerClosedWidth};
  @media ${devices.labtop} {
    width: ${props => (props.open) ? '270px' : drawerClosedWidth};
  }

  @media ${devices.laptopL} {
    width: ${props => (props.open) ? '330px' : drawerClosedWidth};
  }
  & > * {
    width: ${props => (props.open) ? '270px' : drawerClosedWidth};
    @media ${devices.labtop} {
      width: ${props => (props.open) ? '270px' : drawerClosedWidth};
    }

    @media ${devices.laptopL} {
      width: ${props => (props.open) ? '330px' : drawerClosedWidth};
    }

    transition: width ${props => props.theme.transitions.easing.sharp}
      ${props => props.theme.transitions.duration.leavingScreen}ms;
      overflow-x: hidden;
  }
  white-space: nowrap;
`;

const Logo = styled.h1`
  font-family: 'Josefin Sans', sans-serif;
  user-select: none;
  flex-basis: 135px;
  margin-right: 8px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-left: ${props => (props.open) ? '16px' : '20px'};
`;

const PaddedIconButton = styled(IconButton)`
  margin-left: 6px;
  margin-bottom: 6px;
`;

const StyledListItem = styled(ListItem)`
  padding-top:28px;
  padding-bottom: 28px;
`;


const Menu = ({ logout }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  let { section } = useParams();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <StyledDrawer
      anchor="left"
      variant="permanent"
      open={open}
      theme={theme}
    >
      <List>
        <LogoContainer>
          <Logo open={open}>
            {open ? 'voluntourist' : 'v'}
          </Logo>
          {open &&
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft  />
          </IconButton>
          }
        </LogoContainer>
        {!open &&
        <PaddedIconButton onClick={toggleDrawer}>
          <ChevronRight />
        </PaddedIconButton>
        }
        <Divider />
        <RouterLink to="/dashboard/overview">
          <StyledListItem
            selected={section === 'overview'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </StyledListItem>
        </RouterLink>
        <RouterLink to="/dashboard/projects">
          <StyledListItem
            selected={section === 'projects'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <ProjectIcon />
            </ListItemIcon>
            <ListItemText primary="Mis proyectos" />
          </StyledListItem>
        </RouterLink>
        <RouterLink to="/dashboard/profile">
          <StyledListItem
            selected={section === 'profile'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </StyledListItem>
        </RouterLink>
        <Divider />
        <StyledListItem
          onClick={() => logout()}
          button
          alignItems="center"
        >
          <ListItemIcon>
            <ExitIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </StyledListItem>

      </List>
    </StyledDrawer>
  );
};

export default Menu;

import React, {
  useState,
}from 'react';
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme } from '@material-ui/core/styles';
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
import SearchIcon from '@material-ui/icons/Search';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import devices from '../../devices';
import { RouterLink } from '../CommonComponents';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const drawerClosedWidth = '60px';

const theme = createMuiTheme();
const StyledDrawer = styled(Drawer)`
  width: ${props => (props.open) ? '270px' : drawerClosedWidth};
  @media ${devices.mobileS} {
    width: ${props => (props.open) ? '270px' : drawerClosedWidth};
    position: ${props => props.open ? 'absolute' : 'relative'};
  }

  @media ${devices.laptop} {
    width: ${props => (props.open) ? '270px' : drawerClosedWidth};
    position: relative;
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

    transition: width ${theme.transitions.easing.sharp}
      ${theme.transitions.duration.leavingScreen}ms;
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
  const [open, setOpen] = useState(true);
  let { section } = useParams();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const userType = localStorage.getItem('V_USER_TYPE') || null
    
  return (
    <StyledDrawer
      anchor="left"
      variant="permanent"
      open={open}
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
        {/* <RouterLink to="/dashboard/overview">
          <StyledListItem
            selected={section === 'overview'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Mis noticias" />
          </StyledListItem>
        </RouterLink> */}
        {/* <RouterLink to="/dashboard/projects">
          <StyledListItem
            selected={section === 'projects'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <ProjectIcon />
            </ListItemIcon>
            <ListItemText primary="Proyectos" />
          </StyledListItem>
        </RouterLink> */}

        {/* MyProjects component router link */}
        <RouterLink to="/dashboard/my-projects">
          <StyledListItem
            selected={section === 'my-projects'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <ProjectIcon />
            </ListItemIcon>
            <ListItemText primary="My Projects" />
          </StyledListItem>
        </RouterLink>

        <RouterLink to="/dashboard/search">
          <StyledListItem
            selected={section === 'search'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Projects" />
          </StyledListItem>
        </RouterLink>

        {
          userType === "2" &&
          <RouterLink to="/dashboard/locations">
            <StyledListItem
              selected={section === 'locations'}
              button
              alignItems="center"
            >
              <ListItemIcon>
                <PersonPinIcon />
              </ListItemIcon>
              <ListItemText primary="Volunteer Locations" />
            </StyledListItem>
          </RouterLink>
        }

        <RouterLink to="/dashboard/profile">
          <StyledListItem
            selected={section === 'profile'}
            button
            alignItems="center"
          >
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
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
          <ListItemText primary="Log Out" />
        </StyledListItem>

      </List>
    </StyledDrawer>
  );
};

export default Menu;

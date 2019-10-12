import styled from 'styled-components';
import colors from '../../colors';
import MuButton from '@material-ui/core/Button';
import MuTextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';


export const Button = styled(MuButton)`
  background-color: ${colors.secondary};
  &:hover {
    background-color: ${colors.main};
  }
`;

export const TextField = styled(MuTextField)`
  & label.Mui-focused {
    color: ${colors.main};
  }
  & fieldset.MuiOutlinedInput-notchedOutline {
    border-color: ${colors.main} !important;
  }
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

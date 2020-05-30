import React, {
  useEffect,
  useReducer,
} from 'react';
import {
  Header,
  LoadingScreen,
  Section,
  Snackbar,
} from '../CommonComponents';
import {
  useParams
} from 'react-router-dom';

import axios from 'axios';
import instance from '../../axios';
import ProfileCard from './ProfileCard';
import * as Constants from '../../constants';
import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import Typography from "@material-ui/core/Typography";

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);


const Profile = () => {
  let lang = localStorage.getItem('lang')
  console.log('ESTE ES EL LANG', lang)
  counterpart.setLocale(lang);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      loading: true,
      showError: false,
      user: null,
    }
  );

  const fetchUser = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setState({ loading: true });
    instance.get(Constants.USER_PROFILE, {
      cancelToken: source.token,
    }).then((response) => {
      setState({ user: response.data });
    }).catch(() => {
      setState({ showError: true });
    })
      .finally(() => {
        setState({ loading: false });
      });

    return () => {
      source.cancel();
    };
  };

  const updateUser = user => {
    return instance.post(Constants.UPDATE_USER, user)
      .then(response => {
        console.log(response);
        fetchUser();
      })
  }

  useEffect(fetchUser, []);


  return (
    <Section>
      <Header>
        <Typography variant="h3" className='josefin-bold' style={{ color: '#fff', marginBottom: 20 }}>
          <Translate content="myProfile" />
        </Typography>
      </Header>
      <ProfileCard user={state.user} updateUser={updateUser} />
      <Snackbar
        open={state.showError}
        variant="error"
        setOpen={(showError) => setState({ showError })}
        message="No fue posible obtener el perfil de usuario"
      />
    </Section>
  );
};

export default Profile;

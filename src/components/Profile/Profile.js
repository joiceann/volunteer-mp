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

const Profile = () => {

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
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
        Perfil
      </Header>
      <ProfileCard user={state.user} updateUser={updateUser}/>
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

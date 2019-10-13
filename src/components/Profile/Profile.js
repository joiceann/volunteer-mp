import React, {
  useState,
  useEffect,
} from 'react';
import {
  Header,
  Section,
  Snackbar,
} from '../CommonComponents';

import axios from 'axios';
import instace from '../../axios';
import ProfileCard from './ProfileCard';
import * as Constants from '../../constants';

const Profile = () => {

  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(false);

  const fetchUser = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    instace.get(Constants.USER_PROFILE, {
      cancelToken: source.token,
    }).then((response) => {
      setUser(response.data);
    }).catch(() => {
      setShowError(true);
    });

    return () => {
      source.cancel();
    };
  };

  useEffect(fetchUser, []);


  return (
    <Section>
      <Header>
        Mi perfil
      </Header>
      <ProfileCard user={user} />
      <Snackbar
        open={showError}
        variant="error"
        setOpen={setShowError}
        message="No fue posible obtener el perfil de usuario"
      />
    </Section>
  );
};

export default Profile;

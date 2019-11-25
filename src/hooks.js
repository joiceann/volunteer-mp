import { useState } from 'react';


function useLocalStorage(localItem) {
  const [local, setState] = useState(localStorage.getItem(localItem));

  function setLocal(newItem) {
    localStorage.setItem(localItem, newItem);
    setState(newItem);
  }

  return [local, setLocal];
}

function useUserId() {
  const [token, _] = useLocalStorage('token');

  if (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload)._id;
  } else {
    return null;
  }
}



export {
  useLocalStorage,
  useUserId,
};



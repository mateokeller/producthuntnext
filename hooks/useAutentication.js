import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const useAutentication = () => {
  const [userAutentication, setUserAutentication] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUserAutentication(user);
      } else {
        setUserAutentication(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return userAutentication;
};

export default useAutentication;

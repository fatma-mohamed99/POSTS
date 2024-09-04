import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase'; 

const TokenForUser = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken(true)
          .then((idToken) => {
            let tokensArray = JSON.parse(localStorage.getItem('userTokens')) || [];
            tokensArray.push({ userId: user.uid, token: idToken });
            localStorage.setItem('userTokens', JSON.stringify(tokensArray));
            localStorage.setItem('userId', user.uid); 
            console.log("Token saved in localStorage:", tokensArray);
          })
          .catch((error) => {
            console.error("Error fetching ID token:", error);
          });
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return <div></div>;
};

export default TokenForUser;

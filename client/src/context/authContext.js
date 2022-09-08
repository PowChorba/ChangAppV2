/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("Error");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logAnonymous = () => {
    return signInAnonymously(auth);
  };

  const loginGoogle = () => {
    const googleLogin = new GoogleAuthProvider();
    return signInWithPopup(auth, googleLogin);
  };

  const loginFacebook = () => {
    const facebookLogin = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookLogin);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        signUp,
        loginGoogle,
        loginFacebook,
        logAnonymous,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

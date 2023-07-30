import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  // console.log("user vaue is" , user);
  async function signUp(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      setUser(user);
    } catch (error) {
      console.error("Sign Up Error:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  }

  function logIn(email, password, name) {
    console.log("Email", email + " " + name);
    return signInWithEmailAndPassword(auth, email, password, name);
  }
  function logOut() {
    // console.log("logout");
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

import { app } from "../../../firebaseConfig";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

export const usePasswordReset = () => {
  const router = useRouter();
  const auth = getAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, passwordReset };
};

export const useLogout = () => {
  const auth = getAuth();
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};

export const SignInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const auth = getAuth();

  signInWithPopup(auth, googleProvider)
    .then(() => {
      // signupnotify();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    })
    .catch((err) => {
      // signupmissnotify();
      console.log(err.message);
    });
  return { SignInWithGoogle };
};

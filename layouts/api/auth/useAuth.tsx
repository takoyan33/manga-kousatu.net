import {
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

//新規登録
export const useSignup = () => {
  const [error, setError] = useState(null);
  const auth = getAuth();

  const signup = (email: string, password: string) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { error, signup };
};

//ログイン
export const useLogin = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();

  const login = (email: string, password: string) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, login };
};

//パスワードリセット
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

//ログアウト
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

//Googleログイン
export const SignInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const auth = getAuth();

  signInWithPopup(auth, googleProvider)
    .then(() => {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    })
    .catch((err) => {
      console.log(err.message);
    });
  return { SignInWithGoogle };
};

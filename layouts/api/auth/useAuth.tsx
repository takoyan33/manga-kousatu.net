import { app } from "../../../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export const usePasswordReset = () => {
  const auth = getAuth();
  const passwordReset = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { passwordReset };
};

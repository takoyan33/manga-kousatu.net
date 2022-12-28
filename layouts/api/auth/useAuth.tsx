import { app } from "../../../firebaseConfig";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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

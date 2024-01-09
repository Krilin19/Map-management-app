import { FC } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";

export const LogInButton: FC = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const onLoginClick = () => {
    signInWithPopup(auth, provider);
  };

  return <Button onClick={onLoginClick}>Log in</Button>;
};
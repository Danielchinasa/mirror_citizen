import React from "react";
import SignUpMode from "./signUpMode";
import { SignUpShell, SignUpCard } from "./SignUp.elements";

const SignUpPage = () => {
  return (
    <SignUpShell>
      <SignUpCard>
        <SignUpMode />
      </SignUpCard>
    </SignUpShell>
  );
};

export default SignUpPage;

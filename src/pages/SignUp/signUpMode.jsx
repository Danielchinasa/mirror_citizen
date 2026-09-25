import React, { useState } from "react";
import individual from "../../images/individual.svg";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  AccountCopy,
  AccountDescription,
  AccountIcon,
  AccountOption,
  AccountTitle,
  ContinueLink,
  Eyebrow,
  SelectionMark,
  SignInPrompt,
  Subtitle,
  Title,
} from "./SignUp.elements";

const SignUpMode = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);

  return (
    <div>
      <Eyebrow>e-Citizen</Eyebrow>
      <Title>Create your account</Title>
      <Subtitle>
        Choose the account type that best describes how you will use e-Citizen.
      </Subtitle>

      <AccountOption
        type="button"
        $selected={selectedDiv === 1}
        onClick={() => setSelectedDiv(1)}
        aria-pressed={selectedDiv === 1}
      >
        <AccountIcon>
          <img src={individual} alt="" />
        </AccountIcon>
        <AccountCopy>
          <AccountTitle>Individual</AccountTitle>
          <AccountDescription>
            For personal verification needs and individual use.
          </AccountDescription>
        </AccountCopy>
        <SelectionMark $selected={selectedDiv === 1} aria-hidden="true">
          {selectedDiv === 1 && <FaCheck />}
        </SelectionMark>
      </AccountOption>

      {selectedDiv && (
        <ContinueLink to="/individual/sign-up/1">
          Continue <FaArrowRight />
        </ContinueLink>
      )}

      <SignInPrompt>
        Already have an account? <Link to="/verification-login">Sign in</Link>
      </SignInPrompt>
    </div>
  );
};

export default SignUpMode;

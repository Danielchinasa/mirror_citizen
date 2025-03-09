import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SsoButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
    </GoogleOAuthProvider>
  );
};

export default SsoButton;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProtectedRoute({ component: Component, redirectTo, ...restOfProps }) {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={redirectTo || "/verification-login?redirect=/verify/nin"}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;

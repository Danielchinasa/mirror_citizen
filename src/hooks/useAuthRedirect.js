import { useSelector } from "react-redux";

/**
 * Returns the appropriate path for verification buttons.
 * If the user is already logged in, returns the verify page directly.
 * Otherwise, returns the login page with a redirect param.
 */
const useAuthRedirect = (verifyPath) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return verifyPath;
  }
  return `/verification-login?redirect=${verifyPath}`;
};

export default useAuthRedirect;

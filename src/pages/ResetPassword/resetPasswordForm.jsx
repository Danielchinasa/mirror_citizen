import React, { useState, useMemo, useEffect } from "react";
import { Checkbox, Alert, Spin, notification, Button } from "antd";
import {
  BtnLink,
  Heading,
  MainButtonFull,
  StyledForm,
  StyledInputNoDarkMode,
  StyledLabel,
  // Subtitle,
} from "../../globalStyles";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../redux/actions";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import Cookies from "js-cookie";
// import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";

const Context = React.createContext({
  name: "Default",
});

const ResetPasswordForm = ({ email, token }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: email,
    token: token,
    newpassword: "",
    confirmpassword: "",
    // rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  // const [ipAddress, setIpAddress] = useState(null);
  // const [ipCountry, setIpCountry] = useState(null);

  // const openNotification = (placement) => {
  //   api.info({
  //     message: `Notification`,
  //     description: "response.message",
  //     placement,
  //   });
  // };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    [],
  );

  // useEffect(() => {
  //   const fetchIpAddress = async () => {
  //     try {
  //       // Attempt to fetch IP address from the first URL
  //       const response = await axios.get("https://api.ipbase.com/v1/json/");
  //       setIpAddress(response.data.ip);
  //     } catch (error1) {
  //       console.error("Error fetching IP address from primary URL:", error1);
  //       try {
  //         // Attempt to fetch IP address from the second URL if the first one fails
  //         const response = await axios.get("https://ipapi.co/json/");
  //         setIpAddress(response.data.ip);
  //       } catch (error2) {
  //         console.error(
  //           "Error fetching IP address from secondary URL:",
  //           error2
  //         );
  //         setIpAddress(null); // Set IP address to null if both URLs fail
  //       }
  //     }
  //   };

  //   fetchIpAddress();

  //   // Retrieve email from cookie and set in state when component mounts
  //   // const rememberedEmail = Cookies.get("rememberedEmail");
  //   // if (rememberedEmail) {
  //   //   setFormData((prevState) => ({
  //   //     ...prevState,
  //   //     email: rememberedEmail,
  //   //   }));
  //   // }
  // }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });

    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.newpassword) {
      errors.newpassword = "Please enter your password";
    } else if (formData.newpassword.length < 8) {
      errors.newpassword = "Password must be 8 characters or more";
    }

    if (!formData.confirmpassword) {
      errors.confirmpassword = "Please enter your password";
    } else if (formData.newpassword != formData.newpassword) {
      errors.confirmpassword = "Password mismatch";
    }

    return errors;
  };

  // const handleRememberMeChange = (e) => {
  //   const { checked } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     rememberMe: checked,
  //   }));
  // };

  const handleSignIn = async (event) => {
    event.preventDefault();
    // if (formData.rememberMe) {
    //   Cookies.set("rememberedEmail", formData.email, { expires: 7 }); // Store email in cookie for 7 days
    // } else {
    //   Cookies.remove("rememberedEmail");
    // }
    try {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setFormErrors({});
      setLoading(true);

      // Add ipAddress to the formData
      const formDataWithIp = {
        ...formData,
        // ipAddress,
      };

      // Assuming signIn action returns a promise that resolves with the user data
      const response = await dispatch(updatePassword(formDataWithIp));
      // const openNotification2 = (placement) => {
      //   api.error({
      //     message: `Notification`,
      //     description: response,
      //     placement,
      //   });
      // };
      // const openNotification3 = (placement) => {
      //   api.error({
      //     message: `Notification`,
      //     description:
      //       "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time.",
      //     placement,
      //   });
      // };

      console.log("Response from signIn:", response);

      if (response == "success") {
        // On successful login with jwtToken, navigate to the main dashboard
        // localStorage.setItem("IpAddress", ipAddress);
        setLoading(false);
        Swal.fire({
          background: "#ffffff",
          color: "#000000",
          title: "Success",
          text: "Reset password Successful",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        history.push("/login");
      } else if (response === "IP address not provided in payload") {
        setFormErrors({
          general:
            "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time. Try again later",
        }); // Set error message
        Swal.fire({
          background: "#ffffff",
          color: "#000000",
          title: "Error",
          text: "Error 406: Not Acceptable. We're sorry, but the server cannot fulfill your request at this time. Try again later",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // openNotification3("topRight");
      } else {
        // On successful Reset password, navigate to the main dashboard
        setFormErrors({ general: "Reset password Failed" }); // Set error message
        Swal.fire({
          background: "#ffffff",
          color: "#000000",
          title: "Error",
          text: "Invalid Reset Password Link",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // openNotification2("topRight");
      }
    } catch (error) {
      Swal.fire({
        background: "#ffffff",
        color: "#000000",
        title: "Error",
        text: "Reset password Failed",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      console.error("Reset password failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);

  // const handleCaptchaVerify = () => {
  //   setIsCaptchaVerified(true);
  // };

  // const { myToken } = theme.useToken();
  // const { isDark } = useTheme();
  // const { bgContainer, text } = myToken;

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{ marginTop: "50px" }}>
        <h4>Reset Password</h4>
        <Spin spinning={loading} tip="Resetting Password...">
          <StyledForm onSubmit={handleSignIn}>
            {formErrors.general && (
              <Alert
                message={formErrors.general}
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
            )}
            <label>New Password</label>
            <StyledInputNoDarkMode
              type="password"
              placeholder="Enter your new password"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <Alert message={formErrors.newpassword} type="error" showIcon />
            )}
            <label>Confirm Password</label>
            <StyledInputNoDarkMode
              type="password"
              placeholder="Confirm your new password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
            />
            {formErrors.confirmpassword && (
              <Alert
                message={formErrors.confirmpassword}
                type="error"
                showIcon
              />
            )}
            {/* <Checkbox
              onChange={handleRememberMeChange}
              checked={formData.rememberMe}
            >
              Remember me
            </Checkbox> */}
            {/* <ReCAPTCHA
              sitekey="6Lc308cZAAAAALRRhzvQnCeHrY2WoYmIaBb-6knX"
              onChange={handleCaptchaVerify}
            /> */}
            ,
            <MainButtonFull
              type="primary"
              htmlType="submit"
              disabled={!isCaptchaVerified}
              style={
                isCaptchaVerified
                  ? {}
                  : {
                      backgroundColor: "gray",
                      color: "white",
                      cursor: "not-allowed",
                    }
              }
            >
              Submit
            </MainButtonFull>
            {/* <Subtitle color="light">
              Don’t have an account?{" "}
              <BtnLink to="/sign-up">
                <span style={{ color: "#FBCB19", cursor: "pointer" }}>
                  Register here
                </span>
              </BtnLink>
            </Subtitle>
            <Subtitle color="light">
              Forgot password?{" "}
              <span style={{ color: "#FBCB19" }}>
                <BtnLink to="/forgot-password">Click me!</BtnLink>
              </span>
            </Subtitle> */}
          </StyledForm>
        </Spin>
      </div>
    </Context.Provider>
  );
};

export default ResetPasswordForm;

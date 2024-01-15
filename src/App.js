import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { Navbar, Footer } from "./components";
import Home from "./pages/HomePage/Home";
import Products from "./pages/Products/Products";
import ScrollToTop from "./components/ScrollToTop";
import { ConfigProvider } from "antd";
import LoginPage from "./pages/Login/loginPage";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword";
import CheckPasswordResetLink from "./pages/ForgotPassword/checkPasswordResetLink";
import SetNewPassword from "./pages/ForgotPassword/setNewPassword";
import PasswordResetConfirm from "./pages/ForgotPassword/passwordResetConfirm";
import SignUpPage from "./pages/SignUp/signUpPage";
import IndividualSignUp from "./pages/SignUp/individualSignUp";
import ContactPage from "./pages/Contact/contactPage";
import DashboardPage from "./pages/dashboard/dashboardPage";
import Disclaimer from "./pages/disclaimer/disclaimer";
import Consent from "./pages/consent/consent";
import Result from "./pages/result/result";
import ProfilePage from "./pages/profile/profilePage";
import MainDashboard from "./pages/dashboard/mainDashboard";
import BusinessSignUp from "./pages/SignUp/businessSignUp";
import BusinessSignUp2 from "./pages/SignUp/businessSignUp2";
import VerifyOtp from "./pages/otp/verifyOtp";
import EmailVerifiedConfirm from "./pages/otp/emailVerifiedConfirm";
import UpdateProfilePage from "./pages/profile/updateProfilePage";
import FaqPage from "./pages/faq/faqPage";

function App() {
  return (
    <Router>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#09C93A",
          },
          components: {
            Input: {
              colorPrimary: "#09C93A",
            },
          },
        }}
      >
        <GlobalStyles />
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/verify-otp" component={VerifyOtp} />
          <Route path="/email-confirm" component={EmailVerifiedConfirm} />
          <Route path="/check-email" component={CheckPasswordResetLink} />
          <Route path="/set-new-password" component={SetNewPassword} />
          <Route path="/password-confirm" component={PasswordResetConfirm} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/consent" component={Consent} />
          <Route path="/result" component={Result} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/profile" component={ProfilePage} />
          {/* <Route path="/update_profile" component={UpdateProfilePage} /> */}
          <Route path="/main-dashboard" component={MainDashboard} />
          <Route path="/products" component={Products} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/individual/sign-up/1" component={IndividualSignUp} />
          <Route path="/individual/sign-up/2" component={BusinessSignUp} />
          <Route path="/individual/sign-up/3" component={BusinessSignUp2} />
        </Switch>
        <Footer />
      </ConfigProvider>
    </Router>
  );
}

export default App;

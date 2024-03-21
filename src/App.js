import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import { Navbar, Footer } from "./components";
import Home from "./pages/HomePage/Home";
import Products from "./pages/Products/Products";
import ScrollToTop from "./components/ScrollToTop";
import { ConfigProvider } from "antd";
import LoginPage from "./pages/Login/loginPage";
import ResetPasswordPage from "./pages/ResetPassword/resetPasswordPage";
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
import Vehicle from "./pages/result/vehicle";
import Vehicle2 from "./pages/result/vehicle2";
import Business from "./pages/result/business";
import NotFoundPage from "./components/404/notFoundPage";
import LegitCar from "./pages/result/legitCar";
import Financial from "./pages/result/financial";
// import CookieConsent from "react-cookie-consent";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import LiveFaceScreen from "./pages/liveFace/liveFace";
import BusinessName from "./pages/result/businessName";
import AppLogout from "./components/AppLogOut";
import ProtectedRoute from "./protectedRoute";
import ReactGA from "react-ga4";

function App() {
  ReactGA.initialize("G-28ZN6L737E");
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {},
      },
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          flipButtons: false,
          equalWeightButtons: true,
        },
        preferencesModal: {
          layout: "box",
          // position: "left right",
          flipButtons: false,
          equalWeightButtons: true,
        },
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We respect your privacy",
              description:
                "Cookies are small pieces of data that websites store on your browser when you visit them. We use necessary cookies to ensure our website and services are able to function properly. Analytics and marketing cookies are optional, they help us to improve your experience and support our marketing Set preference by managing the cookles settings or accept both by selecting 'Accept'.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage Individual preferences",
            },
            preferencesModal: {
              title: "Manage cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Accept current selection",
              closeIconLabel: "Close modal",
              sections: [
                // {
                //   title: "Somebody said ... cookies?",
                //   description: "I want one!",
                // },
                {
                  title: "Strictly Necessary cookies",
                  description:
                    "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.",

                  //this field will generate a toggle linked to the 'necessary' category
                  linkedCategory: "necessary",
                },
                {
                  title: "Performance and Analytics",
                  description:
                    "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'Please feel free to <a href="/contact">contact us</a> for any inquiries regarding our cookie policy and your options.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

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
          <AppLogout>
            <Route path="/" exact component={Home} />
            <Route path="/reach/:CLICK_ID" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/verify-otp" component={VerifyOtp} />
            <Route path="/email-confirm" component={EmailVerifiedConfirm} />
            <Route path="/check-email" component={CheckPasswordResetLink} />
            <Route path="/set-new-password" component={SetNewPassword} />
            <Route path="/password-confirm" component={PasswordResetConfirm} />
            <Route path="/contact" component={ContactPage} />
            <ProtectedRoute path="/dashboard" component={DashboardPage} />
            <Route path="/disclaimer" component={Disclaimer} />
            <ProtectedRoute path="/consent" component={Consent} />
            <ProtectedRoute path="/liveFace" component={LiveFaceScreen} />
            <ProtectedRoute path="/result" component={Result} />
            <ProtectedRoute path="/vehicle" component={Vehicle} />
            <ProtectedRoute path="/vehicle2" component={Vehicle2} />
            <ProtectedRoute path="/legit-car" component={LegitCar} />
            <ProtectedRoute path="/businessName" component={BusinessName} />
            <ProtectedRoute path="/business" component={Business} />
            <ProtectedRoute path="/financial" component={Financial} />
            <Route path="/faq" component={FaqPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
            {/* <Route path="/update_profile" component={UpdateProfilePage} /> */}
            <ProtectedRoute path="/main-dashboard" component={MainDashboard} />
            <Route path="/products" component={Products} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/notFoundPage" component={NotFoundPage} />
            <Route path="/individual/sign-up/1" component={IndividualSignUp} />
            <Route path="/individual/sign-up/2" component={BusinessSignUp} />
            <Route path="/individual/sign-up/3" component={BusinessSignUp2} />
            <Route
              path="/reset-password/:email/:token"
              exact
              component={ResetPasswordPage}
            />
          </AppLogout>
        </Switch>

        <Footer />
        {/* <CookieConsent
          location="bottom"
          buttonText="Accept All Cookies"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          Our website uses cookies to enhance your browsing experience and
          provide personalized content and targeted advertising. <br />
          We may collect information about your visit to our website, including
          your IP address, browser type, device identifiers, and browsing
          behavior, to analyze traffic and improve our services.
          <br />
          By clicking "Accept All Cookies" or continuing to use our website, you
          agree to our use of cookies and the terms of our Privacy Policy.
        </CookieConsent> */}
      </ConfigProvider>
    </Router>
  );
}

export default App;

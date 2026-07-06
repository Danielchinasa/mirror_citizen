import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
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
import PremblyNinResult from "./pages/result/premblyNinResult";
import SearchExtensionResult from "./pages/result/searchExtensionResult";
import ProfilePage from "./pages/profile/profilePage";
import MainDashboard from "./pages/dashboard/mainDashboard";
import BusinessSignUp from "./pages/SignUp/businessSignUp";
import BusinessSignUp2 from "./pages/SignUp/businessSignUp2";
import VerifyOtp from "./pages/otp/verifyOtp";
import EmailVerifiedConfirm from "./pages/otp/emailVerifiedConfirm";
import UpdateProfilePage from "./pages/profile/updateProfilePage";
import FaqPage from "./pages/faq/faqPage";
import GhanaFaqPage from "./pages/faq/ghanaFaqPage";
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
import Sms from "./pages/sms/sms";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy";
import TermsOfService from "./pages/privacyPolicy/termsOfService";
import usePageTracking from "./hooks/usePageTracking";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentFailure from "./pages/Payment/PaymentFailure";
import PaymentCancel from "./pages/Payment/PaymentCancel";
import PaystackRedirect from "./pages/Payment/PaystackRedirect";
import NinVerificationPage from "./pages/NinLanding/NinVerificationPage";
import PhoneVerificationPage from "./pages/PhoneLanding/PhoneVerificationPage";
import BusinessVerificationPage from "./pages/BusinessLanding/BusinessVerificationPage";
import VerificationLoginPage from "./pages/VerificationLogin/VerificationLoginPage";
import FinancialVerificationPage from "./pages/FinancialLanding/FinancialVerificationPage";
import VehicleVerificationPage from "./pages/VehicleLanding/VehicleVerificationPage";
import VerifyPage from "./pages/Verify/VerifyPage";
import ApiDocsPage from "./pages/apiDocs/apiDocsPage";

//theming
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  ReactGA.initialize("G-DDKNJYDMQ7");
  usePageTracking();
  useEffect(() => {
    CookieConsent.run({
      page_scripts: true,
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {
          autoClear: {
            cookies: [
              {
                name: /^_ga/, // regex: match all cookies starting with '_ga'
              },
              {
                name: "_gid", // string: exact cookie name
              },
            ],
          },
          services: {
            ga: {
              label: "Google Analytics",
              onAccept: () => {},
              onReject: () => {},
            },
            youtube: {
              label: "Youtube Embed",
              onAccept: () => {},
              onReject: () => {},
            },
          },
        },
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
      onFirstConsent: ({ cookie }) => {
        console.log("onFirstConsent fired", cookie);
      },

      onConsent: ({ cookie }) => {
        console.log("onConsent fired!", cookie);
      },

      onChange: ({ changedCategories, changedServices }) => {
        console.log("onChange fired!", changedCategories, changedServices);
      },

      onModalReady: ({ modalName }) => {
        console.log("ready:", modalName);
      },

      onModalShow: ({ modalName }) => {
        console.log("visible:", modalName);
      },

      onModalHide: ({ modalName }) => {
        console.log("hidden:", modalName);
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
      {/* <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FED001",
          },
          components: {
            Input: {
              colorPrimary: "#FED001",
            },
          },
        }}
      > */}
      <ThemeProvider>
        <GlobalStyles />
        <ScrollToTop />
        <AppContent />

        {/* </ConfigProvider> */}
      </ThemeProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isNinLanding = location.pathname === "/nin-verification";
  const isPhoneLanding = location.pathname === "/phone-number-verification";
  const isBusinessLanding = location.pathname === "/business-verification";
  const isFinancialLanding = location.pathname === "/credit-profile";
  const isVehicleLanding = location.pathname === "/vehicle-verification";
  const isVerificationLogin = location.pathname === "/verification-login";
  const isLandingPage =
    isNinLanding ||
    isPhoneLanding ||
    isBusinessLanding ||
    isFinancialLanding ||
    isVehicleLanding ||
    isVerificationLogin;

  return (
    <>
      {!isLandingPage && <Navbar />}

      <Switch>
        <Route path="/nin-verification" exact component={NinVerificationPage} />
        <Route
          path="/phone-number-verification"
          exact
          component={PhoneVerificationPage}
        />
        <Route
          path="/business-verification"
          exact
          component={BusinessVerificationPage}
        />
        <Route
          path="/credit-profile"
          exact
          component={FinancialVerificationPage}
        />
        <Route
          path="/vehicle-verification"
          exact
          component={VehicleVerificationPage}
        />
        <Route
          path="/verification-login"
          exact
          component={VerificationLoginPage}
        />
        <AppLogout>
          <Route
            path="/verify/:type"
            render={(props) => {
              const type = props.match.params.type;
              return (
                <ProtectedRoute
                  path="/verify/:type"
                  component={VerifyPage}
                  redirectTo={`/verification-login?redirect=/verify/${type}`}
                />
              );
            }}
          />
          <Route path="/" exact component={Home} />
          <Route path="/sms" exact component={Sms} />
          <Route path="/privacy_policy" exact component={PrivacyPolicy} />
          <Route path="/terms_of_service" exact component={TermsOfService} />
          <Route path="/payment/success" exact component={PaymentSuccess} />
          <Route path="/payment/failure" exact component={PaymentFailure} />
          <Route path="/payment/cancel" exact component={PaymentCancel} />
          <Route
            path="/payment/paystack-redirect"
            exact
            component={PaystackRedirect}
          />
          <Route path="/reach/:CLICK_ID" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/verify-otp" component={VerifyOtp} />
          <Route path="/email-confirm" component={EmailVerifiedConfirm} />
          <Route path="/check-email" component={CheckPasswordResetLink} />
          <ProtectedRoute path="/set-new-password" component={SetNewPassword} />
          <Route path="/password-confirm" component={PasswordResetConfirm} />
          <Route path="/contact" component={ContactPage} />
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <Route path="/disclaimer" component={Disclaimer} />
          <ProtectedRoute path="/consent" component={Consent} />
          <ProtectedRoute path="/liveness-check" component={LiveFaceScreen} />
          <ProtectedRoute
            path="/identity-verification-result"
            component={Result}
          />
          <ProtectedRoute
            path="/nin-verification-result"
            component={PremblyNinResult}
          />
          <ProtectedRoute
            path="/comprehensive-search-result"
            component={SearchExtensionResult}
          />
          <ProtectedRoute path="/vehicle-profile-result" component={Vehicle} />
          <ProtectedRoute
            path="/vehicle-registration-result"
            component={Vehicle2}
          />
          <ProtectedRoute
            path="/vehicle-authentication-result"
            component={LegitCar}
          />
          <ProtectedRoute
            path="/business-name-result"
            component={BusinessName}
          />
          <ProtectedRoute
            path="/business-profile-result"
            component={Business}
          />
          <ProtectedRoute
            path="/financial-profile-result"
            component={Financial}
          />
          <Route path="/faq" component={FaqPage} />
          <Route path="/faq-ghana" component={GhanaFaqPage} />
          <Route path="/api-docs" component={ApiDocsPage} />
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

      {!isLandingPage && <Footer />}
    </>
  );
}

export default App;

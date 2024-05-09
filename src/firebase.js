import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBExfy-yXA7OxLaC7HrbzmTzw8gd1j1E-w",
  authDomain: "ecitizen-23c16.firebaseapp.com",
  projectId: "ecitizen-23c16",
  storageBucket: "ecitizen-23c16.appspot.com",
  messagingSenderId: "504541434686",
  appId: "1:504541434686:web:d094029ccfbf06f192926f",
  measurementId: "G-E4J0093Z41",
};

// initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const Sendrequest = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, {
        vapidKey: `BM_Ct83FGrfjBlQMsG_Ekfe5kwl2bs-hzsRhvI28KQxOuVCIlwiLP2PanQWCh7AV9OKKsYgK5R1ACrF4PvCxyRE`,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
            localStorage.setItem("clientToken", currentToken);
          } else {
            console.log("Failed to generate the registration token.");
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token.",
            err
          );
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

Sendrequest();

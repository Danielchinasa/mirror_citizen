// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyAgNOFnJF3VkASIOvScE8Gn3XWUX1_iSLk",

  authDomain: "e-citizen-web.firebaseapp.com",

  projectId: "e-citizen-web",

  storageBucket: "e-citizen-web.appspot.com",

  messagingSenderId: "222242296509",

  appId: "1:222242296509:web:2dc78ecbcc3b3c91355dd4",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize the handling of background messages
});

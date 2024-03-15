import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Sendrequest, onMessageListener } from "./firebase";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  const notify = () => {
    new Audio("./notification/sound.mp3").play(); // Change "/path/to/sound.mp3" to the path of your sound file
    Swal.fire({
      title: notification.title,
      text: notification.body,
      icon: "info",
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#0DC939",
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    if (notification.title) {
      notify();
    }
  }, [notification]);

  useEffect(() => {
    Sendrequest();
    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return null; // No need for the Toaster component
};

export default Notification;

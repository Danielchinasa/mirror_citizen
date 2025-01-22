import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Sendrequest, onMessageListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./redux/actions";
import { theme } from "antd";
import { useTheme } from "./components/ThemeProvider";
const { useToken } = theme;

const Notification = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const userDetails = useSelector((state) => state.userDetails);
  const userToken2 = userDetails?.jwtToken || "";
  const [notification, setNotification] = useState({ title: "", body: "" });

  const { token } = useToken();
  const { isDark } = useTheme();
  const { bgContainer, text } = token;

  const notify = () => {
    new Audio("./notification/sound.mp3").play(); // Change "/path/to/sound.mp3" to the path of your sound file
    notification.title == "A refund has been initiated to your wallet"
      ? Swal.fire({
          background: bgContainer,
          color: text,
          title: notification.title,
          text: notification.body,
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            dispatch(fetchUserProfile(userToken));
            // window.location.reload();
          }
        })
      : Swal.fire({
          background: bgContainer,
          color: text,
          title: notification.title,
          text: notification.body,
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            // dispatch(fetchUserProfile(userToken));
            // window.location.reload();
          }
        });
  };

  // const notifyRefund = () => {
  //   new Audio("./notification/sound.mp3").play(); // Change "/path/to/sound.mp3" to the path of your sound file
  //   Swal.fire({
  // background: bgContainer,
  // color: text,
  //     title: notification.title,
  //     text: notification.body,
  //     icon: "info",
  //     showConfirmButton: true,
  //     confirmButtonText: "OK",
  //     confirmButtonColor: "#0DC939",
  //   }).then((result) => {
  //     /* Read more about handling dismissals below */
  //     if (result.isConfirmed) {
  //       window.location.reload();
  //     }
  //   });
  // };

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

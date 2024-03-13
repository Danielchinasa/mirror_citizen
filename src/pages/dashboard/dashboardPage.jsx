import {
  Checkbox,
  Col,
  DatePicker,
  message,
  Row,
  Button,
  Upload,
  Avatar,
  List,
  Divider,
  Space,
  Radio,
  Form,
  Tooltip,
  notification,
  Modal,
  Flex,
  Tag,
  Alert,
  Spin,
} from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Heading,
  Heading4,
  Heading6,
  Img,
  InfoSec,
  MainButtonFull,
  OutlineButtonFull,
  StyledInput,
  StyledLabel,
  DisabledButtonFull,
  StyledForm,
  StyledTextArea,
} from "../../globalStyles";
import flutterwave from "../../images/flutterwave-logos-idVM8GW1LQ.png";

import {
  InfoCircleOutlined,
  CameraOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import banner from "../../images/banner.png";
import tick from "../../images/tick.png";
import clearvin from "../../images/clearvin.png";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationRequest, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import Swal from "sweetalert2";

/* global Reach */

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const dateFormat = "DD/MM/YYYY";

const DashboardPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [base64WithoutPrefix, setBase64WithoutPrefix] = useState("");
  const [isClearVinOn, setIsClearVinOn] = useState(false);
  const [isBasicOn, setIsBasicOn] = useState(false);
  const [isVehicleOn, setIsVehicleOn] = useState(false);
  const [isFinancialOn, setIsFinancialOn] = useState(false);

  const [formattedTotalveri, setFormattedTotalveri] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [ninFee, setNinFee] = useState("");
  const [ninServiceFee, setNinServiceFee] = useState("");
  const [ninUsdServiceFee, setUsdNinServiceFee] = useState("");
  const [ninVatFee, setNinVatFee] = useState("");
  const [ninUsdFee, setNinUsdFee] = useState("");
  const [ninUsdVatFee, setNinUsdVatFee] = useState("");
  const [ninProcessingFee, setNinProcessingFee] = useState("");
  const [faceFee, setFaceFee] = useState("");
  const [faceServiceFee, setfaceServiceFee] = useState("");
  const [faceUsdServiceFee, setfaceUsdServiceFee] = useState("");
  const [faceVatFee, setFaceVatFee] = useState("");
  const [faceUsdFee, setFaceUsdFee] = useState("");
  const [faceUsdVatFee, setFaceUsdVatFee] = useState("");
  const [faceProcessingFee, setFaceProcessingFee] = useState("");
  const [vehicleFee, setVehicleFee] = useState("");
  const [vehicleServiceFee, setvehicleServiceFee] = useState("");
  const [vehicleUsdServiceFee, setvehicleUsdServiceFee] = useState("");
  const [vehicleVatFee, setVehicleVatFee] = useState("");
  const [vehicleUsdFee, setVehicleUsdFee] = useState("");
  const [vehicleUsdVatFee, setVehicleUsdVatFee] = useState("");
  const [vehicleProcessingFee, setVehicleProcessingFee] = useState("");
  const [vinVehicleFee, setVinVehicleFee] = useState("");
  const [vinVehicleServiceFee, setvinVehicleServiceFee] = useState("");
  const [vinVehicleUsdServiceFee, setvinVehicleUsdServiceFee] = useState("");
  const [vinVehicleVatFee, setVinVehicleVatFee] = useState("");
  const [vinVehicleUsdFee, setVinVehicleUsdFee] = useState("");
  const [vinVehicleUsdVatFee, setVinVehicleUsdVatFee] = useState("");
  const [vinVehicleProcessingFee, setVinVehicleProcessingFee] = useState("");
  const [businessFee, setBusinessFee] = useState("");
  const [businessServiceFee, setbusinessServiceFee] = useState("");
  const [businessUsdServiceFee, setbusinessUsdServiceFee] = useState("");
  const [businessVatFee, setBusinessVatFee] = useState("");
  const [businessUsdFee, setBusinessUsdFee] = useState("");
  const [businessUsdVatFee, setBusinessUsdVatFee] = useState("");
  const [businessProcessingFee, setBusinessProcessingFee] = useState("");

  const [businessNameFee, setBusinessNameFee] = useState("");
  const [businessNameServiceFee, setbusinessNameServiceFee] = useState("");
  const [businessNameUsdServiceFee, setbusinessNameUsdServiceFee] =
    useState("");
  const [businessNameVatFee, setBusinessNameVatFee] = useState("");
  const [businessNameUsdFee, setBusinessNameUsdFee] = useState("");
  const [businessNameUsdVatFee, setBusinessNameUsdVatFee] = useState("");
  const [businessNameProcessingFee, setBusinessNameProcessingFee] =
    useState("");

  const [financialFee, setFinancialFee] = useState("");
  const [financialServiceFee, setfinancialServiceFee] = useState("");
  const [financialUsdServiceFee, setfinancialUsdServiceFee] = useState("");
  const [financialVatFee, setFinancialVatFee] = useState("");
  const [financialUsdFee, setFinancialUsdFee] = useState("");
  const [financialUsdVatFee, setFinancialUsdVatFee] = useState("");
  const [financialProcessingFee, setFinancialProcessingFee] = useState("");
  const [currencyCheck, setCurrencyCheck] = useState("NGN");
  const [flutterWaveCurrency, setFlutterWaveCurrency] = useState("NGN");
  const [value, setValue] = useState();
  const [stolenCheckFee, setStolenCheckFee] = useState("");
  const [formData, setFormData] = useState({
    nin: "",
    phone: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    rc: "",
    business_name: "",
    bvn: "",
    vin: "",
    stolencheck: "",
    license_number: "",
    face: "",
    finger: "",
  });

  const [ninFilled, setNinFilled] = useState(false);
  const [faceFilled, setFaceFilled] = useState(false);
  const [rcFilled, setRcFilled] = useState(false);
  const [businessNameFilled, setBusinessNameFilled] = useState(false);
  const [bvnFilled, setBvnFilled] = useState(false);
  const [vinFilled, setVinFilled] = useState(false);
  const [licenseNumberFilled, setLicenseNumberFilled] = useState(false);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalServiceCost, setTotalServiceCost] = useState(0);
  const [newTotalServiceCost, setNewTotalServiceCost] = useState(0);
  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };
  const handleInputChange = (name, value) => {
    // const hadPreviousValue = formData[name].trim() !== "";
    const hadPreviousValue =
      typeof formData[name] === "string" && formData[name].trim() !== "";
    if (name === "nin") {
      if (!hadPreviousValue && value.trim() !== "") {
        setNinFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + ninVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + ninFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + ninUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setNinFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - ninFee);
        setTotalServiceCost(
          (prevTotalFees) => prevTotalFees - (ninServiceFee + ninProcessingFee)
        );
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - ninUsdFee
        );
      }
    }
    if (name === "face") {
      if (!hadPreviousValue && value.trim() !== "") {
        setFaceFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + faceVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + faceFee);
      } else if (hadPreviousValue && value.trim() === "") {
        setFaceFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - faceFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + faceUsdFee
        );
        setTotalServiceCost(
          (prevTotalFees) =>
            prevTotalFees - (faceServiceFee + faceProcessingFee)
        );
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - faceUsdFee
        );
      }
    }
    if (name === "rc") {
      if (!hadPreviousValue && value.trim() !== "") {
        setRcFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + businessVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + businessFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + businessUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setRcFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - businessVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - businessFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - businessUsdFee
        );
      }
    }
    if (name === "business_name") {
      if (!hadPreviousValue && value.trim() !== "") {
        setBusinessNameFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + businessNameVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + businessNameFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + businessNameUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setBusinessNameFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - businessNameVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - businessNameFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - businessNameUsdFee
        );
      }
    }
    if (name === "bvn") {
      if (!hadPreviousValue && value.trim() !== "") {
        setBvnFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + financialVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + financialFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + financialUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setBvnFilled(false);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - financialFee);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - financialVatFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - financialUsdFee
        );
      }
    }
    if (name === "vin") {
      if (!hadPreviousValue && value.trim() !== "") {
        setVinFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + vinVehicleVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + vinVehicleFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + vinVehicleUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setVinFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - vinVehicleVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - vinVehicleFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - vinVehicleUsdFee
        );
      }
    }
    if (name === "license_number") {
      if (!hadPreviousValue && value.trim() !== "") {
        setLicenseNumberFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + vehicleVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + vehicleFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + vehicleUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setLicenseNumberFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - vehicleVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - vehicleFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - vehicleUsdFee
        );
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    handleInputChange("stolencheck", isChecked ? true : false); // Set stolencheck to true when checked, false otherwise
  };
  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        const response = await axios.get(
          `https://e-citizen.ng:8443/api/v2/transaction/services-prices?ipAddress=${ipAddress}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`, // Include the bearer token
            },
          }
        );
        console.log("Service Fees");
        console.log(response.data.data[0].price);

        setExchangeRate(response.data.rate);
        setNinFee(response.data.data[0].price);
        setNinServiceFee(response.data.data[0].serviceFee);
        setUsdNinServiceFee(response.data.data[0].serviceFee2);
        setNinVatFee(response.data.data[0].VAT);
        setNinUsdFee(response.data.data[0].price2);
        setNinUsdVatFee(response.data.data[0].VAT2);
        setNinProcessingFee(response.data.data[0].processingFee);
        setFaceFee(response.data.data[1].price);
        setfaceServiceFee(response.data.data[1].serviceFee);
        setfaceUsdServiceFee(response.data.data[1].serviceFee2);
        setFaceVatFee(response.data.data[1].VAT);
        setFaceUsdFee(response.data.data[1].price2);
        setFaceUsdVatFee(response.data.data[1].VAT2);
        setFaceProcessingFee(response.data.data[1].processingFee);
        setBusinessFee(response.data.data[2].price);
        setbusinessServiceFee(response.data.data[2].serviceFee);
        setbusinessUsdServiceFee(response.data.data[2].serviceFee2);
        setBusinessVatFee(response.data.data[2].VAT);
        setBusinessUsdFee(response.data.data[2].price2);
        setBusinessUsdVatFee(response.data.data[2].VAT2);
        setBusinessProcessingFee(response.data.data[2].processingFee);

        setBusinessNameFee(response.data.data[3].price);
        setbusinessNameServiceFee(response.data.data[3].serviceFee);
        setbusinessNameUsdServiceFee(response.data.data[3].serviceFee2);
        setBusinessNameVatFee(response.data.data[3].VAT);
        setBusinessNameUsdFee(response.data.data[3].price2);
        setBusinessNameUsdVatFee(response.data.data[3].VAT2);
        setBusinessNameProcessingFee(response.data.data[3].processingFee);

        setFinancialFee(response.data.data[4].price);
        setfinancialServiceFee(response.data.data[4].serviceFee);
        setfinancialUsdServiceFee(response.data.data[4].serviceFee2);
        setFinancialVatFee(response.data.data[4].VAT);
        setFinancialUsdFee(response.data.data[4].price2);
        setFinancialUsdVatFee(response.data.data[4].VAT2);
        setFinancialProcessingFee(response.data.data[4].processingFee);
        setVinVehicleFee(response.data.data[5].price);
        setvinVehicleServiceFee(response.data.data[5].serviceFee);
        setvinVehicleUsdServiceFee(response.data.data[5].serviceFee2);
        setVinVehicleVatFee(response.data.data[5].VAT);
        setVinVehicleUsdFee(response.data.data[5].price2);
        setVinVehicleUsdVatFee(response.data.data[5].VAT2);
        setVinVehicleProcessingFee(response.data.data[5].processingFee);
        setVehicleFee(response.data.data[6].price);
        setvehicleServiceFee(response.data.data[6].serviceFee);
        setvehicleUsdServiceFee(response.data.data[6].serviceFee2);
        setVehicleVatFee(response.data.data[6].VAT);
        setVehicleUsdFee(response.data.data[6].price2);
        setVehicleUsdVatFee(response.data.data[6].VAT2);
        setVehicleProcessingFee(response.data.data[6].processingFee);
        setCurrencyCheck(response.data.data[0].currency);
        setStolenCheckFee(response.data.data[7].price);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setNinFee(null);
      }
    };

    fetchServiceFee();
  }, []);

  const handleDateChange = (date, dateString) => {
    handleInputChange("dateOfBirth", dateString);
  };

  const user = useSelector((state) => state.user);
  const userDetails = useSelector((state) => state.userDetails);
  const userToken = user?.jwtToken || "";
  const userEmail = user?.email || "";
  const userName = user?.firstName || "";
  const userPhone = user?.phone || "";
  const userNin = user?.nin || "";
  const userCurrency = userDetails?.currency || "";

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // Dispatch the sendVerificationRequest action with the form data
    setLoading(true);
    try {
      const response = await dispatch(
        sendVerificationRequest(formData, userToken)
      );

      console.log("response");
      console.log(response);
      if (
        (response.basic &&
          response.basic.message &&
          response.basic.message === "NO_HIT") ||
        (response.business && response.business.message === "NO_HIT")
      ) {
        // Display Ant Design notification when NO_HIT
        // notification.error({
        //   message: "Input value not found",
        //   description: "Please check your input value and try again.",
        // });
        Swal.fire({
          title: "Error",
          text: "Input value not found",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/notFoundPage");
      }
      // else if (
      //   response.basic &&
      //   response.basic.message &&
      //   response.basic.message === "Awaiting Consent"
      // ) {
      //   localStorage.setItem(
      //     "verificationRequestId",
      //     response.basic.data.requestId
      //   );
      //   // Handle further actions if needed
      //   history.push("/main-dashboard");
      // }
      else if (
        response.basic &&
        response.basic.success &&
        response.basic.success === true
      ) {
        localStorage.setItem(
          "verificationRequestId",
          response.basic.data.requestId
        );
        Swal.fire({
          title: "Success",
          text: response.basic.message,
          icon: "info",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // notification.info({
        //   message: "Message",
        //   description: response.basic.message,
        //   duration: 20, // Duration in seconds
        // });
        // Handle further actions if needed
        history.push("/main-dashboard");
      } else if (
        response &&
        response.basic &&
        typeof response.basic.success === "boolean" &&
        response.basic.success === false
      ) {
        Swal.fire({
          title: "Error",
          text: "Oops! We encountered an issue while processing your request. It seems that the data we expected to find is missing. Please try again later",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        history.push("/dashboard");
        // notification.error({
        //   message: "Error",
        //   description:
        //     "Oops! We encountered an issue while processing your request. It seems that the data we expected to find is missing. Please try again later",
        //   duration: 20, // Duration in seconds
        // });
        // Handle further actions if needed
        // return;
      }
      // else if (
      //   response.business &&
      //   response.business.message === "Business API call successful"
      // ) {
      //   // localStorage.setItem(
      //   //   "verificationRequestId",
      //   //   response.business.data.requestId
      //   // );
      //   // Handle further actions if needed
      //   history.push("/main-dashboard");
      // }
      else if (response.business && response.business.success === false) {
        Swal.fire({
          title: "Error",
          text: "An error occurred with the business verification. Please try again later.",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        // notification.info({
        //   message: "Message",
        //   description: "Successful",
        //   duration: 5, // Duration in seconds
        // });
        history.push("/dashboard");
      } else if (response.business && response.business.success === true) {
        Swal.fire({
          title: "Success",
          text: "Your busness verification request was successful.",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        // notification.info({
        //   message: "Message",
        //   description: "Successful",
        //   duration: 5, // Duration in seconds
        // });
        history.push("/main-dashboard");
      } else if (response.vehicle && response.vehicle.success === true) {
        Swal.fire({
          title: "Success",
          text: "Your vehicle verification request was successful.",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // notification.info({
        //   message: "Message",
        //   description: "Successful",
        //   duration: 5, // Duration in seconds
        // });
        history.push("/main-dashboard");
      } else if (response.vehicle && response.vehicle.success === false) {
        Swal.fire({
          title: "Error",
          text: "An error occurred with the Vehicle verification. Please try again later.",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        history.push("/dashboard");
        // notification.error({
        //   message: "Error",
        //   description:
        //     "An error occurred with the Vehicle verification. Please try again later.",
        //   duration: 20, // Duration in seconds
        // });
        // return;
      }
      // else if (
      //   response.vehicle &&
      //   response.vehicle.message &&
      //   response.vehicle.message === "successful"
      // ) {
      //   localStorage.setItem(
      //     "verificationRequestId",
      //     response.vehicle.data.requestId
      //   );
      //   // Handle further actions if needed
      //   history.push("/main-dashboard");
      // }
      // else if (
      //   response.financial &&
      //   response.financial.message === "Financial API call successful"
      // ) {
      //   history.push("/main-dashboard");
      // }
      else if (response.financial && response.financial.success === true) {
        Swal.fire({
          title: "Success",
          text: response.financial.message,
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/main-dashboard");
      } else if (response.financial && response.financial.success === false) {
        Swal.fire({
          title: "Error",
          text: "An error occurred with the Financial verification. Please try again later.",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        history.push("/dashboard");
        // notification.error({
        //   message: "Message",
        //   description:
        //     "An error occurred with the Financial verification. Please try again later.",
        //   duration: 20, // Duration in seconds
        // });
        // return;
      } else {
        Swal.fire({
          title: "Error",
          text: "An unexpected server error occurred. Please attempt your action again",
          icon: "question",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        // notification.error({
        //   message: "Error",
        //   description:
        //     "An unexpected server error occurred. Please attempt your action again",
        //   duration: 20,
        // });
      }
    } catch (error) {
      // Handle errors if needed
      setLoading(false);
      console.error("Error sending verification", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected server error occurred. Please attempt your action again",
        icon: "question",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = () => {
    // Handle the modal OK button click
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    // Handle the modal cancel or close button click
    setIsModalVisible(false);
  };

  const data = [
    {
      title: "Choose one or more profiles to verify",
    },
    {
      title: "Input the information you want to search",
    },
    {
      title: "Make a payment",
    },
    {
      title: "View results",
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState("basic"); // Default selected form
  const [selectedForm, setSelectedForm] = useState("none"); // Default selected form

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxCheckedConfirm, setCheckboxCheckedConfirm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkStolen, setCheckStolen] = useState(false);

  const onChangePayment = (e) => {
    setCheckboxChecked(e.target.checked);
  };
  const onChange = (e) => {
    e.preventDefault();

    setIsChecked(e.target.checked);
  };
  useEffect(() => {
    if (isChecked) {
      console.log("isChecked");

      setCheckStolen(true);
      console.log(checkStolen);
    } else {
      console.log("isCheckedNOT");
      console.log(checkStolen);
      setCheckStolen(false);
    }
  }, [isChecked]);
  // const onChange2 = (e) => {
  //   setCheckboxCheckedConfirm(e.target.checked);
  // };

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  const tooltipContentBasic =
    "A Basic Identity Profile gives the distinct characteristics, attributes and information that uniquely identifies an individual. Searchable parameters are NIN, demographics, face, fingerprint, and phone number.";
  const tooltipContentBusiness =
    "A business profile is a set of information and data that are used to confirm and validate the identity of a business or organization. Searchable parameters are registration number(RC), and business name.";
  const tooltipContentFinancial =
    "A financial credit profile is a report card that tells how responsible you are with borrowing and repaying money. It helps lenders decide if they can trust you with a loan or credit. Search parameter is bank verification number (BVN).";

  const tooltipContentVehicle =
    "VIN: Choose this option to search for a vehicle's original information using a VIN. This includes the option of the stolen status of the vehicle. Registration: Choose this option to search for a vehicle's registration information in Nigeria using the vehicle registration number (license plate)";
  const [serviceFee, setServiceFee] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [rawServiceFee, setRawServiceFee] = useState(0);
  const [rawUsdFee, setRawUsdFee] = useState(0);

  const [vat, setVat] = useState(0);
  const [profile, setProfile] = useState("");
  const [usdFee, setUsdFee] = useState("");

  const updateServiceFee = (profile) => {
    // Set the service fee based on the selected profile
    const formDataFees = {
      nin: ninFee,
      vin: vinVehicleFee,
      license_number: vehicleFee,
      rc: businessFee,
      business_name: businessFee,
      bvn: financialFee,
      face: faceFee,
    };

    // Calculate total veri based on form data
    let calculatedTotalveri = 0;

    // Update totalveri state with the calculated value
    setTotalveri(calculatedTotalveri);
    if (profile === "nin") {
      localStorage.setItem("profile", profile);
      setServiceFee(ninServiceFee); // Set the service fee for NIN
      setProcessingFee(ninProcessingFee);
      setProfile("nin");
      setUsdFee(ninUsdFee);
      setVat(ninVatFee);
      setRawServiceFee(ninFee);
    } else if (profile === "face") {
      localStorage.setItem("profile", profile);
      setServiceFee(faceServiceFee);
      setProcessingFee(faceProcessingFee);
      setProfile("face");

      setUsdFee(faceUsdFee);
      setVat(faceVatFee);
      setRawServiceFee(faceFee);
    } else if (profile === "fingerprint") {
      localStorage.setItem("profile", profile);
      // setServiceFee(200); // Set the service fee for Phone
    } else if (profile === "rc") {
      localStorage.setItem("profile", profile);
      setServiceFee(businessServiceFee); // Set the service fee for Phone
      setProcessingFee(businessProcessingFee);
      setProfile("rc");
      setUsdFee(businessUsdFee);
      setVat(businessVatFee);
      setRawServiceFee(businessFee);
    } else if (profile === "business_name") {
      localStorage.setItem("profile", profile);
      setServiceFee(businessServiceFee); // Set the service fee for Phone
      setProcessingFee(businessProcessingFee);
      setProfile("business_name");
      setUsdFee(businessUsdFee);
      setVat(businessVatFee);
      setRawServiceFee(businessFee);
    } else if (profile === "bvn") {
      localStorage.setItem("profile", profile);
      setServiceFee(financialServiceFee); // Set the service fee for Phone
      setProcessingFee(financialProcessingFee);
      setProfile("bvn");
      setUsdFee(financialUsdFee);
      setVat(financialVatFee);
      setRawServiceFee(financialFee);
    } else if (profile === "vin") {
      localStorage.setItem("profile", profile);
      setServiceFee(vinVehicleServiceFee); // Set the service fee for Phone
      setProcessingFee(vinVehicleProcessingFee);
      setProfile("vin");
      setUsdFee(vinVehicleUsdFee);
      setVat(vinVehicleVatFee);
      setRawServiceFee(vinVehicleFee);
    } else if (profile === "license_number") {
      localStorage.setItem("profile", profile);
      setServiceFee(vehicleServiceFee); // Set the service fee for Phone
      setProcessingFee(vehicleProcessingFee);
      setProfile("license_number");
      setUsdFee(vehicleUsdFee);
      setVat(vehicleVatFee);
      setRawServiceFee(vehicleFee);
    } else {
      setServiceFee(0); // Set a default value or handle other profiles
    }
    // const calculatedVat = serviceFee * 0.075;
    // setVat(calculatedVat);
  };

  function RadioComponent({ profile, usdFee }) {
    return (
      <Radio value={2}>
        {profile === "nin" && `$ ${usdFee}`}
        {profile === "face" && `$ ${usdFee}`}
        {profile === "rc" && `$ ${usdFee}`}
        {profile === "business_name" && `$ ${usdFee}`}
        {profile === "bvn" && `$ ${usdFee}`}
        {profile === "vin" && `$ ${usdFee}`}
      </Radio>
    );
  }
  useEffect(() => {
    updateServiceFee(selectedForm);
  }, [selectedForm]);
  useEffect(() => {
    // Calculate VAT as 10% of the service fee
    const calculatedVat = serviceFee * 0.075;
    // setVat(calculatedVat);
  }, [serviceFee]);

  const [liveFaceNin, setLiveFaceNin] = useState("");
  const [liveFaceFace, setLiveFaceFace] = useState("");
  const [isLiveFaceNinValid, setIsLiveFaceNinValid] = useState(true);
  const [makePaymentClicked, setMakePaymentClicked] = useState(false);
  const [danfee, setDanfee] = useState(0);

  const handleLiveFaceNinChange = (e) => {
    const value = e.target.value;

    // Validate that it contains only numbers and is 11 digits
    const isValid = /^\d{11}$/.test(value);

    setLiveFaceNin(value);
    setIsLiveFaceNinValid(isValid);
  };
  const handleLiveFaceFaceChange = (e) => {
    const value = e.target.value;

    // Validate that it contains only numbers and is 11 digits
    // const isValid = /^\d{11}$/.test(value);

    setLiveFaceFace(value);
    // setIsLiveFaceNinValid(isValid);
  };

  const [base64Image, setBase64Image] = useState(null);

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const deduction = totalServiceCost * (1.4 / 100);

  const ServiceCostt = totalServiceCost - deduction;
  const [outsideNgWithNiara, setOutsideNgWithNiara] = useState(false);
  const [outsideNgWithNiaraPrice, setOutsideNgWithNiaraPrice] = useState(0);
  const currencyOnChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);

    if (e.target.value == 2) {
      setFlutterWaveCurrency("USD");
      setOutsideNgWithNiara(false);
    } else if (e.target.value == 1) {
      // setCurrencyCheck("NGN");
      setFlutterWaveCurrency("NGN");
      setOutsideNgWithNiara(true);
      // console.log("totalveriNiara:", totalveriNiara);
      setOutsideNgWithNiaraPrice(totalveriNiara);
      // setTotalServiceCost(totalveriNiara);
      // console.log("totalServiceCost after update:", totalServiceCost);
    }
  };

  const config = {
    //live key
    public_key: "FLWPUBK-6f8762e460e0a984f90b300be5d7a343-X",
    //test key
    // public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}",
    amount:
      currencyCheck == "USD"
        ? outsideNgWithNiara == true
          ? `${outsideNgWithNiaraPrice}`
          : `${totalServiceCost}`
        : `${totalServiceCost}`,
    currency: flutterWaveCurrency,
    payment_options:
      "card,mobilemoney,ussd, account, banktransfer, barter, nqr",
    customer: {
      email: userEmail,
      phone_number: userPhone,
      // name: userName,
    },

    customizations: {
      title: `${selectedForm} Verification Payment`,
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFace, setModalVisibleFace] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalveri, setTotalveri] = useState(0);
  const [totalveriNiara, setTotalveriNiara] = useState(0);

  const showModal = () => {
    console.log("currencyCheck");
    console.log(currencyCheck);
    setModalVisible(true);
  };
  const showModalFace = () => {
    setModalVisibleFace(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleCancelFace = () => {
    setModalVisibleFace(false);
  };

  useEffect(() => {
    console.log("Total Veri Amount next:", totalveri);

    // Check if checkStolen is true
    if (checkStolen === true) {
      // Add 4000 to totalServiceCost if checkStolen is true
      setTotalServiceCost(
        (prevTotalServiceCost) => prevTotalServiceCost + 4000
      );
    }
  }, [checkStolen]);

  const handlePaymentMethod = async () => {
    if (selectedValue !== null) {
      // Log the selected payment method
      const userBalance = userDetails?.walletBalance || 0;

      if (selectedValue === 1) {
        // console.log("Payment from Wallet");
        setLoading(true);
        handleCancel();

        const apiUrl =
          "https://e-citizen.ng:8443/api/v2/transaction/wallet-payment";

        const requestBody = {
          userNIN: userNin,
          transactionID: "EA11697986831911",
          // amount: `${danfee.toFixed(2)}`,
          // amount:
          //   currencyCheck == "USD"
          //     ? `${totalServiceCost}`
          //     : `${totalServiceCost}`,

          amount:
            userCurrency == "NGN" && currencyCheck === "NGN"
              ? totalServiceCost
              : userCurrency == "NGN" && currencyCheck != "NGN"
              ? totalveriNiara
              : // : userCurrency == "USD" && currencyCheck === "USD"
                // ? totalServiceCost
                totalServiceCost,
          // totalveriNiara,
          //!! Look at the wallet payment condtion. the wallet only allows payment with user Currency
          // currencyCheck == "USD"
          //   ? outsideNgWithNiara == true
          //     ? `${outsideNgWithNiaraPrice}`
          //     : `${totalServiceCost}`
          //   : `${totalServiceCost}`,
        };

        if (userBalance.toLocaleString() < 100) {
          // Show the Ant Design notification
          setLoading(false);
          handleCancel();
          Swal.fire({
            title: "Wallet Balance Error",
            text: "Your wallet balance is low. Please recharge before making a payment.",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          // notification.error({
          //   message: "Wallet Balance Warning",
          //   description:
          //     "Your wallet balance is low. Please recharge before making a payment.",
          // });
        } else {
          try {
            setLoading(true);
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body: JSON.stringify(requestBody),
            });

            const data = await response.text();

            if (response.ok && data === "payment successful") {
              // console.log("Payment successful. Response:", data);
              handleCancel();
              dispatch(fetchUserProfile(userToken));
              setLoading(true);
              handleSubmit();
            } else {
              console.error("Payment failed. Response:", data);
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            handleCancel();

            setLoading(false); // Set loading to false when the request completes (either success or failure)
          }
        }
      } else if (selectedValue === 2) {
        // console.log("Instant Payment");
        // setLoading(true);
        handleFlutterPayment({
          callback: async (response) => {
            console.log(response);
            if (response.status === "successful") {
              console.log("flutterWave success");

              setLoading(true);
              handleSubmit();
            }
            closePaymentModal();
          },
          onClose: () => {},
        });
        handleCancel();
      }
    }
  };

  const handleMakePayment = () => {
    // Your existing logic for handling the payment
    // Calculate total veri based on form data
    const formDataFees = {
      nin: ninFee,
      vin: vinVehicleFee,
      license_number: vehicleFee,
      rc: businessFee,
      business_name: businessFee,
      bvn: financialFee,
      face: faceFee,
    };

    const formDataUsdFees = {
      nin: ninUsdFee,
      vin: vinVehicleUsdFee,
      license_number: vehicleUsdFee,
      rc: businessUsdFee,
      business_name: businessUsdFee,
      bvn: financialUsdFee,
      face: faceUsdFee,
    };

    // Calculate total veri based on form data
    let calculatedTotalveri = 0;
    let calculatedTotalnaira = 0;

    if (currencyCheck === "USD") {
      Object.keys(formData).forEach((field) => {
        // Check if the field has data and if there's a corresponding fee
        if (
          typeof formData[field] === "string" && // Check if it's a string
          formData[field].trim() !== "" &&
          formDataUsdFees[field] !== undefined
        ) {
          // Add the fee for this field to the totalveri
          setIsClearVinOn(false);
          setIsBasicOn(false);
          setIsVehicleOn(false);
          setIsFinancialOn(false);
          calculatedTotalveri += formDataUsdFees[field];
          setTotalveri(calculatedTotalveri);
        }
      });

      // Check if 'vin' is a string and has a fee
      if (
        typeof formData.vin === "string" &&
        formData.vin.trim() !== "" &&
        formDataUsdFees.vin !== undefined
      ) {
        setIsClearVinOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.vin;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.nin === "string" &&
        formData.nin.trim() !== "" &&
        formDataUsdFees.nin !== undefined
      ) {
        setIsBasicOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.vin;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.bvn === "string" &&
        formData.bvn.trim() !== "" &&
        formDataUsdFees.bvn !== undefined
      ) {
        setIsFinancialOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.bvn;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.license_number === "string" &&
        formData.license_number.trim() !== "" &&
        formDataUsdFees.license_number !== undefined
      ) {
        setIsVehicleOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.license_number;
        setTotalveri(calculatedTotalveri);
      }

      // Update totalveri state with the calculated value
      setTotalveri(calculatedTotalveri);
    } else {
      Object.keys(formData).forEach((field) => {
        // Check if the field has data and if there's a corresponding fee
        if (
          typeof formData[field] === "string" && // Check if it's a string
          formData[field].trim() !== "" &&
          formDataFees[field] !== undefined
        ) {
          // Add the fee for this field to the totalveri
          setIsClearVinOn(false);
          calculatedTotalveri += formDataFees[field];
          setTotalveri(calculatedTotalveri);
        }
      });

      // Check if 'vin' is a string and has a fee
      if (
        typeof formData.vin === "string" &&
        formData.vin.trim() !== "" &&
        formDataFees.vin !== undefined
      ) {
        setIsClearVinOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataFees.vin;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.nin === "string" &&
        formData.nin.trim() !== "" &&
        formDataUsdFees.nin !== undefined
      ) {
        setIsBasicOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.vin;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.bvn === "string" &&
        formData.bvn.trim() !== "" &&
        formDataUsdFees.bvn !== undefined
      ) {
        setIsFinancialOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.bvn;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.license_number === "string" &&
        formData.license_number.trim() !== "" &&
        formDataUsdFees.license_number !== undefined
      ) {
        setIsVehicleOn(true);
        // Add the fee for 'vin' to the totalveri
        calculatedTotalveri += formDataUsdFees.license_number;
        setTotalveri(calculatedTotalveri);
      }

      // Update totalveri state with the calculated value
      setTotalveri(calculatedTotalveri);
    }

    // Loop through all form data fields

    const currencyFormatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    });
    const formattedTotalveri = currencyFormatter.format(totalveri);

    // Show the modal
    showModal();
  };
  const handleMakePaymentForLiveFace = () => {
    const formDataFees = {
      nin: ninFee + 100,
      vin: vinVehicleFee,
      rc: businessFee,
      license_number: vehicleFee,
      business_name: businessFee,
      bvn: financialFee,
      face: faceFee,
    };

    // Calculate total veri based on form data
    let calculatedTotalveri = 0;

    // Loop through all form data fields
    Object.keys(formData).forEach((field) => {
      // Check if the field has data and if there's a corresponding fee
      if (formData[field].trim() !== "" && formDataFees[field] !== undefined) {
        // Add the fee for this field to the totalveri
        calculatedTotalveri += formDataFees[field];
      }
    });

    // Update totalveri state with the calculated value
    setTotalveri(calculatedTotalveri);

    const currencyFormatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    });
    const formattedTotalveri = currencyFormatter.format(totalveri);
    showModalFace();
  };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    setCheckboxCheckedConfirm(true);
  };

  const handleRadioChangeStolen = (e) => {
    handleInputChange("stolencheck", false);
  };

  const PaymentModal = () => (
    <Modal
      visible={modalVisible}
      onCancel={handleCancel}
      title="Disclaimer"
      footer={null} // Remove the default footer
      width={isClearVinOn ? 1000 : 700}
      bodyStyle={{ overflowX: "scroll" }}
      style={{
        top: 20,
      }}
    >
      {!checkboxCheckedConfirm && (
        <Alert message="Kindly select a payment method" type="info" showIcon />
      )}

      {/* Checkbox and lower div */}
      {!isClearVinOn ? (
        <div
          style={{
            marginTop: "20px",
            background: "rgba(235, 3, 24, 0.10)",
            border: "1px solid #EB0318",
            padding: "15px",
          }}
        >
          {/* <Checkbox onChange={onChange2}> */}
          <ul>
            {isBasicOn || isFinancialOn ? (
              <li>
                By clicking, you indicate that you understand and accept that
                consent is required from the data subject being verified before
                you can access their data.
              </li>
            ) : (
              ""
            )}
            {isVehicleOn ? (
              <li>
                Please enter the registration number without spaces or hyphens.
              </li>
            ) : (
              ""
            )}

            <li>
              You confirm that search details are correct, and you confirm that
              you will not be refunded for incorrect information or lack of
              consent
            </li>
          </ul>

          {/* </Checkbox> */}
        </div>
      ) : (
        ""
      )}
      {isClearVinOn ? (
        <div
          style={{
            marginTop: "20px",
            background: "rgba(235, 3, 24, 0.10)",
            border: "1px solid #EB0318",
            padding: "15px",
          }}
        >
          {/* <Checkbox onChange={onChange2}> */}
          By clicking, you indicate that:
          <ul>
            {isBasicOn || isFinancialOn ? (
              <li>
                By clicking, you indicate that you understand and accept that
                consent is required from the data subject being verified before
                you can access their data.
              </li>
            ) : (
              ""
            )}
            {isVehicleOn ? (
              <li>
                Please enter the registration number without spaces or hyphens.
              </li>
            ) : (
              ""
            )}
            <li>
              You confirm that search details are correct, and you confirm that
              you will not be refunded for incorrect information or lack of
              consent
            </li>
            <li>
              You understand and accept the following{" "}
              <b>
                terms and conditions pertaining to ClearVIN’s vehicle history
                data (Licensed Data):
              </b>
              <ol>
                <li>You may not provide Licensed Data to other persons</li>
                <li>
                  You may only use Licensed Data for your internal business
                  purposes or provide Licensed Data to other organizations for
                  the internal business uses of those organizations.
                </li>
                <li>
                  You warrant that you shall not furnish or sell Licensed Data
                  to members of the public.
                </li>
                <li>You understand that</li>
                <ol type="a">
                  <li>
                    e-citizen’s vendor, ClearVin, LLC (“CV”), is an approved
                    NMVTIS Data Provider,
                  </li>
                  <li>
                    some state data pertaining to a VIN may not be contained in
                    or available through NMVTIS,
                  </li>
                  <li>
                    some state data is provided to NMVTIS via a daily, weekly or
                    monthly format and therefore may not be current,
                  </li>
                  <li>
                    some of the entities which report data to NMVTIS may have
                    failed to provide such data for incorporation in NMVTIS, and
                  </li>
                  <li>
                    AAMVA, CV’s vendor, and CV have no control over the accuracy
                    or completeness of data contained in NMVTIS and shall not
                    have any liability to any Licensee, Affiliate, user or third
                    party concerning the quality, completeness or accuracy of
                    Licensed Data.
                  </li>
                </ol>
                <li>You understand that:</li>
                <ol type="a">
                  <li>e-citizen™ is not an Approved NMVTIS Data Provider,</li>
                  <li>
                    e-citizen™ has obtained the NMVTIS data contained in the
                    Licensed Data from an Approved NMVTIS Data Provider, and
                  </li>
                  <li>
                    CV as the Approved NMVTIS Data Provider from which the
                    NMVTIS Reseller has obtained the NMVTIS data used in such
                    Licensed Data.
                  </li>
                </ol>
              </ol>
            </li>
          </ul>
          {/* </Checkbox> */}
        </div>
      ) : (
        ""
      )}
      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          type="primary"
          onClick={handlePaymentMethod}
          disabled={!checkboxCheckedConfirm}
          style={{
            marginRight: 10,
            backgroundColor: checkboxCheckedConfirm ? "#0DC939" : "#d9d9d9", // Set the colors based on checkbox state
            borderColor: checkboxCheckedConfirm ? "#0DC939" : "#d9d9d9",
            cursor: checkboxCheckedConfirm ? "pointer" : "not-allowed", // Change cursor based on checkbox state
          }}
        >
          Confirm
        </Button>
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );

  const PaymentModalFace = () => (
    <Modal
      visible={modalVisibleFace}
      onCancel={handleCancelFace}
      footer={null} // Remove the default footer
    >
      {/* Add your content for the modal here */}
      <div
        style={{
          borderBottom: "1px solid #e8e8e8",
          marginBottom: "15px",
          paddingBottom: "15px",
        }}
      >
        <Radio.Group
          style={{ width: "100%" }}
          onChange={handleRadioChange}
          value={selectedValue}
        >
          <Radio
            style={{
              display: "block",
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              fontWeight: "bold", // Make the text bold
            }}
            value={1}
          >
            Payment from Wallet
          </Radio>
          <Radio
            style={{
              display: "block",
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              padding: "10px",
              fontWeight: "bold", // Make the text bold
            }}
            value={2}
          >
            Instant Payment
          </Radio>
        </Radio.Group>
      </div>

      {/* Checkbox and lower div */}
      <div
        style={{
          marginTop: "20px",
          background: "rgba(235, 3, 24, 0.10)",
          border: "1px solid #EB0318",
          padding: "15px",
        }}
      >
        <ul>
          <li>
            By clicking, you indicate that you understand and accept that
            consent is required from the data subject being verified before you
            can access their data.
          </li>

          <li>
            You confirm that search details are correct, and you confirm that
            you will not be refunded for incorrect information or lack of
            consent
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          type="primary"
          disabled={!checkboxCheckedConfirm}
          style={{
            marginRight: 10,
            backgroundColor: checkboxCheckedConfirm ? "#0DC939" : "#d9d9d9", // Set the colors based on checkbox state
            borderColor: checkboxCheckedConfirm ? "#0DC939" : "#d9d9d9",
            cursor: checkboxCheckedConfirm ? "pointer" : "not-allowed", // Change cursor based on checkbox state
          }}
        >
          Confirm
        </Button>
        <Button key="cancel" onClick={handleCancelFace}>
          Cancel
        </Button>
      </div>
    </Modal>
  );

  const buttonStyle = {
    padding: "10px", // Adjust the padding as needed
    backgroundColor: "#0DC939",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Set the base64 string in state
        setBase64Image(e.target.result);

        // Remove the "data:image/png;base64," prefix and update the formData state
        const base64WithoutPrefix = e.target.result.split(",")[1];
        setFormData({ ...formData, face: base64WithoutPrefix });
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const handleFileSelectFinger = (event) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Set the base64 string in state
        setBase64Image(e.target.result);

        // Remove the "data:image/png;base64," prefix and update the formData state
        const base64WithoutPrefix = e.target.result.split(",")[1];
        setFormData({ ...formData, finger: base64WithoutPrefix });
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleButtonClickFinger = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const handleClickPrivacyPolicy = () => {
    setIsOpen(true);
  };
  const handleClickTerms = () => {
    setIsOpen2(true);
  };

  const [basicProfileArray, setBasicProfileArray] = useState([]);
  const [businessProfileArray, setBusinessProfileArray] = useState([]);
  const [businessSelectedValue, setBusinessSelectedValue] = useState(null);
  const [financialProfileArray, setFinancialProfileArray] = useState([]);
  const [financialSelectedValue, setFinancialSelectedValue] = useState(null);
  const [vehicleProfileArray, setVehicleProfileArray] = useState([]);
  const [vehicleSelectedValue, setVehicleSelectedValue] = useState(null);

  const handleBasicProfileRadioChange = (value) => {
    setSelectedValue(value);
    if (basicProfileArray.length > 0) {
      const newArray = [...basicProfileArray];
      newArray[basicProfileArray.length - 1] = value;
      setBasicProfileArray(newArray);
    } else {
      setBasicProfileArray([value]);
    }
  };
  const handleBusinessProfileRadioChange = (value) => {
    setBusinessSelectedValue(value);
    if (businessProfileArray.length > 0) {
      const newArray = [...businessProfileArray];
      newArray[businessProfileArray.length - 1] = value;
      setBusinessProfileArray(newArray);
    } else {
      setBusinessProfileArray([value]);
    }
  };
  const handleFinancialProfileRadioChange = (value) => {
    setFinancialSelectedValue(value);
    if (financialProfileArray.length > 0) {
      const newArray = [...financialProfileArray];
      newArray[financialProfileArray.length - 1] = value;
      setFinancialProfileArray(newArray);
    } else {
      setFinancialProfileArray([value]);
    }
  };
  const handleVehicleProfileRadioChange = (value) => {
    setVehicleSelectedValue(value);
    if (vehicleProfileArray.length > 0) {
      const newArray = [...vehicleProfileArray];
      newArray[vehicleProfileArray.length - 1] = value;
      setVehicleProfileArray(newArray);
    } else {
      setVehicleProfileArray([value]);
    }
  };

  const clearInputNin = () => {
    setBasicProfileArray([]);
    setFormData({ ...formData, nin: "" });
    setSelectedValue(null);
    setNinFilled(false);
    setFaceFilled(false);
    setTotalVAT((prevTotalVAT) => prevTotalVAT - ninVatFee);
    setTotalServiceCost((prevTotalFees) => prevTotalFees - ninFee);
    setTotalveriNiara((prevTotalFees) => prevTotalFees - ninUsdFee);
  };

  const clearInputBusinessrc = () => {
    setBusinessProfileArray([]);
    setFormData({ ...formData, rc: "" });
    setBusinessSelectedValue(null);
    setRcFilled(false);
    setBusinessNameFilled(false);
    setTotalVAT((prevTotalVAT) => prevTotalVAT - businessVatFee);
    setTotalServiceCost((prevTotalFees) => prevTotalFees - businessFee);
    setTotalveriNiara((prevTotalFees) => prevTotalFees - businessUsdFee);
  };
  const clearInputBusinessbusiness_name = () => {
    setBusinessProfileArray([]);
    setFormData({ ...formData, business_name: "" });
    setBusinessSelectedValue(null);
    setRcFilled(false);
    setBusinessNameFilled(false);
    setTotalVAT((prevTotalVAT) => prevTotalVAT - businessVatFee);
    setTotalServiceCost((prevTotalFees) => prevTotalFees - businessFee);
    setTotalveriNiara((prevTotalFees) => prevTotalFees - businessUsdFee);
  };

  const clearInputFinancial = () => {
    setFinancialProfileArray([]);
    setFormData({ ...formData, bvn: "" });
    setFinancialSelectedValue(null);
    setBvnFilled(false);
    setTotalVAT((prevTotalVAT) => prevTotalVAT - financialVatFee);
    setTotalServiceCost((prevTotalFees) => prevTotalFees - financialFee);
    setTotalveriNiara((prevTotalFees) => prevTotalFees - financialUsdFee);
  };

  const clearInputVehiclelicense_number = () => {
    setVehicleProfileArray([]);
    setFormData({ ...formData, license_number: "" });
    setVehicleSelectedValue(null);
    setVinFilled(false);
    setLicenseNumberFilled(false);
    setTotalVAT((prevTotalVAT) => prevTotalVAT - vehicleVatFee);
    setTotalServiceCost((prevTotalFees) => prevTotalFees - vehicleFee);
    setTotalveriNiara((prevTotalFees) => prevTotalFees - vehicleUsdFee);
  };
  const clearInputVehiclevin = () => {
    setVehicleProfileArray([]);
    setFormData({ ...formData, vin: "" });
    setVehicleSelectedValue(null);
    setVinFilled(false);
    setLicenseNumberFilled(false);
    if (currencyCheck === "USD") {
      setTotalVAT((prevTotalVAT) => prevTotalVAT - vinVehicleVatFee);
      setTotalServiceCost((prevTotalFees) => prevTotalFees - vinVehicleFee);
    } else {
      setTotalVAT((prevTotalVAT) => prevTotalVAT - vinVehicleVatFee);
      setTotalServiceCost((prevTotalFees) => prevTotalFees - vinVehicleFee);
    }

    setTotalveriNiara((prevTotalFees) => prevTotalFees - vinVehicleUsdFee);
  };

  const isFormDataEmpty = () => {
    for (const key in formData) {
      if (formData[key] !== "") {
        return false;
      }
    }
    return true;
  };

  const [modal1Open, setModal1Open] = useState(false);
  const liveCaptureUrl = `https://e-citizen.ng:9443/${liveFaceNin}/ecitizen/${userToken}`;

  if (loading) {
    Swal.fire({
      title: "Please Wait",
      text: "Verification in progress",
      icon: "info",
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        confirmButton: "custom-swal-button",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  return (
    <Row>
      <Col>
        <Img src={banner} />
      </Col>

      <Container>
        <Spin spinning={loading} tip="Verification in progress...">
          <StyledForm>
            <InfoSec>
              <Heading>Identity Verification Service</Heading>

              <Row gutter={[50, 50]}>
                <Col
                  span={8}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                >
                  {window.innerWidth < 960 ? (
                    <>
                      <Heading6>How to verify</Heading6>
                      <>
                        <List
                          itemLayout="horizontal"
                          dataSource={data}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar src={tick} />}
                                title={item.title}
                              />
                            </List.Item>
                          )}
                        />
                      </>
                    </>
                  ) : (
                    ""
                  )}
                  <Heading6> Select Profile</Heading6>

                  <Space
                    direction="vertical"
                    size="middle"
                    style={{
                      display: "flex",
                    }}
                  >
                    <Row
                      onClick={() => setSelectedProfile("basic")}
                      style={{
                        backgroundColor:
                          selectedProfile === "basic" ? "#0DC939" : "#EAFFF0",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        paddingLeft: "10px",
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        color:
                          selectedProfile === "basic" ? "#FFFFFF" : "#000000",
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)", // Adding the boxShadow property for the shadow effect
                      }}
                    >
                      <Col span={21}>Basic Identity Profile</Col>
                      <Col span={3}>
                        <Tooltip title={tooltipContentBasic} color="#F4B40F">
                          <InfoCircleOutlined
                            style={{
                              fontSize: "20px",
                            }}
                          />
                        </Tooltip>
                      </Col>
                    </Row>

                    <Form hidden={selectedProfile == "basic" ? false : true}>
                      <Radio.Group
                        value={selectedValue}
                        onChange={(e) =>
                          handleBasicProfileRadioChange(e.target.value)
                        }
                      >
                        <Space direction="vertical">
                          <Radio
                            value="nin"
                            size="large"
                            onClick={() => setSelectedForm("nin")}
                          >
                            National Identification Number (NIN)
                          </Radio>

                          <Radio
                            value="face"
                            disabled
                            onClick={() => setSelectedForm("face")}
                          >
                            National Identification Number (NIN) + Face{" "}
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form>
                    <Row
                      onClick={() => setSelectedProfile("business")}
                      style={{
                        backgroundColor:
                          selectedProfile === "business"
                            ? "#0DC939"
                            : "#EAFFF0",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        paddingLeft: "10px",
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        color:
                          selectedProfile === "business"
                            ? "#FFFFFF"
                            : "#000000",
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Col span={21}>Business Profile</Col>
                      <Col span={3}>
                        <Tooltip title={tooltipContentBusiness} color="#F4B40F">
                          <InfoCircleOutlined
                            style={{
                              fontSize: "20px",
                            }}
                          />
                        </Tooltip>
                      </Col>
                    </Row>

                    <Form hidden={selectedProfile == "business" ? false : true}>
                      <Radio.Group
                        value={businessSelectedValue}
                        onChange={(e) =>
                          handleBusinessProfileRadioChange(e.target.value)
                        }
                      >
                        <Space direction="vertical">
                          <Radio
                            value="rc"
                            size="large"
                            onClick={() => setSelectedForm("rc")}
                          >
                            Registration Number (RC)
                          </Radio>
                          <Radio
                            value="business_name"
                            onClick={() => setSelectedForm("business_name")}
                          >
                            {" "}
                            Business Name{" "}
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form>

                    <Row
                      onClick={() => setSelectedProfile("financial")}
                      style={{
                        backgroundColor:
                          selectedProfile === "financial"
                            ? "#0DC939"
                            : "#EAFFF0",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        paddingLeft: "10px",
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        color:
                          selectedProfile === "financial"
                            ? "#FFFFFF"
                            : "#000000",
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Col span={21}>Financial Credit Profile</Col>
                      <Col span={3}>
                        <Tooltip
                          title={tooltipContentFinancial}
                          color="#F4B40F"
                        >
                          <InfoCircleOutlined
                            style={{
                              fontSize: "20px",
                            }}
                          />
                        </Tooltip>
                      </Col>
                    </Row>

                    <Form
                      hidden={selectedProfile == "financial" ? false : true}
                    >
                      <Radio.Group
                        value={financialSelectedValue}
                        onChange={(e) =>
                          handleFinancialProfileRadioChange(e.target.value)
                        }
                      >
                        <Radio
                          value="bvn"
                          size="large"
                          onClick={() => setSelectedForm("bvn")}
                        >
                          Bank Verification Number (BVN)
                        </Radio>
                      </Radio.Group>
                    </Form>

                    <Row
                      onClick={() => setSelectedProfile("vehicle")}
                      style={{
                        backgroundColor:
                          selectedProfile === "vehicle" ? "#0DC939" : "#EAFFF0",
                        paddingTop: "30px",
                        paddingBottom: "30px",
                        paddingLeft: "10px",
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        color:
                          selectedProfile === "vehicle" ? "#FFFFFF" : "#000000",
                        boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Col span={21}>Vehicle Profile</Col>
                      <Col span={3}>
                        <Tooltip title={tooltipContentVehicle} color="#F4B40F">
                          <InfoCircleOutlined
                            style={{
                              fontSize: "20px",
                            }}
                          />
                        </Tooltip>
                      </Col>
                    </Row>

                    <Form hidden={selectedProfile == "vehicle" ? false : true}>
                      <Radio.Group
                        value={vehicleSelectedValue}
                        onChange={(e) =>
                          handleVehicleProfileRadioChange(e.target.value)
                        }
                      >
                        <Space direction="vertical">
                          <Radio
                            disabled
                            value="vin"
                            size="large"
                            onClick={() => setSelectedForm("vin")}
                          >
                            Vehicle History (VIN)
                            <img src={clearvin} alt="" width={150} />
                          </Radio>
                          <Radio
                            value="license_number"
                            size="large"
                            onClick={() => setSelectedForm("license_number")}
                          >
                            Vehicle Registration Number
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form>
                  </Space>
                </Col>
                <Col
                  span={8}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                >
                  {window.innerWidth < 960 ? (
                    ""
                  ) : (
                    <>
                      {/* <Flex gap="small" wrap="wrap">
                      <Tag
                        closeIcon={<CloseCircleOutlined />}
                        onClose={console.log}
                        color="#0DC939"
                      >
                        Tag 2
                      </Tag>
                    </Flex> */}
                      {selectedForm === "none" && (
                        <>
                          <Heading6>How to verify</Heading6>
                          <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<Avatar src={tick} />}
                                  title={item.title}
                                />
                              </List.Item>
                            )}
                          />
                        </>
                      )}
                    </>
                  )}
                  <Form>
                    {/* {selectedForm === "nin" && ( */}
                    {basicProfileArray.includes("nin") && (
                      <div>
                        <StyledLabel>
                          National Identification Number*
                        </StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter your NIN"
                          name="nin"
                          value={formData.nin}
                          onChange={(e) =>
                            handleInputChange("nin", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {/* {selectedForm === "phone" && ( */}
                    <div hidden={selectedForm === "phone" ? false : true}>
                      <StyledLabel>Phone Number*</StyledLabel>
                      <StyledInput
                        type="number"
                        placeholder="Enter your Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                    {/* )} */}
                    {selectedForm === "demographics" && (
                      <>
                        <StyledLabel>First Name*</StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter First Name"
                          name="firstname"
                          value={formData.firstname}
                          onChange={(e) =>
                            handleInputChange("firstname", e.target.value)
                          }
                        />
                        <StyledLabel>Last Name*</StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter Last Name"
                          name="lastname"
                          value={formData.lastname}
                          onChange={(e) =>
                            handleInputChange("lastname", e.target.value)
                          }
                        />
                        <Row gutter={12}>
                          <Col
                            span={8}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                          >
                            <StyledLabel>Date of Birth*</StyledLabel>
                            <DatePicker
                              format={dateFormat}
                              size="large"
                              name="dateOfBirth"
                              onChange={handleDateChange}
                            />
                          </Col>
                          <Col
                            span={8}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                          >
                            <StyledLabel>Gender*</StyledLabel>
                            <Radio.Group
                              onChange={(e) =>
                                handleInputChange("gender", e.target.value)
                              }
                              value={formData.gender}
                            >
                              <Space>
                                <Radio value="m" size="large">
                                  Male
                                </Radio>
                                <Radio value="f">Female</Radio>
                              </Space>
                            </Radio.Group>
                          </Col>
                        </Row>
                      </>
                    )}
                    {/* {selectedForm === "face" && ( */}
                    {basicProfileArray.includes("face") && (
                      <div>
                        <StyledLabel>
                          National Identification Number (NIN)*
                        </StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter your NIN"
                          name="nin"
                          value={liveFaceNin}
                          onChange={handleLiveFaceNinChange}
                          onChangeCapture={(e) =>
                            handleInputChange("nin", e.target.value)
                          }
                          style={{
                            borderColor: isLiveFaceNinValid ? "" : "red",
                          }}
                        />

                        {base64Image && (
                          <div>
                            <p>Image:</p>
                            <img
                              src={base64Image}
                              alt="Uploaded"
                              style={{ maxWidth: "50%" }}
                            />
                          </div>
                        )}

                        {!isLiveFaceNinValid && (
                          <p style={{ color: "red" }}>NIN cannot be empty</p>
                        )}
                        <StyledLabel>
                          Upload File or take a live face capture*
                        </StyledLabel>

                        <Row gutter={12}>
                          <Col
                            span={8}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                          >
                            <input
                              type="file"
                              onChange={handleFileSelect}
                              style={{ display: "none" }}
                              ref={fileInputRef}
                            />
                            <button
                              type="button"
                              onClick={handleButtonClick}
                              style={buttonStyle}
                            >
                              Browse file
                            </button>
                          </Col>
                          <Col
                            span={8}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                          >
                            <Button
                              type="primary"
                              icon={<CameraOutlined />}
                              size="large"
                              onClick={() => {
                                // handleMakePaymentForLiveFace();
                                const liveCaptureUrl = `https://e-citizen.ng:9443/${liveFaceNin}/ecitizen/${userToken}`;

                                if (
                                  isLiveFaceNinValid &&
                                  liveFaceNin.trim() !== ""
                                ) {
                                  window.open(liveCaptureUrl, "_blank");
                                }
                                // history.push("/liveFace");
                                // setModal1Open(true);
                              }}
                              disabled={
                                !isLiveFaceNinValid || liveFaceNin.trim() === ""
                              }
                            >
                              Live Capture
                            </Button>

                            <Modal
                              title="live Face Capture"
                              style={{
                                top: 20,
                              }}
                              width={1000}
                              open={modal1Open}
                              onOk={() => setModal1Open(false)}
                              onCancel={() => setModal1Open(false)}
                            >
                              <iframe
                                id="inlineFrameExample"
                                title="Inline Frame Example"
                                width="100%"
                                height="500"
                                src={liveCaptureUrl}
                              ></iframe>
                            </Modal>
                          </Col>
                        </Row>
                      </div>
                    )}
                    {/* )} */}
                    {selectedForm === "fingerprint" && (
                      <>
                        <StyledLabel>
                          National Identification Number*
                        </StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter National Identification Number"
                          name="nin"
                          value={liveFaceNin}
                          onChange={handleLiveFaceNinChange}
                          onChangeCapture={(e) =>
                            handleInputChange("nin", e.target.value)
                          }
                          style={{
                            borderColor: isLiveFaceNinValid ? "" : "red",
                          }}
                        />

                        {base64Image && (
                          <div>
                            <p>Image:</p>
                            <img
                              src={base64Image}
                              alt="Uploaded"
                              style={{ maxWidth: "50%" }}
                            />
                          </div>
                        )}

                        {!isLiveFaceNinValid && (
                          <p style={{ color: "red" }}>NIN cannot be empty</p>
                        )}
                        <StyledLabel>Upload Finger Image</StyledLabel>

                        <Row gutter={12}>
                          <Col
                            span={8}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                            lg={{ span: 12 }}
                          >
                            <input
                              type="file"
                              onChange={handleFileSelectFinger}
                              style={{ display: "none" }}
                              ref={fileInputRef}
                            />
                            <button
                              type="button"
                              onClick={handleButtonClickFinger}
                              style={buttonStyle}
                            >
                              Browse file
                            </button>
                          </Col>
                        </Row>
                      </>
                    )}
                    {/* {selectedForm === "rc" && ( */}
                    {businessProfileArray.includes("rc") && (
                      <div>
                        <StyledLabel>Registration Number (RC)*</StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter Registration Number"
                          name="rc"
                          value={formData.rc}
                          onChange={(e) =>
                            handleInputChange("rc", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {/* {selectedForm === "business_name" && ( */}
                    {businessProfileArray.includes("business_name") && (
                      <div>
                        <StyledLabel>Business Name*</StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter Business Name"
                          name="business_name"
                          value={formData.business_name}
                          onChange={(e) =>
                            handleInputChange("business_name", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {/* {selectedForm === "bvn" && ( */}
                    {financialProfileArray.includes("bvn") && (
                      <div>
                        <StyledLabel>
                          Bank Verification Number (BVN)*
                        </StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter Bank Verification Number"
                          name="bvn"
                          value={formData.bvn}
                          pattern="[0-9]*" // Allow only numbers
                          title="Please enter only numbers"
                          onChange={(e) =>
                            handleInputChange("bvn", e.target.value)
                          }
                        />
                      </div>
                    )}
                    {/* {selectedForm === "vin" && ( */}
                    {vehicleProfileArray.includes("vin") && (
                      <div>
                        <StyledLabel>Vehicle History (VIN)*</StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Enter Vehicle History (VIN)"
                          name="vin"
                          value={formData.vin}
                          onChange={(e) =>
                            handleInputChange("vin", e.target.value)
                          }
                        />

                        <Checkbox
                          onChange={handleCheckboxChange}
                          checked={isChecked}
                        >
                          Also search Stolen Vehicles database? (Extra charge)
                        </Checkbox>
                      </div>
                    )}
                    {/* {selectedForm === "license_number" && ( */}
                    {vehicleProfileArray.includes("license_number") && (
                      <div>
                        <StyledLabel>Vehicle Registration Number*</StyledLabel>
                        <StyledInput
                          type="text"
                          placeholder="Vehicle Registration Number"
                          name="license_number"
                          value={formData.license_number}
                          onChange={(e) =>
                            handleInputChange("license_number", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </Form>
                </Col>
                <Col
                  span={8}
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                >
                  <Heading6>Payment Summary</Heading6>
                  <div
                    style={{
                      backgroundColor: "#FAFBFC",
                      padding: "15px",
                      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p>Processing fees:</p>

                    {ninFilled ? (
                      <Row>
                        <Col
                          span={8}
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 15 }}
                          lg={{ span: 15 }}
                          style={{ textAlign: "left" }}
                        >
                          <p> NIN: </p>
                        </Col>
                        <Col>
                          <p>
                            {" "}
                            {currencyCheck === "USD"
                              ? "$" + (ninServiceFee + ninProcessingFee)
                              : formatToNaira(ninServiceFee + ninProcessingFee)}
                          </p>
                        </Col>
                        <Col style={{ marginLeft: "20px", color: "red" }}>
                          <CloseSquareOutlined onClick={clearInputNin} />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}

                    {rcFilled ? (
                      <Row>
                        <Col
                          span={8}
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 15 }}
                          lg={{ span: 15 }}
                          style={{ textAlign: "left" }}
                        >
                          <p>RC Number: </p>
                        </Col>
                        <Col>
                          <p>
                            {" "}
                            {currencyCheck === "USD"
                              ? "$" +
                                (businessServiceFee + businessProcessingFee)
                              : formatToNaira(
                                  businessServiceFee + businessProcessingFee
                                )}
                          </p>
                        </Col>
                        <Col style={{ marginLeft: "20px", color: "red" }}>
                          <CloseSquareOutlined onClick={clearInputBusinessrc} />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    {businessNameFilled ? (
                      <Row>
                        <Col
                          span={8}
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 15 }}
                          lg={{ span: 15 }}
                          style={{ textAlign: "left" }}
                        >
                          <p> Business Name: </p>
                        </Col>
                        <Col>
                          <p>
                            {" "}
                            {currencyCheck === "USD"
                              ? "$" +
                                (businessNameServiceFee +
                                  businessNameProcessingFee)
                              : formatToNaira(
                                  businessNameServiceFee +
                                    businessNameProcessingFee
                                )}
                          </p>
                        </Col>
                        <Col style={{ marginLeft: "20px", color: "red" }}>
                          <CloseSquareOutlined
                            onClick={clearInputBusinessbusiness_name}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    {bvnFilled ? (
                      <Row>
                        <Col
                          span={8}
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 15 }}
                          lg={{ span: 15 }}
                          style={{ textAlign: "left" }}
                        >
                          <p> BVN: </p>
                        </Col>
                        <Col>
                          <p>
                            {" "}
                            {currencyCheck === "USD"
                              ? "$" +
                                (financialServiceFee + financialProcessingFee)
                              : formatToNaira(
                                  financialServiceFee + financialProcessingFee
                                )}
                          </p>
                        </Col>
                        <Col style={{ marginLeft: "20px", color: "red" }}>
                          <CloseSquareOutlined onClick={clearInputFinancial} />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    {vinFilled ? (
                      <Row>
                        <Col
                          span={8}
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 15 }}
                          lg={{ span: 15 }}
                          style={{ textAlign: "left" }}
                        >
                          <p> VIN </p>
                        </Col>
                        <Col>
                          <p>
                            {" "}
                            {currencyCheck === "USD"
                              ? "$" +
                                (vinVehicleServiceFee + vinVehicleProcessingFee)
                              : formatToNaira(
                                  vinVehicleServiceFee + vinVehicleProcessingFee
                                )}
                          </p>
                        </Col>
                        <Col style={{ marginLeft: "20px", color: "red" }}>
                          <CloseSquareOutlined onClick={clearInputVehiclevin} />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    {licenseNumberFilled ? (
                      <Row>
                        <Col
                          span={8}
                          xs={{ span: 12 }}
                          sm={{ span: 12 }}
                          md={{ span: 15 }}
                          lg={{ span: 15 }}
                          style={{ textAlign: "left" }}
                        >
                          <p> Registration Number </p>
                        </Col>
                        <Col>
                          <p>
                            {" "}
                            {currencyCheck === "USD"
                              ? "$" + (vehicleServiceFee + vehicleProcessingFee)
                              : formatToNaira(
                                  vehicleServiceFee + vehicleProcessingFee
                                )}
                          </p>
                        </Col>
                        <Col
                          style={{
                            marginLeft: "20px",
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          <CloseSquareOutlined
                            onClick={clearInputVehiclelicense_number}
                          />
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                    <Divider />

                    <Row>
                      <Col
                        span={8}
                        xs={{ span: 12 }}
                        sm={{ span: 12 }}
                        md={{ span: 15 }}
                        lg={{ span: 15 }}
                        style={{ textAlign: "left" }}
                      >
                        <p>Tax & charges: </p>
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        {currencyCheck === "USD" ? (
                          <p>${totalVAT}</p>
                        ) : (
                          <p>{formatToNaira(totalVAT)}</p>
                        )}
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col
                        xs={{ span: 12 }}
                        sm={{ span: 12 }}
                        md={{ span: 15 }}
                        lg={{ span: 15 }}
                        style={{ textAlign: "left" }}
                      >
                        <p>Total Amount Due: </p>
                      </Col>
                      <Col>
                        {/* {currencyCheck === "USD" ? (
                        <p>{`$${rawServiceFee.toFixed(2)}`}</p>
                      ) : (
                        <p>{`₦${rawServiceFee.toFixed(2)}`}</p>
                      )} */}

                        {currencyCheck === "USD" ? (
                          <p>{`$${totalServiceCost}`}</p>
                        ) : (
                          <p>{formatToNaira(totalServiceCost)}</p>
                        )}
                      </Col>
                    </Row>
                    <Divider />
                    {currencyCheck == "USD" ? (
                      <>
                        <p>Select payment currency </p>
                        <p>Currency Calculator</p>
                        {selectedValue != 1 ? (
                          <>
                            <Radio.Group
                              onChange={currencyOnChange}
                              value={value}
                            >
                              <Radio value={1}>
                                {" "}
                                {formatToNaira(totalveriNiara)}
                              </Radio>
                              <RadioComponent
                                profile={profile}
                                usdFee={totalServiceCost}
                              />
                            </Radio.Group>
                          </>
                        ) : (
                          <Radio.Group
                            onChange={currencyOnChange}
                            value={userCurrency === "ngn" ? 1 : 2}
                          >
                            {userCurrency === "ngn" ? (
                              <Radio value={1}>
                                {" "}
                                {formatToNaira(totalveriNiara)}
                              </Radio>
                            ) : userCurrency === "usd" ? (
                              // <Radio value={2}>
                              <RadioComponent
                                profile={profile}
                                usdFee={totalServiceCost}
                              />
                            ) : (
                              // </Radio>
                              ""
                            )}
                          </Radio.Group>
                        )}

                        {/* <Radio.Group onChange={currencyOnChange} value={value}>
                          <Radio value={1}>
                            {" "}
                            {formatToNaira(totalveriNiara)}
                          </Radio>
                          <RadioComponent
                            profile={profile}
                            usdFee={totalServiceCost}
                          />
                        </Radio.Group> */}
                        <Divider />
                      </>
                    ) : (
                      ""
                    )}
                    {currencyCheck == "USD" ? (
                      <>
                        <p>Exchange rate</p>
                        <p>
                          $1 USD =
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          }).format(exchangeRate)}{" "}
                          Naira{" "}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </InfoSec>
          </StyledForm>

          {isFormDataEmpty() ? (
            ""
          ) : (
            <Row
              justify="end"
              style={{ border: "1px solid #a9b3c1", marginBottom: "30px" }}
            >
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 7 }}
                lg={{ span: 7 }}
                style={{
                  textAlign: "left",
                  padding: "10px",
                }}
              >
                <strong>Select payment method:</strong>
                <div
                  style={{
                    borderRight: "1px solid #e8e8e8",
                    marginBottom: "15px",
                    paddingBottom: "15px",
                    paddingRight: "30px",
                  }}
                >
                  <Radio.Group
                    style={{ width: "100%" }}
                    onChange={handleRadioChange}
                    value={selectedValue}
                  >
                    <Radio
                      style={{
                        display: "block",
                        border: "1px solid #e8e8e8",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                        fontWeight: "bold", // Make the text bold
                      }}
                      value={1}
                    >
                      Payment from Wallet
                    </Radio>
                    <Radio
                      style={{
                        display: "block",
                        border: "1px solid #e8e8e8",
                        borderRadius: "5px",
                        padding: "10px",
                        fontWeight: "bold", // Make the text bold
                      }}
                      value={2}
                    >
                      Instant Payment
                      <Img
                        src={flutterwave}
                        alt={"flutter wave"}
                        width={100}
                        style={{ float: "right", paddingTop: "10px" }}
                      />
                    </Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 7 }}
                lg={{ span: 7 }}
                style={{
                  textAlign: "right",
                  padding: "10px",
                  paddingLeft: "30px",
                }}
              >
                <strong>
                  <Checkbox onChange={onChangePayment}>
                    I certify that I have read and accepted the{" "}
                    <span
                      style={{ color: "#09C93A", cursor: "pointer" }}
                      onClick={handleClickPrivacyPolicy}
                    >
                      e-citizen™ Privacy Policy
                    </span>{" "}
                    and{" "}
                    <span
                      style={{ color: "#09C93A", cursor: "pointer" }}
                      onClick={handleClickTerms}
                    >
                      Terms of Service
                    </span>
                  </Checkbox>
                  <Modal
                    title="Privacy Policy"
                    visible={isOpen}
                    centered
                    // open={open}
                    onOk={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    width={1000}
                  >
                    <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
                  </Modal>
                  <Modal
                    title="Terms of Service"
                    visible={isOpen2}
                    centered
                    // open={open}
                    onOk={() => setIsOpen2(false)}
                    onCancel={() => setIsOpen2(false)}
                    width={1000}
                  >
                    <div dangerouslySetInnerHTML={{ __html: termsOfService }} />
                  </Modal>
                </strong>

                {loading ? (
                  <Spin spinning={loading}></Spin>
                ) : (
                  <MainButtonFull
                    type="primary"
                    // htmlType="submit"
                    // onClick={handleSubmit}
                    onClick={handleMakePayment}
                    disabled={!checkboxChecked}
                    style={{
                      backgroundColor: checkboxChecked ? "#0DC939" : "#d9d9d9", // Set the colors based on checkbox state
                      borderColor: checkboxChecked ? "#0DC939" : "#d9d9d9",
                      cursor: checkboxChecked ? "pointer" : "not-allowed", // Change cursor based on checkbox state
                    }}
                  >
                    Payment
                  </MainButtonFull>
                )}
                <Modal
                  title="Wallet Balance Warning"
                  visible={isModalVisible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                >
                  <p>
                    Your wallet balance is low. Please recharge before making a
                    payment.
                  </p>
                </Modal>
              </Col>
              <PaymentModal />
              <PaymentModalFace />
            </Row>
          )}
        </Spin>
      </Container>
    </Row>
  );
};

export default DashboardPage;

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
  Modal,
  Flex,
  Tag,
  Alert,
  Spin,
} from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Notification from "../../Notification";
import {
  Container,
  Heading,
  Heading6,
  Img,
  InfoSec,
  MainButtonFull,
  StyledInput,
  StyledLabel,
  StyledForm,
} from "../../globalStyles";
import flutterwave from "../../images/flutterwave-logos-idVM8GW1LQ.png";
import flutterwaveWhite from "../../images/flutterwave-logos-white.png";

import {
  InfoCircleOutlined,
  CameraOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import banner from "../../images/NIN_verification_on_ecitizen.png";
import tick from "../../images/tick.png";
import clearvin from "../../images/clearvin.png";
import { useDispatch, useSelector } from "react-redux";
import {
  sendVerificationRequest,
  initiateVerificationRequest,
  completeVerificationRequest,
  fetchUserProfile,
  logout,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import privacyPolicy from "../../privacyPolicy";
import termsOfService from "../../termsOfService";
import Swal from "sweetalert2";
import ReactGA from "react-ga4";
import { UploadOutlined } from "@ant-design/icons";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import { trackEvent } from "../../hooks/analytics";
import baseUrl from "../../apiConfig";
import { apiPostInternalCall } from "../../apiUtils";

/* global Reach */

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      console.error("Upload error:", info.file.error);
      message.error(
        `${info.file.name} file upload failed. ${info.file.error.message}`
      );
    }
  },
  onDrop(e) {},
};

const dateFormat = "DD/MM/YYYY";

const DashboardPage = () => {
  const [fileName, setFileName] = useState("");
  const [fileUploadError, setFileUploadError] = useState("");
  const [rowCount, setRowCount] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { token } = theme.useToken();
  const { isDark } = useTheme();
  const { bgContainer, text, text3 } = token;

  const [hasPreviousUpload, setHasPreviousUpload] = useState(false);

  const countRows = (content) => {
    const rows = content.split("\n").filter((row) => row.trim() !== "");
    return rows.length;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileUploadError("");
    setRowCount(null);

    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setFileName(file.name);
        setFileUploaded(true);
        const reader = new FileReader();
        const base64Reader = new FileReader();
        base64Reader.onload = (e) => {
          const base64String = e.target.result.split(",")[1]; // Remove data URL prefix
          handleInputChange("nin_csv", base64String);
        };
        reader.onload = (e) => {
          const content = e.target.result;
          const count = countRows(content);
          setRowCount(count);
          localStorage.setItem("numberOfRowsFromDoc", count);
          setNumberOfRows(count); // Call with updated rowCount value
          setNinFilled(true);
          setTotalVAT((prevTotalVAT) => prevTotalVAT + ninVatFee * count);
          setTotalServiceCost(
            (prevTotalFees) => prevTotalFees + ninFee * count
          );
          setTotalveriNiara(
            (prevTotalFeesNaira) => prevTotalFeesNaira + ninUsdFee * count
          );
        };
        reader.onerror = () => {
          setFileUploadError("Error reading the file.");
        };
        const handleError = () => {
          setFileUploadError("Error reading the file.");
        };
        base64Reader.onerror = handleError;
        base64Reader.readAsDataURL(file);
        reader.readAsText(file);
      } else {
        setFileName("");
        setFileUploadError("Please select a CSV file.");
      }
    }
  };

  const handleChange = (event) => {
    handleFileChange(event);
    // const file = event.target.files[0];

    // if (file) {
    //   handleInputChange("nin_csv", "ll");
    // } else {
    //   handleInputChange("nin_csv", "ll");
    // }
  };
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
  const [phoneFee, setPhoneFee] = useState("");
  const [phoneServiceFee, setPhoneServiceFee] = useState("");
  const [ninUsdServiceFee, setUsdNinServiceFee] = useState("");
  const [ninVatFee, setNinVatFee] = useState("");
  const [phoneVatFee, setPhoneVatFee] = useState("");
  const [ninUsdFee, setNinUsdFee] = useState("");
  const [phoneUsdFee, setPhoneUsdFee] = useState("");
  const [ninUsdVatFee, setNinUsdVatFee] = useState("");
  const [ninProcessingFee, setNinProcessingFee] = useState("");
  const [phoneProcessingFee, setPhoneProcessingFee] = useState("");
  const [phoneUsdServiceFee, setPhoneUsdServiceFee] = useState("");
  const [phoneUsdVatFee, setPhoneUsdVatFee] = useState("");
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
  const [stolenCheckServiceFee, setStolenCheckServiceFee] = useState("");
  const [stolenCheckVatFee, setStolenCheckVatFee] = useState("");
  const [formData, setFormData] = useState({
    nin_csv: "",
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
    crc: "",
    firstCentral: "",
    creditRegistry: "",
  });

  const [ninFilled, setNinFilled] = useState(false);
  const [phoneFilled, setPhoneFilled] = useState(false);
  const [faceFilled, setFaceFilled] = useState(false);
  const [rcFilled, setRcFilled] = useState(false);
  const [businessNameFilled, setBusinessNameFilled] = useState(false);
  const [bvnFilled, setBvnFilled] = useState(false);
  const [vinFilled, setVinFilled] = useState(false);
  const [licenseNumberFilled, setLicenseNumberFilled] = useState(false);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalServiceCost, setTotalServiceCost] = useState(0);
  const [newTotalServiceCost, setNewTotalServiceCost] = useState(0);

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    handleInputChange("stolencheck", isChecked ? true : false); // Set stolencheck to true when checked, false otherwise
  };
  const handleCheckboxChangeCrc = (e) => {
    const isCheckedCrc = e.target.checked;
    setIsCheckedCrc(isCheckedCrc);

    handleInputChange("crc", isCheckedCrc ? true : false); // Set stolencheck to true when checked, false otherwise
  };
  const handleCheckboxChangeFirstCentral = (e) => {
    const isCheckedFirstCentral = e.target.checked;
    setIsCheckedFirstCentral(isCheckedFirstCentral);
    handleInputChange("firstCentral", isCheckedFirstCentral ? true : false); // Set stolencheck to true when checked, false otherwise
  };
  const handleCheckboxChangeCreditRegistry = (e) => {
    const isCheckedCreditRegistry = e.target.checked;
    setIsCheckedCreditRegistry(isCheckedCreditRegistry);
    handleInputChange("creditRegistry", isCheckedCreditRegistry ? true : false); // Set stolencheck to true when checked, false otherwise
  };

  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");

        const response = await apiPostInternalCall(
          `/transaction/service-prices`,
          { ipAddress },

          userToken
        );
        setLoadingPrice(false);
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
        setStolenCheckVatFee(response.data.data[7].VAT);
        setStolenCheckServiceFee(response.data.data[7].serviceFee);

        setPhoneFee(response.data.data[9].price);
        setPhoneServiceFee(response.data.data[9].serviceFee);
        setPhoneVatFee(response.data.data[9].VAT);
        setPhoneUsdFee(response.data.data[9].price2);
        setPhoneUsdServiceFee(response.data.data[9].serviceFee2);
        setPhoneUsdVatFee(response.data.data[9].VAT2);
      } catch (error) {
        console.error("Error fetching IP address:", error);

        setLoadingPrice(false);
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: "Unable to get Service Prices",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            // dispatch(fetchUserProfile(userToken));
            history.push("/main-dashboard");
          }
        });
      }
    };

    fetchServiceFee();
  }, []);

  useEffect(() => {
    // Store currencyCheck in localStorage
    localStorage.setItem("currencyCheck", currencyCheck);
  }, [currencyCheck]);

  const handleDateChange = (date, dateString) => {
    handleInputChange("dateOfBirth", dateString);
  };

  const user = useSelector((state) => state.user);
  const userDetails = useSelector((state) => state.userDetails);
  const userToken = user?.jwtToken || "";
  const tokenExpire = user?.expirationDate || "";
  const userEmail = user?.email || "";
  const userName = user?.firstName || "";
  const userPhone = user?.phone || "";
  const userNin = user?.nin || "";
  const userCurrency = userDetails?.currency || "";
  const userType = userDetails?.userType || "";

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Convert tokenExpire string to a Date object
    const expireDate = new Date(tokenExpire);

    // Get the current date/time
    const currentDate = new Date();

    // Compare the current date with the expiration date
    if (currentDate >= expireDate) {
      // If the current date is greater than or equal to the expiration date,
      // it means the token has expired
      dispatch(logout());
      history.push("/");
    } else {
    }
  }, []);

  //!---------- Performing the Verification --------- //

  // Function to handle form submission
  const handleSubmit = async (e) => {
    //setLoadingSmall(true);
    setLoading(true);
    try {
      const response = await dispatch(
        //* I just changed the function to use the new one from Patrick
        //! This is the new function that sends the verification request
        // sendVerificationRequest(formData, userToken)
        completeVerificationRequest(formData, userToken)
      );
      setLoading(false);
      dispatch(fetchUserProfile(userToken));
      if (
        response.basic &&
        response.basic.success &&
        response.basic.success === true
      ) {
        localStorage.setItem(
          "verificationRequestId",
          response.basic.data.requestId
        );

        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: response.basic.message,
          icon: "info",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/main-dashboard");
      } else if (
        response &&
        response.basic &&
        typeof response.basic.success === "boolean" &&
        response.basic.success === false
      ) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: response.basic.message,
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            // dispatch(fetchUserProfile(userToken));
            window.location.reload();
          }
        });
      } else if (
        response["search-extension"] &&
        response["search-extension"].phoneVerification &&
        response["search-extension"].phoneVerification.status === true
      ) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: response["search-extension"].phoneVerification.detail,
          icon: "info",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/main-dashboard");
      } else if (
        response["search-extension"] &&
        response["search-extension"].phoneVerification &&
        response["search-extension"].phoneVerification.status === false
      ) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text:
            response["search-extension"].phoneVerification.detail ||
            "Verification failed",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else if (
        response["search-extension"] &&
        response["search-extension"].bvnVerification &&
        response["search-extension"].bvnVerification.status === true
      ) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: response["search-extension"].bvnVerification.detail,
          icon: "info",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/main-dashboard");
      } else if (
        response["search-extension"] &&
        response["search-extension"].bvnVerification &&
        response["search-extension"].bvnVerification.status === false
      ) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text:
            response["search-extension"].bvnVerification.detail ||
            "Verification failed",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else if (response.business && response.business.success === false) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: response.business.message,
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

        history.push("/dashboard");
      } else if (response.business && response.business.success === true) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: "Your business verification request was successful.",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/main-dashboard");
      } else if (response.vehicle && response.vehicle.success === true) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: "Your vehicle verification request was successful.",
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        history.push("/main-dashboard");
      } else if (response.vehicle && response.vehicle.success === false) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: response.vehicle.message,
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else if (response.financial && response.financial.success === true) {
        Swal.fire({
          background: bgContainer,
          color: text,
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
          background: bgContainer,
          color: text,
          title: "Oops!",
          text: response.financial.message,
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            // dispatch(fetchUserProfile(userToken));
            window.location.reload();
          }
        });
      } else if (
        response.bulkNin &&
        response.bulkNin.status === "Bulk verification completed"
      ) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Success",
          text: response.bulkNin.status,
          icon: "success",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            // dispatch(fetchUserProfile(userToken));
            history.push("/main-dashboard");
          }
        });
      } else {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: "An unexpected server error occurred. A refund has been initiated",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.isConfirmed) {
            // dispatch(fetchUserProfile(userToken));
            window.location.reload();
          }
        });
      }
    } catch (error) {
      // Handle errors if needed
      setLoading(false);
      console.error("Error sending verification", error);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "An unexpected server error occurred. A refund has been initiated",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#0DC939",
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } finally {
      setLoading(false);
    }
  };

  //!---------- Performing the Verification End --------- //

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
  const [isCheckedCrc, setIsCheckedCrc] = useState(false);
  const [isCheckedFirstCentral, setIsCheckedFirstCentral] = useState(false);
  const [isCheckedCreditRegistry, setIsCheckedCreditRegistry] = useState(false);
  const [checkStolen, setCheckStolen] = useState(false);
  const [isConfirmedBtnClicked, setIsConfirmedBtnClicked] = useState(false);

  const [enableCrc, setEnableCrc] = useState(true);

  const onChangePayment = (e) => {
    setCheckboxChecked(e.target.checked);
  };
  const onChange = (e) => {
    e.preventDefault();

    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (isChecked) {
      setCheckStolen(true);
    } else {
      setCheckStolen(false);
    }
  }, [isChecked]);
  // const onChange2 = (e) => {
  //   setCheckboxCheckedConfirm(e.target.checked);
  // };

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  const tooltipContentVehicle = [
    "VIN: Choose this option to search for a vehicle's original information using a VIN. This includes the option of the stolen status of the vehicle.",
    "Registration: Choose this option to search for a vehicle's registration information in Nigeria using the vehicle registration number (license plate)",
  ];
  const tooltipContentBasic =
    "A Person Identity Profile gives the distinct characteristics, attributes and information that uniquely identifies an individual. Searchable parameters are NIN, demographics, face, fingerprint, and phone number.";
  const tooltipContentBusiness =
    "A business profile is a set of information and data that are used to confirm and validate the identity of a business or organization. Searchable parameters are registration number(RC), and business name.";
  const tooltipContentFinancial =
    "A financial credit profile is a report card that tells how responsible you are with borrowing and repaying money. It helps lenders decide if they can trust you with a loan or credit. Search parameter is bank verification number (BVN).";

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
      phone: phoneFee,
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
    } else if (profile === "phone") {
      localStorage.setItem("profile", profile);
      setServiceFee(phoneServiceFee); // Set the service fee for Phone
      setProcessingFee(phoneProcessingFee);
      setProfile("phone");
      setUsdFee(phoneUsdFee);
      setVat(phoneVatFee);
      setRawServiceFee(phoneFee);
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
        {profile === "phone" && `$ ${usdFee}`}
        {profile === "face" && `$ ${usdFee}`}
        {profile === "rc" && `$ ${usdFee}`}
        {profile === "business_name" && `$ ${usdFee}`}
        {profile === "bvn" && `$ ${usdFee}`}
        {profile === "vin" && `$ ${usdFee}`}
        {profile === "license_number" && `$ ${usdFee}`}
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
    setValue(e.target.value);

    if (e.target.value == 2) {
      setFlutterWaveCurrency("USD");
      // setCurrencyCheck("USD");
      setOutsideNgWithNiara(false);
    } else if (e.target.value == 1) {
      // setCurrencyCheck("NGN");
      setFlutterWaveCurrency("NGN");
      setOutsideNgWithNiara(true);

      setOutsideNgWithNiaraPrice(totalveriNiara);
      // setTotalServiceCost(totalveriNiara);
    }
  };

  const config = {
    //live key
    public_key: "FLWPUBK-3364bb9fdcbd08a92bbccbbcce686d40-X",
    //test key
    // public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}",
    amount:
      currencyCheck.toUpperCase() == "USD"
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
  const [paymentMethod, setPaymentmethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [totalveri, setTotalveri] = useState(0);
  const [totalveriNiara, setTotalveriNiara] = useState(0);
  const [additionalPriceAdded, setAdditionalPriceAdded] = useState(false);

  const showModal = () => {
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
    setMakingPayment(false);
    setIsConfirmedBtnClicked(false);
  };
  const handleCancelFace = () => {
    setModalVisibleFace(false);
  };

  useEffect(() => {
    if (checkStolen && !additionalPriceAdded) {
      // Add the additional costs
      setTotalServiceCost(
        (prevTotalServiceCost) => prevTotalServiceCost + stolenCheckFee
      );
      setTotalVAT((prevTotalVAT) => prevTotalVAT + stolenCheckVatFee);
      setvinVehicleServiceFee(
        (previnVehicleServiceFee) =>
          previnVehicleServiceFee + stolenCheckServiceFee
      );
      setAdditionalPriceAdded(true); // Set the flag to true to indicate that the additional price has been added
    } else if (!checkStolen && additionalPriceAdded) {
      // Remove the additional costs
      setTotalServiceCost(
        (prevTotalServiceCost) => prevTotalServiceCost - stolenCheckFee
      );
      setTotalVAT((prevTotalVAT) => prevTotalVAT - stolenCheckVatFee);
      setvinVehicleServiceFee(
        (previnVehicleServiceFee) =>
          previnVehicleServiceFee - stolenCheckServiceFee
      );
      setAdditionalPriceAdded(false); // Set the flag to false to indicate that the additional price has been removed
    }
  }, [checkStolen, additionalPriceAdded]);

  function generateTransactionId() {
    const length = 16; // total length including "EA"
    let transactionId = "EA";
    for (let i = 0; i < length - 2; i++) {
      transactionId += Math.floor(Math.random() * 10); // Append random number between 0 and 9
    }
    return transactionId;
  }
  const randomTransactionId = generateTransactionId();

  const handlePaymentMethod = async () => {
    // Ensure no duplicate state updates
    setModalVisible(false);
    setLoadingSmall(true);
    // handleCancel();
    // setLoading(true);
    if (paymentMethod !== null) {
      // Log the selected payment method
      const userBalance = userDetails?.walletBalance || 0;
      const areNoneChecked = () => {
        return (
          !isCheckedCrc && !isCheckedFirstCentral && !isCheckedCreditRegistry
        );
      };

      //!!WALLET PAYMENT START

      if (paymentMethod === 1) {
        // setLoading(true);
        localStorage.setItem("transactionID", randomTransactionId);
        localStorage.setItem("paymentType", "WALLET");
        const apiUrl = `${baseUrl}/transaction/wallet-payment`;

        const requestBody = {
          sessionCode: localStorage.getItem("sessionCode"),
          userNIN: userNin,
          transactionID: randomTransactionId,
          amount:
            userCurrency.toUpperCase() === "NGN" &&
            currencyCheck.toUpperCase() === "NGN"
              ? totalServiceCost
              : currencyCheck.toUpperCase() === "USD" &&
                userCurrency.toUpperCase() === "NGN"
              ? totalveriNiara
              : currencyCheck.toUpperCase() === "USD" &&
                userCurrency.toUpperCase() === "USD"
              ? totalServiceCost
              : userCurrency.toUpperCase() === "NGN" &&
                currencyCheck.toUpperCase() !== "NGN"
              ? outsideNgWithNiaraPrice
              : totalServiceCost,
        };

        if (bvnFilled) {
          if (areNoneChecked()) {
            setLoading(false);
            setIsConfirmedBtnClicked(false);
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Error",
              text: "At least one Credit Bereau must be selected",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            return;
          }
        }
        if (
          currencyCheck.toUpperCase() === "NGN" &&
          userCurrency.toUpperCase() === "USD"
        ) {
          setLoading(false);
          setIsConfirmedBtnClicked(false);
          handleCancel();
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Error",
            text: "Wallet currency doesn't match purchase currency. Please use the right currency for this transaction.",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          return;
        }

        //!!-------------------- Check for Wallet balance ------------------//
        if (
          userBalance.toLocaleString() <
          (userCurrency.toUpperCase() === "NGN" &&
          currencyCheck.toUpperCase() === "NGN"
            ? totalServiceCost
            : currencyCheck.toUpperCase() === "USD" &&
              userCurrency.toUpperCase() === "NGN"
            ? totalveriNiara
            : currencyCheck.toUpperCase() === "USD" &&
              userCurrency.toUpperCase() === "USD"
            ? totalServiceCost
            : userCurrency.toUpperCase() === "NGN" &&
              currencyCheck.toUpperCase() !== "NGN"
            ? outsideNgWithNiaraPrice
            : totalServiceCost)
        ) {
          setLoading(false);
          setIsConfirmedBtnClicked(false);
          handleCancel();
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Wallet Balance Low",
            text: "Your wallet balance is low. Please recharge before making a payment.",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          return;
        }
        //!!-------------------- Check for Wallet balance End ------------------//

        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(requestBody),
          });

          const data = await response.json();

          if (response.ok && data.status === "success") {
            //!------------------- Do the Verification ------------------------//
            handleSubmit();
            //!------------------- Do the Verification End ------------------------//
          } else {
            setLoading(false);
            setIsConfirmedBtnClicked(false);
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Payment failed",
              text: data,
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
          setIsConfirmedBtnClicked(false);
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Error",
            text: error,
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } finally {
          handleCancel();

          setLoading(false);
        }
      } //!!WALLET PAYMENT ENDS
      else if (paymentMethod === 2) {
        //!!LIVE PAYMENT START
        const postData = {
          amount:
            currencyCheck.toUpperCase() === "USD"
              ? outsideNgWithNiara === true
                ? `${outsideNgWithNiaraPrice}`
                : `${totalServiceCost}`
              : `${totalServiceCost}`,
          currency: flutterWaveCurrency,
          country: "NG",
          description: "Payment for verification",
          payment_method: "card,mobilemoney,ussd",
          type: "VERIFICATION",
          sessionCode: localStorage.getItem("sessionCode"),
        };

        if (bvnFilled) {
          if (areNoneChecked()) {
            setLoading(false);
            setIsConfirmedBtnClicked(false);
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Error",
              text: "At least one Credit Bereau must be selected",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            return;
          }
        }
        handleCancel();
        try {
          const response = await fetch(`${baseUrl}/payment/initiate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(postData),
          });

          // Check if the request was successful (status code 200-299)
          if (response.ok) {
            const responseData = await response.json();
            if (responseData.status === "success") {
              if (responseData.data && responseData.data.link) {
                setPaymentUrl(responseData.data.link);
                setTransactionRef(responseData.data.txRef);
                localStorage.setItem("transactionID", responseData.data.txRef);
                localStorage.setItem("paymentType", "INSTANT");

                //!------------- Open the FlutterWave modal for payment --------------//
                setOpenFlutterwaveModal(true);

                //!------------- Open the FlutterWave modal for payment End --------------//
              } else {
                console.error("Response data does not contain a link");
                Swal.fire({
                  background: bgContainer,
                  color: text,
                  title: "Error",
                  text: "Response data does not contain a link",
                  icon: "error",
                  customClass: {
                    confirmButton: "custom-swal-button",
                  },
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: true,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#0DC939",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
                return;
              }
            } else {
              Swal.fire({
                background: bgContainer,
                color: text,
                title: "Error",
                text: "Failed to initialize payment",
                icon: "error",
                customClass: {
                  confirmButton: "custom-swal-button",
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#0DC939",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              return;
            }
          } else {
            // Handle errors here
            console.error("Failed to post data:", response.statusText);
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Error",
              text: "Failed to initialize payment",
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            return;
          }
        } catch (error) {
          console.error("An error occurred:", error);
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Error",
            text: "Failed to initialize payment",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: "#0DC939",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          return;
        }
        setIsConfirmedBtnClicked(false);
        handleCancel();
      }
      //!!LIVE PAYMENT ENDS
    }
  };

  const handleMakePayment = () => {
    if (!checkboxCheckedConfirm) {
      return (
        <Alert message="Kindly select a payment method" type="info" showIcon />
      );
    }

    setMakingPayment(true);

    // Your existing logic for handling the payment
    // Calculate total veri based on form data
    const formDataFees = {
      nin: ninFee,
      phone: phoneFee,
      vin: vinVehicleFee,
      license_number: vehicleFee,
      rc: businessFee,
      business_name: businessFee,
      bvn: financialFee,
      face: faceFee,
    };

    const formDataUsdFees = {
      nin: ninUsdFee,
      phone: phoneUsdFee,
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

    if (currencyCheck.toUpperCase() === "USD") {
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
        typeof formData.nin_csv === "string" &&
        formData.nin_csv.trim() !== "" &&
        formDataUsdFees.nin !== undefined
      ) {
        setIsBasicOn(true);
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
        typeof formData.phone === "string" &&
        formData.phone.trim() !== "" &&
        formDataUsdFees.phone !== undefined
      ) {
        setIsBasicOn(true);
        // Add the fee for 'phone' to the totalveri
        calculatedTotalveri += formDataUsdFees.phone;
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
        typeof formData.phone === "string" &&
        formData.phone.trim() !== "" &&
        formDataUsdFees.phone !== undefined
      ) {
        setIsBasicOn(true);
        // Add the fee for 'phone' to the totalveri
        calculatedTotalveri += formDataUsdFees.phone;
        setTotalveri(calculatedTotalveri);
      }
      if (
        typeof formData.nin_csv === "string" &&
        formData.nin_csv.trim() !== "" &&
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
    setLoadingModal(true);
    // Show the modal
    dispatch(fetchUserProfile(userToken))
      .then(() => {
        setLoadingModal(false);
        showModal();
      })
      .catch((error) => {
        // Handle error if dispatch fails
        console.error("Error fetching user profile:", error);
      });
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
    setPaymentmethod(e.target.value);
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
      maskClosable={false}
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
          <ol style={{ fontSize: "17px" }}>
            {isBasicOn || isFinancialOn ? (
              <li style={{ padding: "20px" }}>
                You confirm that you understand and accept that{" "}
                <span style={{ fontWeight: "bold" }}>consent is required</span>{" "}
                from the data subject being verified before you can access their
                data, and you accept that will not be refunded if consent is
                withheld.
              </li>
            ) : (
              ""
            )}

            <li style={{ padding: "20px" }}>
              You confirm and accept that the{" "}
              <span style={{ fontWeight: "bold" }}>
                search details are correct
              </span>
              , and you accept that you will not be refunded for incorrect
              information
            </li>
            <li style={{ padding: "20px" }}>
              You understand and accept that{" "}
              <span style={{ fontWeight: "bold" }}>
                search details may come back without any data
              </span>
              , and you accept that you will not be refunded
            </li>
          </ol>

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
              <li style={{ padding: "20px" }}>
                By clicking, you indicate that you understand and accept that
                consent is required from the data subject being verified before
                you can access their data.
              </li>
            ) : (
              ""
            )}

            <li style={{ padding: "20px" }}>
              You confirm that search details are correct, and you confirm that
              you will not be refunded for incorrect information or lack of
              consent
            </li>
            <li style={{ padding: "20px" }}>
              You understand and accept the following{" "}
              <b>
                terms and conditions pertaining to ClearVIN’s vehicle history
                data (Licensed Data):
              </b>
              <ol>
                <li style={{ padding: "20px" }}>
                  You may not provide Licensed Data to other persons
                </li>
                <li style={{ padding: "20px" }}>
                  You may only use Licensed Data for your internal business
                  purposes or provide Licensed Data to other organizations for
                  the internal business uses of those organizations.
                </li>
                <li style={{ padding: "20px" }}>
                  You warrant that you shall not furnish or sell Licensed Data
                  to members of the public.
                </li>
                <li>You understand that</li>
                <ol type="a">
                  <li style={{ padding: "20px" }}>
                    e-citizen’s vendor, ClearVin, LLC (“CV”), is an approved
                    NMVTIS Data Provider,
                  </li>
                  <li style={{ padding: "20px" }}>
                    some state data pertaining to a VIN may not be contained in
                    or available through NMVTIS,
                  </li>
                  <li style={{ padding: "20px" }}>
                    some state data is provided to NMVTIS via a daily, weekly or
                    monthly format and therefore may not be current,
                  </li>
                  <li style={{ padding: "20px" }}>
                    some of the entities which report data to NMVTIS may have
                    failed to provide such data for incorporation in NMVTIS, and
                  </li>
                  <li style={{ padding: "20px" }}>
                    AAMVA, CV’s vendor, and CV have no control over the accuracy
                    or completeness of data contained in NMVTIS and shall not
                    have any liability to any Licensee, Affiliate, user or third
                    party concerning the quality, completeness or accuracy of
                    Licensed Data.
                  </li>
                </ol>
                <li>You understand that:</li>
                <ol type="a">
                  <li style={{ padding: "20px" }}>
                    e-citizen™ is not an Approved NMVTIS Data Provider,
                  </li>
                  <li style={{ padding: "20px" }}>
                    e-citizen™ has obtained the NMVTIS data contained in the
                    Licensed Data from an Approved NMVTIS Data Provider, and
                  </li>
                  <li style={{ padding: "20px" }}>
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
        <Spin spinning={loadingSmall}>
          <Button
            type="primary"
            // onClick={handlePaymentMethod}
            onClick={async () => {
              setIsConfirmedBtnClicked(true);
              setModalVisible(false);
              try {
                const response = await dispatch(
                  initiateVerificationRequest(formData, userToken)
                );
                setIsConfirmedBtnClicked(false);
                if (response?.sessionStatus == "INITIATED") {
                  localStorage.setItem("sessionCode", response?.sessionCode);
                  setIsConfirmedBtnClicked(false);
                  handlePaymentMethod();
                }
              } catch (error) {}
            }}
            disabled={isConfirmedBtnClicked}
            style={{
              marginRight: 10,
              backgroundColor: isConfirmedBtnClicked ? "#d9d9d9" : "#0DC939",
              borderColor: isConfirmedBtnClicked ? "#d9d9d9" : "#0DC939",
              cursor: isConfirmedBtnClicked ? "not-allowed" : "pointer",
            }}
          >
            Confirm
          </Button>
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </Spin>
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
          value={paymentMethod}
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
          <li style={{ padding: "20px" }}>
            By clicking, you indicate that you understand and accept that
            consent is required from the data subject being verified before you
            can access their data.
          </li>

          <li style={{ padding: "20px" }}>
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
    if (basicProfileArray.length > 0) {
      // Log the value being removed

      if (basicProfileArray[basicProfileArray.length - 1] === "nin") {
        setNinFilled(false);
        if (formData.nin !== "") {
          // Update total VAT
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - ninVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - ninFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });
          setTotalveriNiara((prevTotalFees) => {
            const newTotalFees = prevTotalFees - ninUsdFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
          });
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          nin: "", // Assuming "rc" is the name of the field you want to set to empty string
        }));
      }
      if (basicProfileArray[basicProfileArray.length - 1] === "nin") {
        setFaceFilled(false);
        if (formData.nin !== "") {
          // Update total VAT
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - ninVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - ninFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });
          setTotalveriNiara((prevTotalFees) => {
            const newTotalFees = prevTotalFees - ninUsdFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
          });
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          nin: "",
          nin_csv: "",
        }));
      }
      if (basicProfileArray[basicProfileArray.length - 1] === "phone") {
        setFaceFilled(false);
        if (formData.phone !== "") {
          // Update total VAT
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - phoneVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - phoneFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });
          setTotalveriNiara((prevTotalFees) => {
            const newTotalFees = prevTotalFees - phoneUsdFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
          });
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          phone: "",
          phone_csv: "",
        }));
      }
    }

    setPaymentmethod(value);
    if (basicProfileArray.length > 0) {
      const newArray = [...basicProfileArray];
      newArray[basicProfileArray.length - 1] = value;
      setBasicProfileArray(newArray);
    } else {
      setBasicProfileArray([value]);
    }
  };
  const handleBusinessProfileRadioChange = (value) => {
    if (businessProfileArray.length > 0) {
      // Log the value being removed

      // Check if the value being removed is "rc"
      if (businessProfileArray[businessProfileArray.length - 1] === "rc") {
        setRcFilled(false);

        if (formData.rc !== "") {
          // Update total VAT
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - businessVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });

          // Update total service cost
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - businessFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });

          // Update total verification cost
          setTotalveriNiara((prevTotalFees) => {
            const newTotalFees = prevTotalFees - businessUsdFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
          });
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          rc: "", // Assuming "rc" is the name of the field you want to set to empty string
        }));
      }
      if (
        businessProfileArray[businessProfileArray.length - 1] ===
        "business_name"
      ) {
        setBusinessNameFilled(false);

        if (formData.business_name !== "") {
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - businessNameVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - businessNameFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });
          setTotalveriNiara((prevTotalFees) => {
            const newTotalFees = prevTotalFees - businessNameUsdFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
          });
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
          business_name: "", // Assuming "rc" is the name of the field you want to set to empty string
        }));
      }
    }

    // Set the new value
    setBusinessSelectedValue(value);

    // Update the array
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
    if (vehicleProfileArray.length > 0) {
      // Log the value being removed

      // Check if the value being removed is "rc"
      if (vehicleProfileArray[vehicleProfileArray.length - 1] === "vin") {
        setVinFilled(false);

        if (formData.vin !== "") {
          // Update total VAT
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - vinVehicleVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - vinVehicleFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });
          // Subtract USD fees
          setTotalveriNiara((prevTotalFees) => prevTotalFees - vinVehicleFee);
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          vin: "", // Assuming "rc" is the name of the field you want to set to empty string
        }));
      }
      if (
        vehicleProfileArray[vehicleProfileArray.length - 1] === "license_number"
      ) {
        setLicenseNumberFilled(false);

        if (formData.license_number !== "") {
          // Update total VAT
          setTotalVAT((prevTotalVAT) => {
            const newTotalVAT = prevTotalVAT - vehicleVatFee;
            return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
          });
          setTotalServiceCost((prevTotalFees) => {
            const newTotalFees = prevTotalFees - vehicleFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
          });
          setTotalveriNiara((prevTotalFees) => {
            const newTotalFees = prevTotalFees - vehicleUsdFee;
            return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
          });
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          license_number: "", // Assuming "rc" is the name of the field you want to set to empty string
        }));
      }
    }
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
    setBasicProfileArray([]); // Clears basic profile array
    setFormData({ ...formData, nin: "" }); // Clears the nin field in the form data
    setPaymentmethod(null); // Clears selected value
    setNinFilled(false); // Sets ninFilled state to false
    setFaceFilled(false); // Sets faceFilled state to false
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - ninVatFee;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - ninFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - ninUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputPhone = () => {
    setBasicProfileArray([]); // Clears basic profile array
    setFormData({ ...formData, phone: "" }); // Clears the phone field in the form data
    setPaymentmethod(null); // Clears selected value
    setPhoneFilled(false); // Sets phoneFilled state to false
    setFaceFilled(false); // Sets faceFilled state to false
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - phoneVatFee;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - phoneFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - phoneUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputBulkNin = () => {
    const numberCSV = localStorage.getItem("numberOfRowsFromDoc");
    handleInputChange("nin_csv", "");
    setFileUploaded(false);
    setFileName("");
    setRowCount(null);
    setFileUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setBasicProfileArray([]); // Clears basic profile array
    setFormData({ ...formData, nin: "" }); // Clears the nin field in the form data
    setPaymentmethod(null); // Clears selected value
    setNinFilled(false); // Sets ninFilled state to false
    setFaceFilled(false); // Sets faceFilled state to false
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - ninVatFee * numberCSV;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - ninFee * numberCSV;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - ninUsdFee * numberCSV;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputBusinessrc = () => {
    setBusinessProfileArray([]); // Clears business profile array
    setFormData({ ...formData, rc: "" }); // Clears the rc field in the form data
    setBusinessSelectedValue(null); // Clears business selected value
    setRcFilled(false); // Sets rcFilled state to false
    setBusinessNameFilled(false); // Sets businessNameFilled state to false
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - businessVatFee;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - businessFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - businessUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputBusinessbusiness_name = () => {
    setBusinessProfileArray([]); // Clears business profile array
    setFormData({ ...formData, business_name: "" }); // Clears the business_name field in the form data
    setBusinessSelectedValue(null); // Clears business selected value
    setRcFilled(false); // Sets rcFilled state to false
    setBusinessNameFilled(false); // Sets businessNameFilled state to false

    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - businessVatFee;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - businessFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - businessUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputFinancial = () => {
    setFinancialProfileArray([]); // Clears financial profile array
    setFormData({ ...formData, bvn: "" }); // Clears the bvn field in the form data
    setFinancialSelectedValue(null); // Clears financial selected value
    setBvnFilled(false); // Sets bvnFilled state to false
    setPrevNumberOfCheckedCheckboxes(0);
    setIsCheckedCrc(false);
    setIsCheckedCreditRegistry(false);
    setIsCheckedFirstCentral(false);
    // setTotalVAT((prevTotalVAT) => {
    //   const newTotalVAT = prevTotalVAT - financialVatFee;
    //   return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    // });
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT =
        prevNumberOfCheckedCheckboxes === 2
          ? prevTotalVAT - 226
          : prevNumberOfCheckedCheckboxes === 3
          ? prevTotalVAT - 339
          : prevTotalVAT - financialVatFee;

      const totalVAT = newTotalVAT < 0 ? 0 : newTotalVAT;
      return totalVAT;
    });
    // setTotalServiceCost((prevTotalFees) => {
    //   const newTotalFees = prevTotalFees - financialFee;
    //   return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    // });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees =
        prevNumberOfCheckedCheckboxes === 2
          ? prevTotalFees - 3000
          : prevNumberOfCheckedCheckboxes === 3
          ? prevTotalFees - 4500
          : prevTotalFees - financialFee; // Subtract financialVatFee otherwise

      const totalVAT = newTotalFees < 0 ? 0 : newTotalFees;
      return totalVAT;
    });

    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - financialUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputVehiclelicense_number = () => {
    setVehicleProfileArray([]); // Clears vehicle profile array
    setFormData({ ...formData, license_number: "" }); // Clears the license_number field in the form data
    setVehicleSelectedValue(null); // Clears vehicle selected value
    setVinFilled(false); // Sets vinFilled state to false
    setLicenseNumberFilled(false); // Sets licenseNumberFilled state to false
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - vehicleVatFee;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - vehicleFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - vehicleUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const clearInputVehiclevin = () => {
    setVehicleProfileArray([]); // Clears vehicle profile array
    setFormData({ ...formData, vin: "" }); // Clears the vin field in the form data
    setVehicleSelectedValue(null); // Clears vehicle selected value
    setVinFilled(false); // Sets vinFilled state to false
    setLicenseNumberFilled(false); // Sets licenseNumberFilled state to false

    // Check if currency is USD, then subtract fees accordingly
    if (currencyCheck.toUpperCase() === "USD") {
      if (isChecked) {
        setTotalVAT((prevTotalVAT) => {
          const newTotalVAT = prevTotalVAT - vinVehicleVatFee;
          return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
        });
        setTotalServiceCost((prevTotalFees) => {
          const newTotalFees = prevTotalFees - (vinVehicleFee + stolenCheckFee);
          return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
        });
      } else {
        setTotalVAT((prevTotalVAT) => {
          const newTotalVAT = prevTotalVAT - vinVehicleVatFee;
          return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
        });
        setTotalServiceCost((prevTotalFees) => {
          const newTotalFees = prevTotalFees - vinVehicleFee;
          return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
        });
      }
      setIsChecked(false);
    } else {
      // If currency is not USD, subtract fees similarly
      if (isChecked) {
        setTotalVAT((prevTotalVAT) => {
          const newTotalVAT = prevTotalVAT - vinVehicleVatFee;

          return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
        });
        setTotalServiceCost((prevTotalFees) => {
          const newTotalFees = prevTotalFees - vinVehicleFee;
          return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
        });

        // setvinVehicleServiceFee(
        //   (previnVehicleServiceFee) =>
        //     previnVehicleServiceFee - stolenCheckServiceFee
        // );
        setIsChecked(false);
      } else {
        setTotalVAT((prevTotalVAT) => {
          const newTotalVAT = prevTotalVAT - vinVehicleVatFee;
          return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
        });
        setTotalServiceCost((prevTotalFees) => {
          const newTotalFees = prevTotalFees - vinVehicleFee;
          return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
        });
        // setvinVehicleServiceFee(
        //   (previnVehicleServiceFee) =>
        //     previnVehicleServiceFee - stolenCheckServiceFee
        // );
      }
      setIsChecked(false);
    }

    // Subtract USD fees
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
  const [openFlutterwaveModal, setOpenFlutterwaveModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const liveCaptureUrl = `https://e-citizen.ng:9443/${liveFaceNin}/ecitizen/${userToken}`;

  if (loading) {
    Swal.fire({
      background: bgContainer,
      color: text,
      title: "Please Wait",
      text: "Verification in progress",
      icon: "info",
      showCloseButton: true,
      background: bgContainer,
      color: text,
      allowOutsideClick: false, // Prevents closing by clicking outside
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        confirmButton: "custom-swal-button",
      },
    }).then((result) => {
      // Check if the modal is closed by clicking the close button
      if (result.dismiss === Swal.DismissReason.close) {
        // Close the modal
        Swal.close();
        // Refresh the page
        window.location.reload();
      }
    });
  }

  const autoRemoveBusinessName = () => {
    setTotalVAT((prevTotalVAT) => {
      const newTotalVAT = prevTotalVAT - businessVatFee;
      return newTotalVAT < 0 ? 0 : newTotalVAT; // Ensure total VAT doesn't go below 0
    });
    setTotalServiceCost((prevTotalFees) => {
      const newTotalFees = prevTotalFees - businessFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total service cost doesn't go below 0
    });
    setTotalveriNiara((prevTotalFees) => {
      const newTotalFees = prevTotalFees - businessUsdFee;
      return newTotalFees < 0 ? 0 : newTotalFees; // Ensure total verification cost doesn't go below 0
    });
  };

  const onChangeCheckBox = (checkedValues) => {
    const updatedFormData = {
      ...formData,
      crc: checkedValues.includes("crc"),
      creditRegistry: checkedValues.includes("creditRegistry"),
      firstCentral: checkedValues.includes("firstCentral"),
    };
  };

  const handleModalNewOk = async () => {
    setOpenFlutterwaveModal(false);

    try {
      const response = await fetch(
        `${baseUrl}/payment/check?transactionRef=${transactionRef}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Check if the request was successful (status code 200-299)
      if (!response.ok) {
        Swal.fire({
          background: bgContainer,
          color: text,
          title: "Error",
          text: "Payment Cancelled or Declined",
          icon: "error",
          customClass: {
            confirmButton: "custom-swal-button",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#0DC939",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        return;
      }
      if (response.ok) {
        // setLoading(true);
        const responseData = await response.json();
        if (responseData.status === "success") {
          if (
            responseData.data &&
            (responseData.data.status === "success" ||
              responseData.data.status === "successful")
          ) {
            //!--------- Performing the verification only when payment is successfull -------//
            // dispatch(fetchUserProfile(userToken));
            handleSubmit();
            //!--------- Performing the verification only when payment is successfull end -------//
          } else {
            Swal.fire({
              background: bgContainer,
              color: text,
              title: "Failed Payment",
              text: responseData.data.processor_response,
              icon: "error",
              customClass: {
                confirmButton: "custom-swal-button",
              },
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
              confirmButtonColor: "#0DC939",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            return;
          }
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "There was an issue making payment",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#0DC939",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      return;
    }
  };

  const [prevNumberOfCheckedCheckboxes, setPrevNumberOfCheckedCheckboxes] =
    useState(0);

  // Check the status of checkboxes
  useEffect(() => {
    // Define a function to count the checked checkboxes
    function checkCheckedCheckboxes() {
      let checkedCount = 0;

      if (isCheckedCrc) {
        checkedCount++;
      }

      if (isCheckedFirstCentral) {
        checkedCount++;
      }

      if (isCheckedCreditRegistry) {
        checkedCount++;
      }

      // Return the number of checked checkboxes
      return checkedCount;
    }

    // Call the function to check the number of checked checkboxes
    const numberOfCheckedCheckboxes = checkCheckedCheckboxes();

    // Check if all three checkboxes are checked
    const allThreeChecked = numberOfCheckedCheckboxes === 3;

    // Update state based on checkbox status
    if (numberOfCheckedCheckboxes >= 2 && !allThreeChecked) {
      if (prevNumberOfCheckedCheckboxes === 1) {
        // When moving from 1 to 2 or more, double the state values
        setTotalVAT(
          currencyCheck.toUpperCase() === "USD"
            ? (prevTotalVAT) => prevTotalVAT + 0.15
            : (prevTotalVAT) => prevTotalVAT + 113
        );
        setTotalServiceCost(
          currencyCheck.toUpperCase() === "USD"
            ? (prevTotalServiceCost) => prevTotalServiceCost + 1.99
            : (prevTotalServiceCost) => prevTotalServiceCost + 1500
        );
      }
    } else if (
      prevNumberOfCheckedCheckboxes >= 2 &&
      numberOfCheckedCheckboxes < 2
    ) {
      // When moving from 2 or more to less than 2, divide by 2 to restore previous values
      setTotalVAT(
        currencyCheck.toUpperCase() === "USD"
          ? (prevTotalVAT) => prevTotalVAT - 0.15
          : (prevTotalVAT) => prevTotalVAT - 113
      );
      setTotalServiceCost(
        currencyCheck.toUpperCase() === "USD"
          ? (prevTotalServiceCost) => prevTotalServiceCost - 1.99
          : (prevTotalServiceCost) => prevTotalServiceCost - 1500
      );
    }

    if (
      numberOfCheckedCheckboxes === 3 &&
      prevNumberOfCheckedCheckboxes !== 3
    ) {
      // Multiply the state values by 3
      setTotalVAT(
        currencyCheck.toUpperCase() === "USD"
          ? (prevTotalVAT) => prevTotalVAT + 0.15
          : (prevTotalVAT) => prevTotalVAT + 113
      );
      setTotalServiceCost(
        currencyCheck.toUpperCase() === "USD"
          ? (prevTotalServiceCost) => prevTotalServiceCost + 1.99
          : (prevTotalServiceCost) => prevTotalServiceCost + 1500
      );
    } else if (
      prevNumberOfCheckedCheckboxes === 3 &&
      numberOfCheckedCheckboxes !== 3
    ) {
      // When moving from 3 to less than 3, divide by 3 to restore previous values
      setTotalVAT(
        currencyCheck.toUpperCase() === "USD"
          ? (prevTotalVAT) => prevTotalVAT - 0.15
          : (prevTotalVAT) => prevTotalVAT - 113
      );
      setTotalServiceCost(
        currencyCheck.toUpperCase() === "USD"
          ? (prevTotalServiceCost) => prevTotalServiceCost - 1.99
          : (prevTotalServiceCost) => prevTotalServiceCost - 1500
      );
    }

    // Update previous number of checked checkboxes
    setPrevNumberOfCheckedCheckboxes(numberOfCheckedCheckboxes);

    // Log the state changes for debugging
  }, [
    isCheckedCrc,
    isCheckedFirstCentral,
    isCheckedCreditRegistry,
    prevNumberOfCheckedCheckboxes,
    totalVAT,
    totalServiceCost,
  ]);
  const [numberOfRows, setNumberOfRows] = useState(1);
  const handleInputChange = async (name, value) => {
    // const hadPreviousValue = formData[name].trim() !== "";

    const numberCSV = await localStorage.getItem("numberOfRowsFromDoc");

    const hadPreviousValue =
      typeof formData[name] === "string" && formData[name].trim() !== "";

    // if (name === "nin_csv") {
    //   if (!hadPreviousValue && value.trim() !== "") {
    //     setNinFilled(true);
    //     setTotalVAT((prevTotalVAT) => prevTotalVAT + ninVatFee);
    //     setTotalServiceCost((prevTotalFees) => prevTotalFees + ninFee);
    //     setTotalveriNiara(
    //       (prevTotalFeesNaira) => prevTotalFeesNaira + ninUsdFee
    //     );
    //   }
    //   if (hadPreviousValue && value.trim() !== "") {
    //     setNinFilled(true);
    //     setTotalVAT((prevTotalVAT) => prevTotalVAT + ninVatFee);
    //     setTotalServiceCost((prevTotalFees) => prevTotalFees + ninFee);
    //     setTotalveriNiara(
    //       (prevTotalFeesNaira) => prevTotalFeesNaira + ninUsdFee
    //     );
    //   } else if (hadPreviousValue && value.trim() === "") {
    //     setNinFilled(false);
    //     setTotalVAT((prevTotalVAT) => prevTotalVAT - ninVatFee);
    //     setTotalServiceCost((prevTotalFees) => prevTotalFees - ninFee);
    //     setTotalveriNiara(
    //       (prevTotalFeesNaira) => prevTotalFeesNaira - ninUsdFee
    //     );
    //   }
    // }
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
        setTotalVAT((prevTotalVAT) => prevTotalVAT - ninVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - ninFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - ninUsdFee
        );
      }
    }
    if (name === "phone") {
      if (!hadPreviousValue && value.trim() !== "") {
        setPhoneFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + phoneVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees + phoneFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira + phoneUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setPhoneFilled(false);
        setTotalVAT((prevTotalVAT) => prevTotalVAT - phoneVatFee);
        setTotalServiceCost((prevTotalFees) => prevTotalFees - phoneFee);
        setTotalveriNiara(
          (prevTotalFeesNaira) => prevTotalFeesNaira - phoneUsdFee
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
      // Update state based on 'hadPreviousValue' and 'value'
      if (!hadPreviousValue && value.trim() !== "") {
        setEnableCrc(false);
        setBvnFilled(true);
        setTotalVAT((prevTotalVAT) => prevTotalVAT + financialVatFee);
        setTotalServiceCost(
          (prevTotalServiceCost) => prevTotalServiceCost + financialFee
        );
        setTotalveriNiara(
          (prevTotalveriNiara) => prevTotalveriNiara + financialUsdFee
        );
      } else if (hadPreviousValue && value.trim() === "") {
        setBvnFilled(false);
        setTotalServiceCost(
          (prevTotalServiceCost) => prevTotalServiceCost - financialFee
        );
        setTotalVAT((prevTotalVAT) => prevTotalVAT - financialVatFee);
        setTotalveriNiara(
          (prevTotalveriNiara) => prevTotalveriNiara - financialUsdFee
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

  const [makingPayment, setMakingPayment] = useState(false);

  return (
    <Row style={{ backgroundColor: bgContainer }}>
      <Col>
        <Img src={banner} />
      </Col>

      <Container $token={token}>
        <Spin
          spinning={loadingPrice}
          tip="Getting Service Prices ..."
          colorBgMask="red"
          style={{
            fontSize: "85px",
            fontWeight: "bold",
            color: text,
          }}
        >
          <Spin
            spinning={loadingModal}
            colorBgMask="red"
            style={{
              fontSize: "85px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <StyledForm>
              <InfoSec>
                <Heading $token={token}>Identity Verification Service</Heading>

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
                        <Heading6 $token={token}>How to verify</Heading6>
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
                    <Heading6 $token={token}> Select Profile</Heading6>
                    <Notification />

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
                        <Col span={21}>Person Identity Profile</Col>
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
                          value={paymentMethod}
                          onChange={(e) =>
                            handleBasicProfileRadioChange(e.target.value)
                          }
                        >
                          <Space direction="vertical">
                            <Radio
                              value="nin"
                              size="large"
                              onClick={() => {
                                trackEvent({
                                  action: "click_nin_button",
                                  category: "Person Identity Profile",
                                  label: "NIN Button",
                                  value: 1,
                                });
                                setSelectedForm("nin");
                              }}
                            >
                              National Identification Number (NIN)
                            </Radio>
                            <Radio
                              value="phone"
                              size="large"
                              onClick={() => {
                                trackEvent({
                                  action: "click_phone_number_button",
                                  category: "Person Identity Profile",
                                  label: "Phone Number Button",
                                  value: 1,
                                });
                                setSelectedForm("phone");
                              }}
                            >
                              Phone Number
                            </Radio>

                            {userType.toLowerCase() != "individual" ? (
                              <Radio
                                value="bulk_nin"
                                size="large"
                                onClick={() => setSelectedForm("bulk_nin")}
                              >
                                National Identification Number{" "}
                                <strong>(Bulk NIN)</strong>
                              </Radio>
                            ) : (
                              ""
                            )}

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
                          <Tooltip
                            title={tooltipContentBusiness}
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
                        hidden={selectedProfile == "business" ? false : true}
                      >
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
                              onClick={() => {
                                trackEvent({
                                  action: "click_registration_number_button",
                                  category: "Business Profile",
                                  label: "Registration Number Button",
                                  value: 1,
                                });
                                setSelectedForm("rc");
                              }}
                            >
                              Registration Number (RC)
                            </Radio>
                            <Radio
                              value="business_name"
                              onClick={() => {
                                trackEvent({
                                  action: "click_business_name_button",
                                  category: "Business Profile",
                                  label: "Business Name Button",
                                  value: 1,
                                });
                                setSelectedForm("business_name");
                              }}
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
                            onClick={() => {
                              trackEvent({
                                action: "click_bvn_button",
                                category: "Financial Credit Profile",
                                label: "BVN Button",
                                value: 1,
                              });
                              setSelectedForm("bvn");
                            }}
                          >
                            Bank Verification Number (BVN)
                          </Radio>
                        </Radio.Group>
                      </Form>

                      <Row
                        onClick={() => setSelectedProfile("vehicle")}
                        style={{
                          backgroundColor:
                            selectedProfile === "vehicle"
                              ? "#0DC939"
                              : "#EAFFF0",
                          paddingTop: "30px",
                          paddingBottom: "30px",
                          paddingLeft: "10px",
                          borderTopRightRadius: 50,
                          borderBottomRightRadius: 50,
                          color:
                            selectedProfile === "vehicle"
                              ? "#FFFFFF"
                              : "#000000",
                          boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <Col span={21}>Vehicle Profile</Col>
                        <Col span={3}>
                          <Tooltip
                            title={
                              <>
                                {tooltipContentVehicle.map((content, index) => (
                                  <p key={index} style={{ fontWeight: "bold" }}>
                                    {content}
                                  </p>
                                ))}
                              </>
                            }
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
                        hidden={selectedProfile == "vehicle" ? false : true}
                      >
                        <Radio.Group
                          value={vehicleSelectedValue}
                          onChange={(e) =>
                            handleVehicleProfileRadioChange(e.target.value)
                          }
                        >
                          <Space direction="vertical">
                            <Radio
                              // disabled
                              value="vin"
                              size="large"
                              onClick={() => {
                                trackEvent({
                                  action: "click_vehicle_history_button",
                                  category: "Vehicle Profile",
                                  label: "VIN Button",
                                  value: 1,
                                });
                                setSelectedForm("vin");
                              }}
                            >
                              Vehicle History (VIN)
                              <img src={clearvin} alt="" width={150} />
                            </Radio>
                            <Radio
                              value="license_number"
                              size="large"
                              onClick={() => {
                                trackEvent({
                                  action: "click_vehicle_registration_button",
                                  category: "Vehicle Profile",
                                  label: "Reg Number Button",
                                  value: 1,
                                });
                                setSelectedForm("license_number");
                              }}
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
                            <Heading6 $token={token}>How to verify</Heading6>
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
                      {basicProfileArray.includes("nin") &&
                        (userType.toLowerCase() == "individual" ? (
                          <div>
                            <StyledLabel $token={token}>
                              National Identification Number
                              <span
                                style={{ marginLeft: "20px", color: "red" }}
                              >
                                {ninFilled ? (
                                  <CloseSquareOutlined
                                    onClick={clearInputNin}
                                  />
                                ) : null}
                              </span>
                            </StyledLabel>
                            <StyledInput
                              $token={token}
                              type="text"
                              placeholder="Enter your NIN"
                              name="nin"
                              value={formData.nin}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d+$/.test(value) || value === "") {
                                  if (value.length <= 11) {
                                    handleInputChange("nin", value);
                                  }
                                }
                              }}
                              onBlur={() => {
                                // Check if the NIN is exactly 11 digits on blur
                                if (formData.nin.length !== 11) {
                                  Swal.fire({
                                    background: bgContainer,
                                    color: text,
                                    title: "Error",
                                    text: "NIN must be exactly 11 digits.",
                                    icon: "error",
                                    confirmButtonColor: "#0DC939",
                                  });
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <StyledLabel $token={token}>
                              National Identification Number
                              <span
                                style={{ marginLeft: "20px", color: "red" }}
                              >
                                {ninFilled ? (
                                  <CloseSquareOutlined
                                    onClick={clearInputNin}
                                  />
                                ) : null}
                              </span>
                            </StyledLabel>
                            <StyledInput
                              $token={token}
                              type="text"
                              placeholder="Enter your NIN"
                              name="nin"
                              value={formData.nin}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d+$/.test(value) || value === "") {
                                  if (value.length <= 11) {
                                    handleInputChange("nin", value);
                                  }
                                }
                              }}
                              onBlur={() => {
                                // Check if the NIN is exactly 11 digits on blur
                                if (formData.nin.length !== 11) {
                                  Swal.fire({
                                    background: bgContainer,
                                    color: text,
                                    title: "Error",
                                    text: "NIN must be exactly 11 digits.",
                                    icon: "error",
                                    confirmButtonColor: "#0DC939",
                                  });
                                }
                              }}
                            />
                          </div>
                        ))}
                      {/* <div hidden={selectedForm === "bulk_nin" ? false : true}>
                        <div>
                          <StyledLabel>
                            National Identification Number*
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              <CloseSquareOutlined
                                onClick={clearInputBulkNin}
                              />
                            </span>
                          </StyledLabel>
                          <span>Bulk upload</span>
                          {!fileUploaded && ( // Only show input if not uploaded
                            <StyledInput
                              type="file"
                              className="hidden"
                              accept=".csv"
                              name="nin_csv"
                              onChange={handleChange}
                            />
                          )}
                          {fileName && (
                            <div className="mt-2 text-sm text-green-600">
                              <p>Selected file: {fileName}</p>
                              {rowCount !== null && (
                                <p className="font-semibold">
                                  Number of records: {rowCount}
                                </p>
                              )}
                            </div>
                          )}
                          {fileUploadError && (
                            <div className="mt-2 text-sm text-red-600 flex items-center">
                              {fileUploadError}
                            </div>
                          )}
                          <StyledInput
                            type="hidden"
                            name="nin_csv"
                            value={formData.nin_csv}
                          />
                        </div>
                      </div> */}
                      {/* {selectedForm === "phone" && ( */}
                      <div hidden={selectedForm === "phone" ? false : true}>
                        <StyledLabel $token={token}>Phone Number</StyledLabel>
                        <StyledInput
                          $token={token}
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
                          <StyledLabel $token={token}>First Name*</StyledLabel>
                          <StyledInput
                            $token={token}
                            type="text"
                            placeholder="Enter First Name"
                            name="firstname"
                            value={formData.firstname}
                            onChange={(e) =>
                              handleInputChange("firstname", e.target.value)
                            }
                          />
                          <StyledLabel $token={token}>Last Name*</StyledLabel>
                          <StyledInput
                            $token={token}
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
                              <StyledLabel $token={token}>
                                Date of Birth*
                              </StyledLabel>
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
                              <StyledLabel $token={token}>Gender*</StyledLabel>
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
                          <StyledLabel $token={token}>
                            National Identification Number (NIN)*
                          </StyledLabel>
                          <StyledInput
                            $token={token}
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
                          <StyledLabel $token={token}>
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
                                  !isLiveFaceNinValid ||
                                  liveFaceNin.trim() === ""
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
                          <StyledLabel $token={token}>
                            National Identification Number
                          </StyledLabel>
                          <StyledInput
                            $token={token}
                            type="text"
                            placeholder="Enter National Identification Number"
                            name="nin"
                            value={liveFaceNin}
                            onChange={handleLiveFaceNinChange}
                            onChangeCapture={(e) => {
                              const value = e.target.value;
                              if (/^\d+$/.test(value) || value === "") {
                                if (value.length <= 11) {
                                  handleInputChange("nin", value);
                                }
                              }
                            }}
                            onBlur={() => {
                              // Check if the NIN is exactly 11 digits on blur
                              if (formData.nin.length !== 11) {
                                Swal.fire({
                                  background: bgContainer,
                                  color: text,
                                  title: "Error",
                                  text: "NIN must be exactly 11 digits.",
                                  icon: "error",
                                });
                              }
                            }}
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
                          <StyledLabel $token={token}>
                            Upload Finger Image
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
                      {basicProfileArray.includes("bulk_nin") && (
                        <div>
                          <StyledLabel $token={token}>
                            National Identification Number
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              {ninFilled ? (
                                <CloseSquareOutlined onClick={clearInputNin} />
                              ) : null}
                            </span>
                          </StyledLabel>
                          <span>Bulk upload</span>
                          {!fileUploaded && ( // Only show input if not uploaded
                            <StyledInput
                              $token={token}
                              type="file"
                              className="hidden"
                              accept=".csv"
                              name="nin_csv"
                              onChange={handleChange}
                            />
                          )}
                          {fileName && (
                            <div className="mt-2 text-sm text-green-600">
                              <p>Selected file: {fileName}</p>
                              {rowCount !== null && (
                                <p className="font-semibold">
                                  Number of records: {rowCount}
                                </p>
                              )}
                            </div>
                          )}
                          {fileUploadError && (
                            <div className="mt-2 text-sm text-red-600 flex items-center">
                              {fileUploadError}
                            </div>
                          )}
                          <StyledInput
                            $token={token}
                            type="hidden"
                            name="nin_csv"
                            value={formData.nin_csv}
                          />
                        </div>
                      )}

                      {/* {selectedForm === "rc" && ( */}
                      {businessProfileArray.includes("rc") && (
                        <div>
                          <StyledLabel $token={token}>
                            Registration Number (RC)
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              {rcFilled ? (
                                <CloseSquareOutlined
                                  onClick={clearInputBusinessrc}
                                />
                              ) : null}
                            </span>
                          </StyledLabel>
                          <StyledInput
                            $token={token}
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
                          <StyledLabel $token={token}>
                            Business Name
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              {businessNameFilled ? (
                                <CloseSquareOutlined
                                  onClick={clearInputBusinessbusiness_name}
                                />
                              ) : null}
                            </span>
                          </StyledLabel>
                          <StyledInput
                            $token={token}
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
                          <StyledLabel $token={token}>
                            Bank Verification Number (BVN)
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              {bvnFilled ? (
                                <CloseSquareOutlined
                                  onClick={clearInputFinancial}
                                />
                              ) : null}
                            </span>
                          </StyledLabel>
                          <StyledInput
                            $token={token}
                            type="text"
                            placeholder="Enter Bank Verification Number"
                            name="bvn"
                            value={formData.bvn}
                            pattern="[0-9]*" // Allow only numbers
                            title="Please enter only numbers"
                            onChange={(e) => {
                              // handleInputChange("bvn", e.target.value);
                              const value = e.target.value;
                              if (/^\d+$/.test(value) || value === "") {
                                if (value.length <= 11) {
                                  handleInputChange("bvn", value);
                                }
                              }
                            }}
                            onBlur={() => {
                              // Check if the NIN is exactly 11 digits on blur
                              if (formData.bvn.length !== 11) {
                                Swal.fire({
                                  background: bgContainer,
                                  color: text,
                                  title: "Error",
                                  text: "BVN must be exactly 11 digits.",
                                  icon: "error",
                                  confirmButtonColor: "#0DC939",
                                });
                              }
                            }}
                          />
                          <u>Select one or more Credit Bureaus</u>
                          <br></br>
                          <Checkbox
                            disabled={enableCrc}
                            onChange={handleCheckboxChangeCrc}
                            checked={isCheckedCrc}
                          >
                            Credit Risk Certification (CRC)
                          </Checkbox>
                          <br></br>
                          <Checkbox
                            disabled={enableCrc}
                            onChange={handleCheckboxChangeFirstCentral}
                            checked={isCheckedFirstCentral}
                          >
                            First Central
                          </Checkbox>
                          <br></br>
                          <Checkbox
                            disabled={enableCrc}
                            onChange={handleCheckboxChangeCreditRegistry}
                            checked={isCheckedCreditRegistry}
                          >
                            Credit Registery
                          </Checkbox>
                        </div>
                      )}
                      {/* {selectedForm === "vin" && ( */}
                      {vehicleProfileArray.includes("vin") && (
                        <div>
                          <StyledLabel $token={token}>
                            Vehicle History (VIN)
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              {vinFilled ? (
                                <CloseSquareOutlined
                                  onClick={clearInputVehiclevin}
                                />
                              ) : null}
                            </span>
                          </StyledLabel>
                          <span style={{ color: "grey" }}>
                            Input the vehicle VIN without any space or hyphens
                            e.g 2B3HD46TXSH573598
                          </span>

                          <StyledInput
                            $token={token}
                            type="text"
                            placeholder="Enter Vehicle History (VIN)"
                            name="vin"
                            value={formData.vin}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only digits and check if length is within 11 characters
                              if (value.length <= 17) {
                                handleInputChange("vin", value);
                              }
                            }}
                            onBlur={() => {
                              if (formData.vin.length !== 17) {
                                Swal.fire({
                                  background: bgContainer,
                                  color: text,
                                  title: "Error",
                                  text: "VIN must be exactly 17 characters.",
                                  icon: "error",
                                  confirmButtonColor: "#0DC939",
                                });
                              }
                            }}
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
                          <StyledLabel $token={token}>
                            Vehicle Registration Number
                            <span style={{ marginLeft: "20px", color: "red" }}>
                              {licenseNumberFilled ? (
                                <CloseSquareOutlined
                                  onClick={clearInputVehiclelicense_number}
                                />
                              ) : null}
                            </span>
                          </StyledLabel>
                          <span style={{ color: "grey" }}>
                            Input the vehicle registration number without any
                            space or hyphens e.g KUJ467SB
                          </span>
                          <StyledInput
                            $token={token}
                            type="text"
                            placeholder="Vehicle Registration Number"
                            name="license_number"
                            value={formData.license_number}
                            onChange={(e) => {
                              // Use a regex to check for special characters or spaces
                              const value = e.target.value;
                              const regex = /^[a-zA-Z0-9]+$/; // Only allow alphanumeric characters

                              // Update the state if the value is valid
                              if (regex.test(value) || value === "") {
                                // Allow empty input for deletion
                                handleInputChange("license_number", value);
                              }
                            }}
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
                    <Heading6 $token={token}>Payment Summary</Heading6>
                    <div
                      style={{
                        backgroundColor: bgContainer,
                        padding: "15px",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p style={{ color: text }}>Processing fees:</p>

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
                            <p style={{ color: text }}> NIN: </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {" "}
                              {currencyCheck.toUpperCase() === "USD"
                                ? "$" + (ninServiceFee + ninProcessingFee)
                                : formatToNaira(
                                    ninServiceFee + ninProcessingFee
                                  )}
                            </p>
                          </Col>
                          <Col style={{ marginLeft: "20px", color: "red" }}>
                            <CloseSquareOutlined onClick={clearInputNin} />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}

                      {phoneFilled ? (
                        <Row>
                          <Col
                            span={8}
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 15 }}
                            lg={{ span: 15 }}
                            style={{ textAlign: "left" }}
                          >
                            <p style={{ color: text }}> Phone: </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {" "}
                              {currencyCheck.toUpperCase() === "USD"
                                ? "$" + (phoneServiceFee + phoneProcessingFee)
                                : formatToNaira(
                                    phoneServiceFee + phoneProcessingFee
                                  )}
                            </p>
                          </Col>
                          <Col style={{ marginLeft: "20px", color: "red" }}>
                            <CloseSquareOutlined onClick={clearInputPhone} />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}

                      {rcFilled && businessProfileArray.includes("rc") ? (
                        <Row>
                          <Col
                            span={8}
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 15 }}
                            lg={{ span: 15 }}
                            style={{ textAlign: "left" }}
                          >
                            <p style={{ color: text }}>RC Number: </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {" "}
                              {currencyCheck.toUpperCase() === "USD"
                                ? "$" +
                                  (businessServiceFee + businessProcessingFee)
                                : formatToNaira(
                                    businessServiceFee + businessProcessingFee
                                  )}
                            </p>
                          </Col>
                          <Col style={{ marginLeft: "20px", color: "red" }}>
                            <CloseSquareOutlined
                              onClick={clearInputBusinessrc}
                            />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {businessNameFilled &&
                      businessProfileArray.includes("business_name") ? (
                        <Row>
                          <Col
                            span={8}
                            xs={{ span: 12 }}
                            sm={{ span: 12 }}
                            md={{ span: 15 }}
                            lg={{ span: 15 }}
                            style={{ textAlign: "left" }}
                          >
                            <p style={{ color: text }}> Business Name: </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {" "}
                              {currencyCheck.toUpperCase() === "USD"
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
                            <p style={{ color: text }}> BVN: </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {prevNumberOfCheckedCheckboxes == 2
                                ? currencyCheck.toUpperCase() === "USD"
                                  ? "$" +
                                    (
                                      (financialServiceFee +
                                        financialProcessingFee) *
                                      2
                                    ).toFixed(2)
                                  : formatToNaira(
                                      (financialServiceFee +
                                        financialProcessingFee) *
                                        2
                                    )
                                : prevNumberOfCheckedCheckboxes == 3
                                ? currencyCheck.toUpperCase() === "USD"
                                  ? "$" +
                                    (
                                      (financialServiceFee +
                                        financialProcessingFee) *
                                      3
                                    ).toFixed(2)
                                  : formatToNaira(
                                      (financialServiceFee +
                                        financialProcessingFee) *
                                        3
                                    )
                                : currencyCheck.toUpperCase() === "USD"
                                ? "$" +
                                  (financialServiceFee + financialProcessingFee)
                                : formatToNaira(
                                    financialServiceFee + financialProcessingFee
                                  )}{" "}
                            </p>
                          </Col>
                          <Col style={{ marginLeft: "20px", color: "red" }}>
                            <CloseSquareOutlined
                              onClick={clearInputFinancial}
                            />
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
                            <p style={{ color: text }}> VIN </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {" "}
                              {currencyCheck.toUpperCase() === "USD"
                                ? "$" +
                                  (vinVehicleServiceFee +
                                    vinVehicleProcessingFee)
                                : formatToNaira(
                                    vinVehicleServiceFee +
                                      vinVehicleProcessingFee
                                  )}
                            </p>
                          </Col>
                          <Col style={{ marginLeft: "20px", color: "red" }}>
                            <CloseSquareOutlined
                              onClick={clearInputVehiclevin}
                            />
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
                            <p style={{ color: text }}> Registration Number </p>
                          </Col>
                          <Col>
                            <p style={{ color: text }}>
                              {" "}
                              {currencyCheck.toUpperCase() === "USD"
                                ? "$" +
                                  (vehicleServiceFee + vehicleProcessingFee)
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
                          <p style={{ color: text }}>Tax & charges: </p>
                        </Col>
                        <Col style={{ textAlign: "right" }}>
                          {currencyCheck.toUpperCase() === "USD" ? (
                            <p style={{ color: text }}>
                              ${totalVAT.toFixed(2)}
                            </p>
                          ) : (
                            <p style={{ color: text }}>
                              {formatToNaira(totalVAT)}
                            </p>
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
                          <p style={{ color: text }}>Total Amount Due: </p>
                        </Col>
                        <Col>
                          {/* {currencyCheck.toUpperCase() === "USD" ? (
                        <p>{`$${rawServiceFee.toFixed(2)}`}</p>
                      ) : (
                        <p>{`₦${rawServiceFee.toFixed(2)}`}</p>
                      )} */}

                          {currencyCheck.toUpperCase() === "USD" ? (
                            // <p>{`$${totalServiceCost}`}</p>
                            <p
                              style={{ color: text }}
                            >{`$${totalServiceCost.toFixed(2)}`}</p>
                          ) : (
                            <p style={{ color: text }}>
                              {formatToNaira(totalServiceCost)}
                            </p>
                          )}
                        </Col>
                      </Row>
                      <Divider />
                      {currencyCheck.toUpperCase() === "USD" ? (
                        <>
                          <p style={{ color: text }}>
                            Select payment currency{" "}
                          </p>
                          <p style={{ color: text }}>Currency Calculator</p>
                          {paymentMethod != 1 ? (
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
                                  usdFee={totalServiceCost.toFixed(2)}
                                />
                              </Radio.Group>
                            </>
                          ) : (
                            <Radio.Group
                              onChange={currencyOnChange}
                              value={
                                userCurrency?.toUpperCase() === "NGN" ? 1 : 2
                              }
                            >
                              {userCurrency?.toUpperCase() === "NGN" ? (
                                <Radio value={1}>
                                  {" "}
                                  {formatToNaira(totalveriNiara)}
                                </Radio>
                              ) : (
                                // <Radio value={2}>
                                <RadioComponent
                                  profile={profile}
                                  usdFee={totalServiceCost}
                                />
                              )}
                            </Radio.Group>
                          )}

                          <Divider />
                        </>
                      ) : (
                        ""
                      )}
                      {currencyCheck.toUpperCase() === "USD" ? (
                        <>
                          <p style={{ color: text }}>Exchange rate</p>
                          <p style={{ color: text }}>
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
                  <strong style={{ color: text }}>
                    Select payment method:
                  </strong>
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
                      value={paymentMethod}
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
                          src={isDark ? flutterwaveWhite : flutterwave}
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
                      <div
                        dangerouslySetInnerHTML={{ __html: privacyPolicy }}
                      />
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
                      <div
                        dangerouslySetInnerHTML={{ __html: termsOfService }}
                      />
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
                      disabled={!checkboxChecked || makingPayment}
                      style={{
                        backgroundColor:
                          checkboxChecked && !makingPayment
                            ? "#0DC939"
                            : "#d9d9d9", // Set the colors based on checkbox state
                        borderColor:
                          checkboxChecked && !makingPayment
                            ? "#0DC939"
                            : "#d9d9d9",
                        cursor:
                          checkboxChecked && !makingPayment
                            ? "pointer"
                            : "not-allowed",
                        color: text3,
                      }}
                    >
                      Payment
                    </MainButtonFull>
                  )}
                  {!checkboxCheckedConfirm && (
                    <Alert
                      message="Kindly select a payment method"
                      type="error"
                      style={{
                        textAlign: "center",
                        backgroundColor: "#ffe5e5",
                        borderColor: "#ff4d4f",
                        color: "#a8071a",
                      }}
                    />
                  )}
                  <Modal
                    title="Wallet Balance Warning"
                    visible={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                  >
                    <p>
                      Your wallet balance is low. Please recharge before making
                      a payment.
                    </p>
                  </Modal>
                </Col>
                <PaymentModal />
                <PaymentModalFace />
                <Modal
                  // title="Complete Wallet TopUp"
                  style={{
                    top: 20,
                  }}
                  width={1000}
                  open={openFlutterwaveModal}
                  onOk={handleModalNewOk}
                  onCancel={handleModalNewOk}
                  maskClosable={false}
                  footer={[
                    <Button
                      style={{ color: text }}
                      type="dashed"
                      onClick={handleModalNewOk}
                    >
                      Close
                    </Button>,
                  ]}
                >
                  <iframe
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="100%"
                    height="600"
                    src={paymentUrl}
                  ></iframe>
                </Modal>
              </Row>
            )}
          </Spin>
        </Spin>
      </Container>
    </Row>
  );
};

export default DashboardPage;

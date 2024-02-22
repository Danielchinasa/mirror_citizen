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

import { InfoCircleOutlined, CameraOutlined } from "@ant-design/icons";
import banner from "../../images/banner.png";
import tick from "../../images/tick.png";
import clearvin from "../../images/clearvin.png";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationRequest, fetchUserProfile } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

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
  const [financialFee, setFinancialFee] = useState("");
  const [financialServiceFee, setfinancialServiceFee] = useState("");
  const [financialUsdServiceFee, setfinancialUsdServiceFee] = useState("");
  const [financialVatFee, setFinancialVatFee] = useState("");
  const [financialUsdFee, setFinancialUsdFee] = useState("");
  const [financialUsdVatFee, setFinancialUsdVatFee] = useState("");
  const [financialProcessingFee, setFinancialProcessingFee] = useState("");
  const [currencyCheck, setCurrencyCheck] = useState("NGN");
  const [value, setValue] = useState(1);
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
  const currencyOnChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);

    if (e.target.value == 2) {
      setCurrencyCheck("USD");
    } else {
      setCurrencyCheck("NGN");
    }
  };
  const handleInputChange = (name, value) => {
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
          `http://41.184.212.26:8069/api/v2/transaction/services-prices?ipAddress=${ipAddress}`,
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
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setNinFee(null);
      }
    };

    fetchServiceFee();
  }, []);
  // useEffect(() => {
  //   // Check if nin is not an empty string
  //   if (formData.nin.trim() !== "") {
  //     setTotalveri(ninFee);
  //     setIsClearVinOn(false);
  //     // Log the total amount
  //     console.log("Total Veri Amount:", totalveri);
  //   }

  //   // Check if vin is not an empty string
  //   if (formData.vin.trim() !== "") {
  //     setIsClearVinOn(true);
  //     // Add 3000 to totalVeri
  //     setTotalveri((prevTotalVeri) => prevTotalVeri + vinVehicleFee);

  //     // Log the updated total amount
  //     console.log("Updated Total Veri Amount:", totalveri);
  //     console.log("isClearVinOn", isClearVinOn);
  //   } else {
  //     setIsClearVinOn(false);
  //   }
  //   // Format totalveri as currency
  //   const currencyFormatter = new Intl.NumberFormat("en-NG", {
  //     style: "currency",
  //     currency: "NGN",
  //   });
  //   const formattedTotalveri = currencyFormatter.format(totalveri);
  //   checkStolen ? setDanfee(totalveri) : setDanfee(totalveri + 30);

  //   console.log("Updated formattedTotalveri:", formattedTotalveri);
  // }, [formData.nin, formData.vin]);

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // Dispatch the sendVerificationRequest action with the form data

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
        notification.error({
          message: "Input value not found",
          description: "Please check your input value and try again.",
        });

        history.push("/notFoundPage");
      } else if (
        response.basic &&
        response.basic.message &&
        response.basic.message === "Awaiting Consent"
      ) {
        localStorage.setItem(
          "verificationRequestId",
          response.basic.data.requestId
        );
        // Handle further actions if needed
        history.push("/main-dashboard");
      } else if (
        response.business &&
        response.business.message === "Business API call successful"
      ) {
        // localStorage.setItem(
        //   "verificationRequestId",
        //   response.business.data.requestId
        // );
        // Handle further actions if needed
        history.push("/main-dashboard");
      } else if (
        response.business &&
        response.business.message === "Awaiting Consent"
      ) {
        // localStorage.setItem(
        //   "verificationRequestId",
        //   response.business.data.requestId
        // );
        // Handle further actions if needed
        history.push("/main-dashboard");
      } else if (
        response.vehicle &&
        response.vehicle.message === "Vehicle API call successful"
      ) {
        // Handle further actions for successful vehicle API call
        // history.push("/vehicle");
        history.push("/main-dashboard");
      } else if (
        response.vehicle &&
        response.vehicle.message &&
        response.vehicle.message === "successful"
      ) {
        localStorage.setItem(
          "verificationRequestId",
          response.vehicle.data.requestId
        );
        // Handle further actions if needed
        history.push("/main-dashboard");
      } else if (
        response.financial &&
        response.financial.message === "Financial API call successful"
      ) {
        history.push("/main-dashboard");
      } else {
        // Display error message
        // message.error(response.message || "OTP verification failed");
        // Handle further actions if needed
        notification.error({
          message: "Error",
          description:
            "An unexpected server error occurred. Please attempt your action again",
        });
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error sending verification", error);
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
      title:
        "The parameter(s) you select will appear here for you to input your search data.",
    },
    {
      title: "Multiple Profiles may be selected as required.",
    },
    {
      title:
        "When you have completed your selection(s), input your search data and proceed to payment.",
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
  const onChange2 = (e) => {
    setCheckboxCheckedConfirm(e.target.checked);
  };

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
    "Vehicle profile refers to data and information gathered about the ownership of automobiles. Search parameter is basic VIN.";
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
        {profile === "nin" && `USD ${usdFee}`}
        {profile === "face" && `USD ${usdFee}`}
        {profile === "rc" && `USD ${usdFee}`}
        {profile === "business_name" && `USD ${usdFee}`}
        {profile === "bvn" && `USD ${usdFee}`}
        {profile === "vin" && `USD ${usdFee}`}
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

  const config = {
    //live key
    public_key: "FLWPUBK-6f8762e460e0a984f90b300be5d7a343-X",
    //test key
    // public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}",
    amount:
      currencyCheck == "USD" ? `${danfee.toFixed(2)}` : `${danfee.toFixed(2)}`,
    currency: currencyCheck == "USD" ? "USD" : "NGN",
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
    checkStolen ? setDanfee(totalveri + 30) : setDanfee(totalveri);
  }, [totalveri]);

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

  const handlePaymentMethod = async () => {
    // Check if a payment method is selected
    const reachScript = document.createElement("script");
    reachScript.src = "https://clk1.reachclk.com/sdk/reach.js";
    reachScript.async = true;

    document.body.appendChild(reachScript);
    if (selectedValue !== null) {
      // Log the selected payment method
      const userBalance = userDetails?.walletBalance || 0;

      if (selectedValue === 1) {
        // console.log("Payment from Wallet");
        setLoading(true);
        handleCancel();
        const apiUrl =
          "http://41.184.212.26:8069/api/v2/transaction/wallet-payment";

        const requestBody = {
          userNIN: userNin,
          transactionID: "EA11697986831911",
          amount: `${danfee.toFixed(2)}`,
        };

        if (userBalance.toLocaleString() < 55) {
          // Show the Ant Design notification
          handleCancel();
          notification.error({
            message: "Wallet Balance Warning",
            description:
              "Your wallet balance is low. Please recharge before making a payment.",
          });
        } else {
          try {
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
        handleFlutterPayment({
          callback: async (response) => {
            console.log(response);
            if (response.status === "successful") {
              console.log("flutterWave success");
              reachScript.onload = () => {
                Reach.conversion({
                  advertiser_id: 299,
                  // ADDITIONAL PARAMETERS
                });
              };
              handleSubmit();
            }
            closePaymentModal();
          },
          onClose: () => {},
        });
        handleCancel();
      }

      // Close the modal
      // handleCancel();
    }
    // console.log(selectedValue);
    // You may also add an else block to handle the case when no payment method is selected
  };

  const handlePaymentMethodFace = async () => {
    // Check if a payment method is selected
    const reachScript = document.createElement("script");
    reachScript.src = "https://clk1.reachclk.com/sdk/reach.js";
    reachScript.async = true;

    document.body.appendChild(reachScript);
    if (selectedValue !== null) {
      // Log the selected payment method
      const userBalance = userDetails?.walletBalance || 0;

      if (selectedValue === 1) {
        // console.log("Payment from Wallet");
        setLoading(true);
        const apiUrl =
          "http://41.184.212.26:8069/api/v2/transaction/wallet-payment";

        const requestBody = {
          userNIN: userNin,
          transactionID: "EA11697986831911",
          amount: `${danfee.toFixed(2)}`,
        };

        if (userBalance.toLocaleString() < 55) {
          // Show the Ant Design notification

          notification.error({
            message: "Wallet Balance Warning",
            description:
              "Your wallet balance is low. Please recharge before making a payment.",
          });
        } else {
          try {
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
              handleCancelFace();
              const liveCaptureUrl = `https://41.184.212.26/${liveFaceNin}/ecitizen-web/${userToken}`;
              if (isLiveFaceNinValid && liveFaceNin.trim() !== "") {
                window.open(liveCaptureUrl, "_blank");
              }
              // handleSubmit();
            } else {
              console.error("Payment failed. Response:", data);
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            handleCancelFace();

            setLoading(false); // Set loading to false when the request completes (either success or failure)
          }
        }
      } else if (selectedValue === 2) {
        // console.log("Instant Payment");
        handleFlutterPayment({
          callback: async (response) => {
            console.log(response);
            if (response.status === "successful") {
              console.log("flutterWave success");
              reachScript.onload = () => {
                Reach.conversion({
                  advertiser_id: 299,
                  // ADDITIONAL PARAMETERS
                });
              };
              // handleSubmit();
              const liveCaptureUrl = `https://41.184.212.26/${liveFaceNin}/ecitizen-web/${userToken}`;
              if (isLiveFaceNinValid && liveFaceNin.trim() !== "") {
                window.open(liveCaptureUrl, "_blank");
              }
            }
            closePaymentModal();
          },
          onClose: () => {},
        });
        handleCancelFace();
      }

      // Close the modal
      // handleCancel();
    }
    // console.log(selectedValue);
    // You may also add an else block to handle the case when no payment method is selected
  };

  // const handleRadioChange = (e) => {
  //   setSelectedPaymentMethod(e.target.value);
  // };
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleRadioChangeStolen = (e) => {
    handleInputChange("stolencheck", false);
  };

  const PaymentModal = () => (
    <Modal
      visible={modalVisible}
      onCancel={handleCancel}
      footer={null} // Remove the default footer
      width={isClearVinOn ? 1000 : 500}
      bodyStyle={{ overflowX: "scroll" }}
      style={{
        top: 20,
      }}
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
      {!isClearVinOn ? (
        <div
          style={{
            marginTop: "20px",
            background: "rgba(235, 3, 24, 0.10)",
            border: "1px solid #EB0318",
            padding: "15px",
          }}
        >
          <Checkbox onChange={onChange2}>
            By clicking, you indicate that you understand and accept that
            consent is required from the data subject being verified before you
            can access their data. <br />
            Disclaimer - You confirm that search details are correct, and you
            confirm that you will not be refunded for incorrect information or
            lack of consent
          </Checkbox>
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
          <Checkbox onChange={onChange2}>
            By clicking, you indicate that:
            <ul>
              <li>
                You understand and accept that{" "}
                <b>
                  consent is required from the data subject being verified
                  before you can access their data.
                </b>
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
                      some state data pertaining to a VIN may not be contained
                      in or available through NMVTIS,
                    </li>
                    <li>
                      some state data is provided to NMVTIS via a daily, weekly
                      or monthly format and therefore may not be current,
                    </li>
                    <li>
                      some of the entities which report data to NMVTIS may have
                      failed to provide such data for incorporation in NMVTIS,
                      and
                    </li>
                    <li>
                      AAMVA, CV’s vendor, and CV have no control over the
                      accuracy or completeness of data contained in NMVTIS and
                      shall not have any liability to any Licensee, Affiliate,
                      user or third party concerning the quality, completeness
                      or accuracy of Licensed Data.
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
          </Checkbox>
        </div>
      ) : (
        ""
      )}

      {/* Buttons */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
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
          Confirm Payment
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
        <Checkbox onChange={onChange2}>
          By clicking, you indicate that you understand and accept that consent
          is required from the data subject being verified before you can access
          their data.
        </Checkbox>
      </div>

      {/* Buttons */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          type="primary"
          onClick={handlePaymentMethodFace}
          disabled={!checkboxCheckedConfirm}
          style={{
            marginRight: 10,
            backgroundColor: checkboxCheckedConfirm ? "#0DC939" : "#d9d9d9", // Set the colors based on checkbox state
            borderColor: checkboxCheckedConfirm ? "#0DC939" : "#d9d9d9",
            cursor: checkboxCheckedConfirm ? "pointer" : "not-allowed", // Change cursor based on checkbox state
          }}
        >
          Confirm Payment
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

  const [base64Image2, setBase64Image2] = useState("");
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

  const handleClickPrivacyPolicy = () => {
    // Import the PDF file using require
    const pdf = require("../../images/e-citizen - Data Protection and Privacy Policy.pdf");

    // Open the PDF in a new tab
    window.open(pdf, "_blank");
  };

  return (
    <Row>
      <Col>
        <Img src={banner} />
      </Col>
      <Container>
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
                {/* <MainButtonFull type="primary">Step 1</MainButtonFull> */}

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
                  {selectedProfile === "basic" && (
                    <Form>
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio
                            value="nin"
                            size="large"
                            onClick={() => setSelectedForm("nin")}
                          >
                            National Identification Number (NIN)
                          </Radio>
                          {/* <Radio
                            value="phone"
                            onClick={() => setSelectedForm("phone")}
                          >
                            {" "}
                            Phone Number{" "}
                          </Radio> */}
                          {/* <Radio
                            value="demographics"
                            onClick={() => setSelectedForm("demographics")}
                          >
                            Demographics
                          </Radio> */}
                          <Radio
                            value="face"
                            onClick={() => setSelectedForm("face")}
                          >
                            National Identification Number (NIN) + Face{" "}
                          </Radio>
                          {/* <Radio
                            value="fingerprint"
                            onClick={() => setSelectedForm("fingerprint")}
                          >
                            Fingerprint
                          </Radio> */}
                        </Space>
                      </Radio.Group>
                    </Form>
                  )}
                  <Row
                    onClick={() => setSelectedProfile("business")}
                    style={{
                      backgroundColor:
                        selectedProfile === "business" ? "#0DC939" : "#EAFFF0",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "10px",
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      color:
                        selectedProfile === "business" ? "#FFFFFF" : "#000000",
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
                  {selectedProfile === "business" && (
                    <Form>
                      <Radio.Group>
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
                  )}
                  <Row
                    onClick={() => setSelectedProfile("financial")}
                    style={{
                      backgroundColor:
                        selectedProfile === "financial" ? "#0DC939" : "#EAFFF0",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "10px",
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      color:
                        selectedProfile === "financial" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <Col span={21}>Financial Credit Profile</Col>
                    <Col span={3}>
                      <Tooltip title={tooltipContentFinancial} color="#F4B40F">
                        <InfoCircleOutlined
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  {selectedProfile === "financial" && (
                    <Form>
                      <Radio
                        value="bvn"
                        size="large"
                        onClick={() => setSelectedForm("bvn")}
                      >
                        Bank Verification Number (BVN)
                      </Radio>
                    </Form>
                  )}
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
                  {selectedProfile === "vehicle" && (
                    <Form>
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio
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
                  )}
                  {/* {selectedProfile === "vehicle" && <Form></Form>} */}
                </Space>
              </Col>
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Heading6>Search Options</Heading6>
                {selectedForm === "none" && (
                  <>
                    <p>
                      Select a Profile to verify and the parameter(s) you want
                      to search with.
                    </p>

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

                {selectedForm === "nin" && (
                  <>
                    <StyledLabel>National Identification Number*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter your nin"
                      name="nin"
                      value={formData.nin}
                      onChange={(e) => handleInputChange("nin", e.target.value)}
                    />
                    {/* <StyledInput
                      type="text"
                      placeholder="Enter your face"
                      name="face"
                      value={formData.face}
                      onChange={(e) =>
                        handleInputChange("face", e.target.value)
                      }
                    /> */}
                  </>
                )}

                {selectedForm === "phone" && (
                  <>
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
                  </>
                )}

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
                {selectedForm === "face" && (
                  <>
                    <StyledLabel>
                      National Identification Number (NIN)*
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

                    {/* <Upload
                      customRequest={({ file, onSuccess }) => {
                        // Simulate an upload and provide a response with a URL
                        setTimeout(() => {
                          onSuccess({ url: "your_uploaded_image_url" });
                        }, 1000);
                      }}
                      showUploadList={false}
                      onChange={handleFileSelect}
                    >
                      <Button type="primary" size="large">
                        Browse file
                      </Button>
                    </Upload> */}

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

                    {/* <StyledTextArea
                      type="text"
                      placeholder="Enter your face"
                      name="face"
                      value={base64WithoutPrefix}
                      onChange={handleLiveFaceFaceChange}
                      onChangeCapture={(e) =>
                        handleInputChange("face", e.target.value)
                      }
                    /> */}

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
                        {/* <input type="file" onChange={handleFileSelect} /> */}

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
                        {/* <Upload {...props}>
                          <Button type="primary" size="large">
                            Browse file
                          </Button>
                        </Upload> */}
                        {/* Display the base64 image string if available */}
                        {/* {base64Image && (
                          <div>
                            <p>Base64 Image:</p>
                            <img
                              src={base64Image}
                              alt="Uploaded"
                              style={{ maxWidth: "100%" }}
                            />
                          </div>
                        )} */}
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
                            handleMakePaymentForLiveFace();
                            // const liveCaptureUrl = `https://41.184.212.26/${liveFaceNin}/ecitizen/${userToken}`;
                            // if (
                            //   isLiveFaceNinValid &&
                            //   liveFaceNin.trim() !== ""
                            // ) {
                            //   window.open(liveCaptureUrl, "_blank");
                            // }
                          }}
                          disabled={
                            !isLiveFaceNinValid || liveFaceNin.trim() === ""
                          }
                        >
                          Live Capture
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
                {selectedForm === "fingerprint" && (
                  <>
                    <StyledLabel>National Identification Number*</StyledLabel>
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
                {selectedForm === "rc" && (
                  <>
                    <StyledLabel>Registration Number (RC)*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter Registration Number"
                      name="rc"
                      value={formData.rc}
                      onChange={(e) => handleInputChange("rc", e.target.value)}
                    />
                  </>
                )}
                {selectedForm === "business_name" && (
                  <>
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
                  </>
                )}
                {selectedForm === "bvn" && (
                  <>
                    <StyledLabel>Bank Verification Number (BVN)*</StyledLabel>
                    <StyledInput
                      type="number"
                      placeholder="Enter Bank Verification Number"
                      name="bvn"
                      value={formData.bvn}
                      onChange={(e) => handleInputChange("bvn", e.target.value)}
                    />
                  </>
                )}
                {selectedForm === "vin" && (
                  <>
                    <StyledLabel>Vehicle History (VIN)*</StyledLabel>
                    <StyledInput
                      type="text"
                      placeholder="Enter Vehicle History (VIN)"
                      name="vin"
                      value={formData.vin}
                      onChange={(e) => handleInputChange("vin", e.target.value)}
                    />

                    <Checkbox
                      onChange={handleCheckboxChange}
                      checked={isChecked}
                    >
                      Also search Stolen Vehicles database? (Extra charge)
                    </Checkbox>
                    {/* {checkStolen ? (
                      <input
                        type="radio"
                        id="stolencheck"
                        name="stolencheck"
                        checked={isChecked}
                        onChange={handleRadioChangeStolen} // Call handleRadioChange function when the radio button is clicked
                      />
                    ) : (
                      <input
                        type="radio"
                        id="stolencheck"
                        name="stolencheck"
                        checked={false}
                        onChange={handleRadioChangeStolen} // Call handleRadioChange function when the radio button is clicked
                      />
                    )} */}
                  </>
                )}
                {selectedForm === "license_number" && (
                  <>
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
                  </>
                )}
              </Col>
              <Col
                span={8}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Heading6>Payment Summary</Heading6>
                <div style={{ backgroundColor: "#FAFBFC", padding: "15px" }}>
                  <p>Financial summary services</p>
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
                      <p>Profile: </p>
                    </Col>
                    <Col>
                      <p>{selectedProfile}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 15 }}
                      lg={{ span: 15 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Service: </p>
                    </Col>
                    <Col>
                      <p>{selectedForm}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 15 }}
                      lg={{ span: 15 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Service Fee: </p>
                    </Col>
                    <Col>
                      <p>₦{serviceFee.toFixed(2)}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 15 }}
                      lg={{ span: 15 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Processing Fee: </p>
                    </Col>
                    <Col>
                      <p>₦{processingFee.toFixed(2)}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={8}
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 15 }}
                      lg={{ span: 15 }}
                      style={{ textAlign: "left" }}
                    >
                      <p>Tax: </p>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <p>₦{vat.toFixed(2)}</p>
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
                      <p>{`₦${rawServiceFee.toFixed(2)}`}</p>
                    </Col>
                  </Row>
                  <Divider />
                  {currencyCheck == "USD" ? (
                    <>
                      <p>Select payment currency </p>
                      <p>Currency Calculator</p>
                      <Radio.Group onChange={currencyOnChange} value={value}>
                        <Radio value={1}>Naira ₦{serviceFee.toFixed(2)}</Radio>
                        <RadioComponent profile={profile} usdFee={usdFee} />
                      </Radio.Group>
                      <Divider />
                    </>
                  ) : (
                    ""
                  )}
                  <p>Exchange rate</p>
                  <p>
                    $1 USD =
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(exchangeRate)}{" "}
                    Naira{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </InfoSec>
        </StyledForm>
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
            style={{ textAlign: "right", padding: "10px" }}
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
                <span style={{ color: "#09C93A", cursor: "pointer" }}>
                  Terms of Service
                </span>
              </Checkbox>
            </strong>

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
      </Container>
    </Row>
  );
};

export default DashboardPage;

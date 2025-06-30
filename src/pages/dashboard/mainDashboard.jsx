import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Tabs,
  Modal,
  Input,
  Button,
  Divider,
  Spin,
} from "antd";
import {
  Container,
  InfoSec,
  MainButton,
  DynamicTable,
} from "../../globalStyles";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
  fetchVerificationData,
  fetchTransactionData,
  updateUserWalletBalance,
  initiateVerificationRequest,
  fetchUserProfile,
  logout,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./emergency.css";
import Swal from "sweetalert2";
import { SearchOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import Notification from "../../Notification";
import { Typography } from "antd";
import ReactGA from "react-ga4";
import { theme } from "antd";
import { useTheme } from "../../components/ThemeProvider";
import baseUrl from "../../apiConfig";
import { apiPost, apiPostInternalCall } from "../../apiUtils";
const { Title } = Typography;

const data = [
  {
    key: "1",
    name: "John Brown",
    agency: "NIMC",
    email: "New York No. 1 Lake Park",
    expires: ["2024/03/13"],
  },
  {
    key: "2",
    name: "Jim Green",
    agency: "NIMC",
    email: "London No. 1 Lake Park",
    expires: ["2024/03/16"],
  },
  {
    key: "3",
    name: "Joe Black",
    agency: "NIMC",
    email: "Sydney No. 1 Lake Park",
    expires: ["2024/03/16"],
  },
];
const onChange = (key) => {
  console.log(key);
};

// const handleFlutterPayment = useFlutterwave(config);

const MainDashboard = () => {
  const dispatch = useDispatch();
  const verificationData = useSelector((state) => state.verificationData);
  const transactionData = useSelector((state) => state.transactionData);
  const user = useSelector((state) => state.user);
  const userToken = user?.jwtToken || "";
  const history = useHistory();
  const tokenExpire = user?.expirationDate || "";

  const userEmail = user?.email || "";
  const userName = user?.firstName || "";
  const userPhone = user?.phone || "";
  const userNin = user?.nin || "";
  const userCurrency = user?.currency || "";
  const [ninFee, setNinFee] = useState("");
  const [faceFee, setFaceFee] = useState("");
  const [vehicleFee, setVehicleFee] = useState("");
  const [vinVehicleFee, setVinVehicleFee] = useState("");
  const [businessFee, setBusinessFee] = useState("");
  const [financialFee, setFinancialFee] = useState("");
  const [currencyCheck, setCurrencyCheck] = useState("NGN");
  const [loadingSmall, setLoadingSmall] = useState(false);

  const { token } = theme.useToken();
  const { isDark } = useTheme();
  const { bgContainer, text, text3 } = token;

  useEffect(() => {
    dispatch(fetchUserProfile(userToken));
  }, []);

  useEffect(() => {
    // Convert tokenExpire string to a Date object
    const expireDate = new Date(tokenExpire);
    // const expireDate = new Date(
    //   "Thu May 16 2024 10:31:20 GMT+0100 (West Africa Standard Time)"
    // );

    // Get the current date/time
    const currentDate = new Date();

    // Compare the current date with the expiration date
    if (currentDate >= expireDate) {
      // If the current date is greater than or equal to the expiration date,
      // it means the token has expired
      dispatch(logout());
      history.push("/");
      // console.log("Time don pass well");
    } else {
      // Token is still valid
      // You may want to handle this case differently
      console.log(expireDate);
      console.log(currentDate);
    }
  }, []);

  useEffect(() => {
    const fetchServiceFee = async () => {
      try {
        const ipAddress = localStorage.getItem("IpAddress");
        const response = await apiPostInternalCall(
          `/transaction/service-prices`,
          { ipAddress },
          userToken
        );
        console.log("Service Fees");
        console.log(response.data.data[0].price);

        setCurrencyCheck(response.data.data[0].currency);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setNinFee(null);
      }
    };

    fetchServiceFee();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Dispatch the fetchVerificationData action with the bearer token when the component mounts
    if (userToken) {
      dispatch(fetchVerificationData(userToken, currentPage - 1, pageSize));
      dispatch(fetchTransactionData(userToken));
    }
  }, [dispatch, userToken, currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Log the verificationData to the console

  const [openedVerifications, setOpenedVerifications] = useState([]);
  console.log("currencyCheck");
  console.log(currencyCheck);

  const handleViewResult = async (record) => {
    setLoadingSmall(true);
    const { id, insertionDate, consent } = record;
    const currentDate = new Date();
    const fortyEightHoursAgo = new Date(
      currentDate.getTime() - 48 * 60 * 60 * 1000
    );
    const twentyFourHoursAgo = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000
    );
    const sevenDaysAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    // Your existing logic for handling different scenarios
    if (
      ((record.type === "Basic Profile" ||
        record.type === "Financial Profile") &&
        new Date(insertionDate) < fortyEightHoursAgo) ||
      (record.consent === "pending" &&
        new Date(insertionDate) < twentyFourHoursAgo) ||
      (record.type === "Vehicle Profile" &&
        new Date(insertionDate) < sevenDaysAgo)
    ) {
      // message.error("Verification Result or Consent Expired");
      setLoadingSmall(false);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "Verification Result or Consent expired",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
      return;
    }

    if (consent === "denied") {
      setLoadingSmall(false);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Error",
        text: "Consent Denied",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
      return;
    }
    if (consent === "pending") {
      setLoadingSmall(false);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Info",
        text: "Awaiting Consent",
        icon: "info",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
      return;
    }

    if (consent === "No data found") {
      setLoadingSmall(false);
      Swal.fire({
        background: bgContainer,
        color: text,
        title: "Oops!",
        text: "Sorry, No record found",
        icon: "error",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/verification/check-consent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.ok) {
        setLoadingSmall(false);
        const data = await response.json();
        // Proceed with navigation only if there is no data in the response
        if (!data) {
          console.log("NO DATA");
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Oops!",
            text: "Sorry, No record found",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
          });
          return;
        } else if (
          data &&
          data.error === true &&
          data.message === "No value present"
        ) {
          Swal.fire({
            background: bgContainer,
            color: text,
            title: "Oops!",
            text: "Sorry, No record found",
            icon: "error",
            customClass: {
              confirmButton: "custom-swal-button",
            },
          });
          return;

          return;
        } else {
          navigateToResultPage(record);
          console.log("Consent data found:", data);
        }
      } else {
        setLoadingSmall(false);
        // Handle the case where the API call fails
        console.error("Failed to fetch consent data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching consent data:", error);
    }
    // }
  };

  const navigateToResultPage = (record) => {
    const searchParameter = record.searchParameter;
    localStorage.setItem("verificationRequestId", record.id);
    if (searchParameter === "Vehicle Registration Number") {
      history.push("/vehicle2");
    } else if (record.type === "Vehicle Profile") {
      history.push("/vehicle");
    } else if (record.type === "Business Profile") {
      history.push("/businessName"); // Assuming it's "/businessName" for both cases
    } else if (record.type === "Financial Profile") {
      history.push("/financial");
    } else {
      history.push("/result");
    }
  };

  const config = {
    //live key
    // public_key: "FLWPUBK-3364bb9fdcbd08a92bbccbbcce686d40-X",
    //test key
    public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}TP",
    amount: "1000",
    currency: userCurrency == "USD" ? "USD" : "NGN",
    payment_options: "card,ussd, account, banktransfer, barter, nqr",
    customer: {
      email: userEmail,
      phone_number: userPhone,
      name: userName,
    },

    customizations: {
      title: "Funding e-citizen wallet",
      description: "Payment for verification service",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleRowClick = (record) => {
    // Handle row click event here
    console.log("Clicked row:", record);
  };

  const [searchText, setSearchText] = useState("");
  const [searchTextTransaction, setSearchTextTransaction] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const componentRef = useRef();

  const list = [
    { category: "credit", amount: 200 },
    { category: "debit", amount: 100 },
    { category: "debit", amount: 100 },
  ];

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };
  const handleSearchTransaction = (e) => {
    const { value } = e.target;
    setSearchTextTransaction(value);
  };

  const filteredData =
    verificationData && verificationData.requests
      ? verificationData.requests.filter((record) => {
          return Object.keys(record).some(
            (key) =>
              record[key] &&
              record[key]
                .toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())
          );
        })
      : [];
  const filteredDataTransaction =
    transactionData &&
    transactionData.filter((record) => {
      return Object.keys(record).some(
        (key) =>
          record[key] &&
          record[key]
            .toString()
            .toLowerCase()
            .includes(searchTextTransaction.toLowerCase())
      );
    });

  const columns = [
    {
      title: "Date and Time",
      dataIndex: "insertionDate",
      key: "insertionDate",
      sorter: (a, b) => a.insertionDate - b.insertionDate,

      render: (insertionDate) => {
        const date = new Date(insertionDate);
        const formattedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Search Parameter (Value)",
      dataIndex: "searchParameter",
      key: "searchParameter",
      filters: [
        {
          text: "NIN",
          value: "NIN",
        },
        {
          text: "BVN",
          value: "BVN",
        },
        {
          text: "Face+NIN",
          value: "Face+NIN",
        },
        {
          text: "COMPANY NAME",
          value: "COMPANY NAME",
        },
        {
          text: "Vehicle Registration Number",
          value: "Vehicle Registration Number",
        },
        {
          text: "VIN",
          value: "VIN",
        },
      ],
      onFilter: (value, record) => record.searchParameter.indexOf(value) === 0,
      render: (text, record) => {
        const currentDate = new Date();
        const twentyFourHoursAgo = new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000
        ); // 24 hours in milliseconds
        const fortyEightHoursAgo = new Date(
          currentDate.getTime() - 48 * 60 * 60 * 1000
        ); // 48 hours in milliseconds
        const sevenDaysAgo = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );

        let formattedValue = record.searchValue;

        if (
          formattedValue &&
          (((record.type === "Basic Profile" ||
            record.type === "Financial Profile") &&
            new Date(record.insertionDate) < fortyEightHoursAgo) ||
            (record.consent === "pending" &&
              (record.type === "Basic Profile" ||
                record.type === "Financial Profile") &&
              new Date(record.insertionDate) < twentyFourHoursAgo) ||
            (record.type === "Vehicle Profile" &&
              new Date(record.insertionDate) < sevenDaysAgo))
        ) {
          // If searchValue is expired (red) and not null, cover the real value with asterisks
          formattedValue = formattedValue.replace(/.(?=.{2,}$)/g, "*"); // Replace all characters except the first two and last two with "*"
        }

        const isRed = formattedValue !== record.searchValue;

        return (
          <span>
            <b>{record.searchParameter}</b> (
            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              {record.searchValue ? record.searchValue : "NO DATA"}
            </span>
            )
          </span>
        );
      },
    },

    {
      title: "Status",
      dataIndex: "consent",
      key: "consent",
      // sorter: (a, b) => a.consent.localeCompare(b.consent),
      filters: [
        {
          text: "granted",
          value: "granted",
        },
        {
          text: "pending",
          value: "pending",
        },
      ],
      onFilter: (value, record) => record.consent.indexOf(value) === 0,
      render: (text, record) => {
        let color = ""; // Default color
        if (record.consent === "denied") {
          color = "red"; // Change color to red if consent is denied
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: "Selected Profile",
      dataIndex: "type",
      key: "type",
      // sorter: (a, b) => a.type - b.type,
      filters: [
        {
          text: "Basic Profile",
          value: "Basic Profile",
        },
        {
          text: "Business Profile",
          value: "Business Profile",
        },
        {
          text: "Financial Profile",
          value: "Financial Profile",
        },
        {
          text: "Vehicle Profile",
          value: "Vehicle Profile",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },

    {
      title: "Action",
      key: "status",
      dataIndex: "status",
      render: (text, record) => {
        const { insertionDate, type, consent } = record;
        const currentDate = new Date();
        const twentyFourHoursAgo = new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000
        ); // 24 hours in milliseconds
        const fortyEightHoursAgo = new Date(
          currentDate.getTime() - 48 * 60 * 60 * 1000
        ); // 48 hours in milliseconds
        const sevenDaysAgo = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );

        if (
          ((type === "Basic Profile" || type === "Financial Profile") &&
            new Date(insertionDate) < fortyEightHoursAgo) ||
          (consent === "pending" &&
            new Date(insertionDate) < twentyFourHoursAgo) ||
          (type === "Vehicle Profile" && new Date(insertionDate) < sevenDaysAgo)
        ) {
          return (
            <span style={{ color: "red", fontWeight: "bold" }}>Expired</span>
          );
        } else if (consent === "denied") {
          return (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Consent Denied
            </span>
          );
        } else if (consent === "pending") {
          return <span style={{ fontWeight: "bold" }}>Awaiting Consent</span>;
        } else {
          return (
            <a
              rel="noopener noreferrer"
              onClick={() => handleViewResult(record)}
              style={{ cursor: "pointer" }}
            >
              <span style={{ fontWeight: "bold" }}> View Result</span>
            </a>
          );
        }
      },
    },
  ];
  const columns2 = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
    },
    {
      title: "Date and Time",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: (a, b) =>
        new Date(a.transactionDate) - new Date(b.transactionDate),
      render: (transactionDate) => {
        const date = new Date(transactionDate);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date
          .getDate()
          .toString()
          .padStart(2, "0")} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) =>
        Number(amount).toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      filters: [
        {
          text: "VERIFICATION",
          value: "VERIFICATION",
        },
        {
          text: "REFUND",
          value: "REFUND",
        },
        {
          text: "TOPUP",
          value: "TOPUP",
        },
      ],
      onFilter: (value, record) => record.transactionType.indexOf(value) === 0,
    },

    {
      title: "Status",
      key: "successful",
      filters: [
        {
          text: "Successful",
          value: "successful",
        },
        {
          text: "Failed",
          value: "Failed",
        },
      ],
      onFilter: (value, record) => {
        if (value === "successful") {
          return record.successful;
        } else {
          return !record.successful;
        }
      },
      dataIndex: "successful",
      sorter: (a, b) => {
        if (a.successful && b.successful) {
          return 0;
        } else if (a.successful) {
          return 1;
        } else {
          return -1;
        }
      },
      render: (_, record) => (
        <a rel="noopener noreferrer">
          {record.successful ? "Successful" : "Failed"}
        </a>
      ),
    },
  ];
  const items = [
    {
      key: "1",
      label: <span style={{ fontWeight: "bold" }}>Verification History</span>,
      children: (
        <>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{
              marginBottom: 8,
              width: 200,
              background: bgContainer,
              borderColor: text,
            }}
          />

          <div ref={componentRef}>
            {list && (
              <DynamicTable
                $token={token}
                expandable
                scroll={{ x: true }}
                columns={columns}
                dataSource={filteredData && filteredData}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleViewResult(record),
                    style: { cursor: "pointer" },
                  };
                }}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  className: "ant-pagination ant-pagination-item",
                  total: verificationData && verificationData.totalCount,
                  onChange: handlePageChange,
                  showSizeChanger: true,
                  position: ["bottomCenter"],
                }}
              />
            )}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <span style={{ fontWeight: "bold" }}>Transaction Logs</span>,
      children: (
        <>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={handleSearchTransaction}
            style={{
              marginBottom: 8,
              width: 200,
              background: bgContainer,
              borderColor: text,
            }}
          />
          <Row>
            <Col span={24}>
              <DynamicTable
                $token={token}
                scroll={{ x: true }}
                columns={columns2.reverse()} // Reverse the order of columns
                dataSource={
                  filteredDataTransaction &&
                  filteredDataTransaction.slice().reverse()
                } // Reverse the order of the dataSource array
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];
  const [amount, setAmount] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const [modal1Open, setModal1Open] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setAmount("");
    setIsModalVisible(false);
  };
  const handleModalOk = () => {
    dispatch(fetchUserProfile(userToken));
    setModal1Open(false);
  };
  const handleOk = async () => {
    ReactGA.event({
      category: "User",
      action: "Topped up wallet",
    });

    setIsModalVisible(false);
    try {
      // Assuming postData is the data you want to send to the endpoint
      const postData = {
        amount: amount,
        currency: userCurrency,
        country: "NG",
        description: "Wallet top up",
        payment_method: "card,mobilemoney,ussd",
        type: "TOPUP",
      };
      setAmount("");

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
        // Handle successful response here

        const responseData = await response.json();
        console.log(responseData.data.link);
        if (responseData.data && responseData.data.link) {
          console.log("Embedding URL:", responseData.data.link);
          setPaymentUrl(responseData.data.link);
          setModal1Open(true);
        } else {
          console.error("Response data does not contain a link");
        }
      } else {
        // Handle errors here
        console.error("Failed to post data:", response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    }
  };

  const [totalVerificationCount, setTotalVerificationCount] = useState(0);
  const [completedVerificationCount, setCompletedVerificationCount] =
    useState(0);
  const [failedVerificationCount, setFailedVerificationCount] = useState(0);
  useEffect(() => {
    if (verificationData && verificationData.requests) {
      setTotalVerificationCount(verificationData.totalCount);

      const completedVerifications =
        verificationData &&
        verificationData.requests.filter(
          (verification) => verification.consent !== "terminated"
        );
      setCompletedVerificationCount(verificationData.totalSuccessfulCount);

      const failedVerifications =
        verificationData &&
        verificationData.requests.filter(
          (verification) => verification.status === "terminated"
        );
      setFailedVerificationCount(verificationData.totalUnsuccessfulCount);
    } else {
      setTotalVerificationCount(0);
      setCompletedVerificationCount(0);
      setFailedVerificationCount(0);
    }
  }, [verificationData, transactionData]);
  const CustomStatistic = ({ title, value, valueStyle }) => (
    <div className="custom-statistic">
      <div
        className="custom-statistic-title"
        style={{ textAlign: "center", color: "#3f8600" }}
      >
        {title}
      </div>
      <div className="custom-statistic-value" style={valueStyle}>
        {value}
      </div>
    </div>
  );

  const pdfRef = useRef();

  const handleChange = (e) => {
    const value = e.target.value;

    // Validate if the input is a positive number
    if (/^[1-9]\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value); // Set the amount only if it's a positive number greater than zero
    }
  };

  const userBalance = userDetails?.walletBalance || 0;
  const formatToNaira = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);
  };
  const formatToDollar = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  // Usage
  return (
    <div style={{ backgroundColor: bgContainer }}>
      <Container>
        <Spin
          spinning={loadingSmall}
          tip="Fetching result ..."
          colorBgMask="red"
          style={{
            fontSize: "85px",
            fontWeight: "bold",
            color: text,
          }}
        >
          <InfoSec>
            <Row gutter={20}>
              <Col
                span={6}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Card
                  style={{
                    marginTop: "10px",
                    border: "3px #0DC939 solid",
                    borderRadius: "12px",
                    background: "#EBFFF0",
                    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)", // Increased intensity of shadow
                  }}
                >
                  <CustomStatistic
                    title="Total verifications "
                    value={totalVerificationCount}
                    valueStyle={{
                      color: "#3f8600",
                      fontSize: "50px",
                      fontWeight: "600",
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  />
                </Card>
              </Col>
              <Col
                span={6}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Card
                  style={{
                    marginTop: "10px",
                    border: "3px #0DC939 solid",
                    borderRadius: "12px",
                    background: "#EBFFF0",
                    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)", // Increased intensity of shadow
                  }}
                >
                  <CustomStatistic
                    title="Successful verifications "
                    value={completedVerificationCount}
                    valueStyle={{
                      color: "#3f8600",
                      fontSize: "50px",
                      fontWeight: "600",
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  />
                </Card>
              </Col>
              <Col
                span={6}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Card
                  style={{
                    marginTop: "10px",
                    border: "3px #0DC939 solid",
                    borderRadius: "12px",
                    background: "#EBFFF0",
                    boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)", // Increased intensity of shadow
                  }}
                >
                  <CustomStatistic
                    title="Unsuccessful verifications "
                    value={failedVerificationCount}
                    valueStyle={{
                      color: "#3f8600",
                      fontSize: "50px",
                      fontWeight: "600",
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                    }}
                  />
                </Card>
              </Col>
            </Row>
            <div style={{ marginTop: "30px" }}>
              {/* <Heading4>Recent Activities</Heading4> */}
              <MainButton
                type="primary"
                style={{ float: "right" }}
                onClick={showModal}
              >
                View Wallet
              </MainButton>
              <Modal
                title="User Wallet"
                visible={isModalVisible}
                onOk={handleOk}
                okText="Proceed to Payment"
                onCancel={handleCancel}
                width={300}
              >
                <Title level={5}> Wallet Balance:</Title>
                <Title level={3} style={{ color: "#0DC939" }}>
                  {userCurrency.toUpperCase() === "NGN"
                    ? formatToNaira(userBalance)
                    : `${formatToDollar(userBalance)}`}
                </Title>

                <Divider style={{ border: "1px solid #D9D9D9" }} />
                <Title level={5}>Fund Wallet</Title>
                <p>Enter Amount to Fund Wallet</p>
                <Input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleChange}
                />
              </Modal>
            </div>
            {/* <div class="postman-run-button"
            data-postman-action="collection/fork"
            data-postman-visibility="public"
            data-postman-var-1="40145473-bda811be-4766-4cd3-9f4f-1245bf3aaa96"
            data-postman-collection-url="entityId=40145473-bda811be-4766-4cd3-9f4f-1245bf3aaa96&entityType=collection&workspaceId=7222a8fe-9b7b-4ba7-9aa1-46b4cd965d34">
            </div> */}
          </InfoSec>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
              padding: "20px",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          />
          <Notification />
          <Modal
            // title="Complete Wallet TopUp"
            style={{
              top: 20,
            }}
            width={1000}
            open={modal1Open}
            onOk={handleModalOk}
            onCancel={handleModalOk}
            maskClosable={false}
            footer={[
              <Button
                type="dashed"
                style={{ color: text }}
                onClick={handleModalOk}
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
              // ref={iframeRef}
              // onLoad={handleIframeLoad}
            ></iframe>
            {/* <button onClick={getContentFromIframe}>Get Content from Iframe</button> */}
          </Modal>
        </Spin>
      </Container>
    </div>
  );
};

export default MainDashboard;

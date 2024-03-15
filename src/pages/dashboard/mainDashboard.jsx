import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Table,
  Tag,
  Tabs,
  Modal,
  Input,
  message,
  notification,
} from "antd";
import { Container, Heading4, InfoSec, MainButton } from "../../globalStyles";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
  fetchVerificationData,
  fetchTransactionData,
  updateUserWalletBalance,
  fetchUserProfile,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./emergency.css";
import Swal from "sweetalert2";
import { SearchOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import Notification from "../../Notification";

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

        setCurrencyCheck(response.data.data[0].currency);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setNinFee(null);
      }
    };

    fetchServiceFee();
  }, []);

  useEffect(() => {
    // Dispatch the fetchVerificationData action with the bearer token when the component mounts
    if (userToken) {
      dispatch(fetchVerificationData(userToken));
      dispatch(fetchTransactionData(userToken));
    }
    //!! Verification refresh timer
    // const interval = setInterval(() => {
    //   if (userToken) {
    //     dispatch(fetchVerificationData(userToken));
    //   }
    // }, 5000); // 3000 milliseconds = 3 seconds

    // Clean up the interval to avoid memory leaks
    // return () => clearInterval(interval);
  }, [dispatch, userToken]);

  // Log the verificationData to the console

  const [openedVerifications, setOpenedVerifications] = useState([]);
  console.log("currencyCheck");
  console.log(currencyCheck);

  //!! Update the verification open array to know which verification is opened
  // useEffect(() => {
  //   // Load opened verifications from storage or any other source
  //   const savedOpenedVerifications = localStorage.getItem(
  //     "openedVerifications"
  //   );
  //   if (savedOpenedVerifications) {
  //     setOpenedVerifications(JSON.parse(savedOpenedVerifications));
  //   }
  // }, []);

  const handleViewResult = (record) => {
    const { id, insertionDate, consent } = record;
    const currentDate = new Date();
    const fortyEightHoursAgo = new Date(
      currentDate.getTime() - 48 * 60 * 60 * 1000
    );
    const twentyFourHoursAgo = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000
    );

    // Check if the verification ID is not in the list of opened verifications
    // if (!openedVerifications.includes(id)) {
    //   // Add the verification ID to the list of opened verifications
    //   setOpenedVerifications((prevVerifications) => [...prevVerifications, id]);
    //   localStorage.setItem(
    //     "openedVerifications",
    //     JSON.stringify([...openedVerifications, id])
    //   );

    // Your existing logic for handling different scenarios
    if (
      ((record.type === "Basic Profile" ||
        record.type === "Financial Profile") &&
        new Date(insertionDate) < fortyEightHoursAgo) ||
      (record.consent === "pending" &&
        new Date(insertionDate) < twentyFourHoursAgo)
    ) {
      // message.error("Verification Result or Consent Expired");
      Swal.fire({
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
      Swal.fire({
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
      Swal.fire({
        title: "Info",
        text: "Awaiting Consent",
        icon: "info",
        customClass: {
          confirmButton: "custom-swal-button",
        },
      });
      return;
    }

    // If action is not expired, continue with navigation
    const searchParameter = record.searchParameter;
    localStorage.setItem("verificationRequestId", id);
    if (searchParameter === "Vehicle Registration Number") {
      history.push("/vehicle2");
    } else if (record.type === "Vehicle Profile") {
      history.push("/vehicle");
    } else if (record.type === "Business Profile") {
      if (record.searchParameter === "Company Name") {
        history.push("/businessName");
      } else {
        history.push("/business");
      }
    } else if (record.type === "Financial Profile") {
      history.push("/financial");
    } else {
      history.push("/result");
    }
    // }
  };

  //!! Check for first three verifications and display an alert
  // useEffect(() => {
  //   console.log("Verification Data:", openedVerifications);

  //   if (verificationData && verificationData.length > 0) {
  //     const firstThreeItems = verificationData.slice(0, 3);
  //     console.log(
  //       "Last three consents:",
  //       firstThreeItems.map((item) => item.consent)
  //     );
  //     const unopenedLastThree = firstThreeItems.filter(
  //       (item) => !openedVerifications.includes(item.id)
  //     );
  //     const anyGranted = unopenedLastThree.some(
  //       (item) => item.consent === "granted"
  //     );

  //     if (anyGranted) {
  //       alert("Yes");
  //     }
  //   }
  // }, [verificationData, openedVerifications, transactionData]);
  console.log("NEEWWWWWW");
  console.log(currencyCheck);
  const config = {
    //live key
    public_key: "FLWPUBK-6f8762e460e0a984f90b300be5d7a343-X",
    //test key
    // public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}TP",
    amount: "1000",
    currency: userCurrency == "usd" ? "USD" : "NGN",
    payment_options: "card,ussd, account, banktransfer, barter, nqr",
    customer: {
      email: userEmail,
      phone_number: userPhone,
      name: userName,
    },

    customizations: {
      title: "my Payment for Verification",
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
    verificationData &&
    verificationData.filter((record) => {
      return Object.keys(record).some(
        (key) =>
          record[key] &&
          record[key]
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
    });

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

        let formattedValue = record.searchValue;

        if (
          formattedValue &&
          (((record.type === "Basic Profile" ||
            record.type === "Financial Profile") &&
            new Date(record.insertionDate) < fortyEightHoursAgo) ||
            (record.consent === "pending" &&
              (record.type === "Basic Profile" ||
                record.type === "Financial Profile") &&
              new Date(record.insertionDate) < twentyFourHoursAgo))
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
                color: isRed ? "red" : "green",
                fontWeight: isRed ? "bold" : "normal",
              }}
            >
              {formattedValue ? formattedValue : "NO DATA"}
            </span>
            )
          </span>
        );
      },
    },

    {
      title: "Consent Status",
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
    // {
    //   title: "Action",
    //   key: "status",
    //   dataIndex: "status",
    //   render: (_, record) => (
    //     <a
    //       // href="/result"
    //       rel="noopener noreferrer"
    //       onClick={() => handleViewResult(record)}
    //       style={{ cursor: "pointer" }}
    //     >
    //       View Result
    //     </a>
    //   ),
    //   // render: (status) => <a href="/">status</a>,
    //   // render: (_, record) => <Space size="middle">{status}</Space>,
    // },
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

        if (
          ((type === "Basic Profile" || type === "Financial Profile") &&
            new Date(insertionDate) < fortyEightHoursAgo) ||
          (consent === "pending" &&
            new Date(insertionDate) < twentyFourHoursAgo)
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
      sorter: (a, b) => a.transactionID - b.transactionID,
    },
    {
      title: "Date and Time",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: (a, b) => b.transactionDate - a.transactionDate,
      render: (transactionDate) => {
        const date = new Date(transactionDate);
        const formattedDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return <span>{formattedDate}</span>;
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
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
      label: "Verification History",
      children: (
        <>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{ marginBottom: 8, width: 200 }}
          />
          <MainButton
            onClick={handlePrint}
            type="primary"
            hidden
            style={{ float: "right", width: 150, marginBottom: "20px" }}
          >
            {" "}
            Export to PDF{" "}
          </MainButton>
          <div ref={componentRef}>
            {list && (
              <Table
                expandable
                columns={columns}
                dataSource={filteredData && filteredData}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleViewResult(record),
                    style: { cursor: "pointer" },
                  };
                }}
                pagination={{
                  position: ["bottomCenter"],
                  className: "ant-pagination ant-pagination-item",
                }}
              />
            )}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Transaction Logs",
      children: (
        <>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={handleSearchTransaction}
            style={{ marginBottom: 8, width: 200 }}
          />
          <Row>
            <Col span={24}>
              <Table
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
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setAmount("");
    setIsModalVisible(false);
  };
  const handleOk = () => {
    // Perform any validation on the amount if needed
    // Save the amount to the config or use it as needed
    config.amount = amount;

    setIsModalVisible(false);
    handleFlutterPayment({
      callback: async (response) => {
        console.log(response);
        if (
          response.status === "successful" ||
          response.status === "success" ||
          response.status === "completed"
        ) {
          try {
            const apiUrl = "https://e-citizen.ng:8443/api/v2/transaction/topup";
            const requestData = {
              userNIN: userNin,
              email: userEmail,
              transactionID: response.transaction_id,
              successful: true,
              amount: response.amount,
            };

            const postResponse = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body: JSON.stringify(requestData),
            });

            if (postResponse.ok) {
              console.log("POST request successful");
              dispatch(fetchUserProfile(userToken));
              // Fetch the updated wallet balance after the successful top-up
              const apiUrlBalance =
                "https://e-citizen.ng:8443/api/v2/user/wallet-balance";
              const walletBalanceResponse = await fetch(apiUrlBalance, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              });

              if (walletBalanceResponse.ok) {
                const updatedWalletBalance = await walletBalanceResponse.json();
                console.log("Updated Wallet Balance:", updatedWalletBalance);

                // Update the user state with the new wallet balance
                dispatch(updateUserWalletBalance(updatedWalletBalance));
                Swal.fire({
                  title: "Success",
                  text: "Wallet topup was successful",
                  icon: "success",
                  customClass: {
                    confirmButton: "custom-swal-button",
                  },
                });
                // notification.success({
                //   message: "Success",
                //   description: "Wallet topup successful",
                //   duration: 10, // Duration in seconds
                // });
                // Update the local state if needed
                // setUserBal(updatedWalletBalance.walletBalance);
              }
            } else {
              console.error("POST request failed");
              // Handle failure if needed
            }
          } catch (error) {
            console.error("Error in POST request", error);
            // Handle error if needed
          }
        }
        closePaymentModal();
        handleCancel();
      },
      onClose: () => {
        handleCancel();
      },
    });
  };

  const [totalVerificationCount, setTotalVerificationCount] = useState(0);
  const [completedVerificationCount, setCompletedVerificationCount] =
    useState(0);
  const [failedVerificationCount, setFailedVerificationCount] = useState(0);
  useEffect(() => {
    if (verificationData) {
      setTotalVerificationCount(verificationData.length);
      const completedVerifications = verificationData.filter(
        (verification) => verification.consent !== "pending"
      );
      const failedVerifications = verificationData.filter(
        (verification) => verification.consent == "pending"
      );
      setCompletedVerificationCount(completedVerifications.length);
      setFailedVerificationCount(failedVerifications.length);
    }
  }, [verificationData]);
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

  // Usage
  return (
    <Container>
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
            Fund Wallet
          </MainButton>
          <Modal
            title="Enter Amount to Fund Wallet"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={300}
          >
            <Input
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={handleChange}
            />
          </Modal>
        </div>
      </InfoSec>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Notification />
    </Container>
  );
};

export default MainDashboard;

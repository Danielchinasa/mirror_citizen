import React, { useState, useEffect } from "react";
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
  const [ninFee, setNinFee] = useState("");
  const [faceFee, setFaceFee] = useState("");
  const [vehicleFee, setVehicleFee] = useState("");
  const [vinVehicleFee, setVinVehicleFee] = useState("");
  const [businessFee, setBusinessFee] = useState("");
  const [financialFee, setFinancialFee] = useState("");
  const [currencyCheck, setCurrencyCheck] = useState("NGN");

  useEffect(() => {
    // Dispatch the fetchVerificationData action with the bearer token when the component mounts
    if (userToken) {
      dispatch(fetchVerificationData(userToken));
      dispatch(fetchTransactionData(userToken));
    }
  }, [dispatch, userToken]);

  // Log the verificationData to the console

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
        console.log(response.data[0].price);
        setNinFee(response.data[0].price);
        setFaceFee(response.data[1].price);
        setBusinessFee(response.data[2].price);
        setFinancialFee(response.data[4].price);
        setVinVehicleFee(response.data[5].price);
        setVehicleFee(response.data[6].price);
        setCurrencyCheck(response.data[0].currency);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setNinFee(null);
      }
    };

    fetchServiceFee();
  }, []);

  useEffect(() => {
    console.log("Verification Data:", verificationData);
    // const requestId = verificationData || "";
    // localStorage.setItem("verificationRequestId", requestId);
  }, [verificationData, transactionData]);

  const handleViewResult = (record) => {
    // Extract the id from the record
    const verificationRequestId = record.id;
    const consentStatus = record.consent;
    const type = record.type;
    const searchParameter = record.searchParameter;
    // console.log("jjjj");
    // console.log(verificationRequestId);
    // Store the id in localStorage
    localStorage.setItem("verificationRequestId", verificationRequestId);
    if (searchParameter === "Vehicle Registration Number") {
      history.push("/vehicle2");
    } else if (type === "Vehicle profiling") {
      history.push("/vehicle");
    } else if (type === "Business profiling") {
      history.push("/business");
    } else if (type === "Financial profiling") {
      history.push("/financial");
    } else {
      history.push("/result");
    }
  };

  const config = {
    //live key
    // public_key: "FLWPUBK-6f8762e460e0a984f90b300be5d7a343-X",
    //test key
    public_key: "FLWPUBK_TEST-006b0a065ec9aff889e81054660b0ee9-X",
    tx_ref: "EA${user.id}${DateTime.now().millisecondsSinceEpoch}TP",
    amount: "1000",
    currency: currencyCheck == "USD" ? "USD" : "NGN",
    payment_options:
      "card,mobilemoney,ussd, account, banktransfer, barter, nqr",
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
      title: "Consent Status",
      dataIndex: "consent",
      key: "consent",
      sorter: (a, b) => a.consent - b.consent,
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
    },
    {
      title: "Selected Profile",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type - b.type,
      filters: [
        {
          text: "nin",
          value: "nin",
        },
        {
          text: "Phone number",
          value: "Phone number",
        },
        {
          text: "Demographic",
          value: "Demographic",
        },
        {
          text: "Face",
          value: "Face",
        },
        {
          text: "Finger",
          value: "Finger",
        },
        {
          text: "bvn",
          value: "bvn",
        },
      ],
      onFilter: (value, record) => record.consent.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <a
          // href="/result"
          rel="noopener noreferrer"
          onClick={() => handleViewResult(record)}
          style={{ cursor: "pointer" }}
        >
          View Result
        </a>
      ),
      // render: (status) => <a href="/">status</a>,
      // render: (_, record) => <Space size="middle">{status}</Space>,
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
    },
    {
      title: "Status",
      key: "successful",
      dataIndex: "successful",
      sorter: (a, b) => a.successful - b.successful,
      render: (_, record) => (
        <a rel="noopener noreferrer">
          {record.successful ? "Successful" : "Failed"}
        </a>
      ),

      // render: (status) => <a href="/">status</a>,
      // render: (_, record) => <Space size="middle">{status}</Space>,
    },
  ];
  const items = [
    {
      key: "1",
      label: "Verification History",
      children: (
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={verificationData && verificationData.reverse()}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => handleViewResult(record),
                  style: { cursor: "pointer" },
                };
              }}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Transaction Logs",
      children: (
        <Row>
          <Col span={24}>
            <Table
              columns={columns2}
              dataSource={transactionData && transactionData}
            />
          </Col>
        </Row>
      ),
    },
  ];
  const [amount, setAmount] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    // Perform any validation on the amount if needed
    // Save the amount to the config or use it as needed
    config.amount = amount;

    setIsModalVisible(false);
    handleFlutterPayment({
      callback: async (response) => {
        console.log(response);
        if (response.status === "successful") {
          try {
            const apiUrl = "http://41.184.212.26:8069/api/v2/transaction/topup";
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
                "http://41.184.212.26:8069/api/v2/user/wallet-balance";
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
      },
      onClose: () => {},
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
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
                border: "5px solid #09C93A",
                background: "#EBFFF0",
              }}
            >
              <CustomStatistic
                title="Total verification "
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
                border: "5px solid #09C93A",
                background: "#EBFFF0",
              }}
            >
              <CustomStatistic
                title="Successful verification "
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
                border: "5px solid #09C93A",
                background: "#EBFFF0",
              }}
            >
              <CustomStatistic
                title="Failed verification "
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
          >
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Modal>

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </InfoSec>
    </Container>
  );
};

export default MainDashboard;

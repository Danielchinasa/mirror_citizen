import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GlobalStyles from "./globalStyles";
import {Navbar, Footer} from "./components";
import Home from "./pages/HomePage/Home";
import Products from "./pages/Products/Products";
import SignUp from "./pages/SignUp/SignUp";
import ScrollToTop from "./components/ScrollToTop";
import {ConfigProvider} from "antd";
import LoginPage from "./pages/Login/loginPage";

function App() {
    return (
        <Router>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#09C93A",
                    },
                }}
            >
                <GlobalStyles />
                <ScrollToTop />
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/products" component={Products} />
                    <Route path="/sign-up" component={SignUp} />
                </Switch>
                <Footer />
            </ConfigProvider>
        </Router>
    );
}

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./theme.scss";
import "./App.scss";
import Borrow from "./components/View/Borrow/Borrow";
import Info from "./components/View/Info/Info";
import Layout from "./components/Layout/Layout";
import Lend from "./components/View/Lend/Lend";
import Migrate from "./components/View/Migrate/Migrate";
import Mining from "./components/View/Mining/Mining";
import LoadingPage from "./components/View/UI/LoadingPage/LoadingPage";
import Redeem from "./components/View/Redeem/Redeem";
import Repay from "./components/View/Repay/Repay";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Swap from "components/View/Swap/Swap";
import dotEnv from "dotenv";
import { Alert } from "react-bootstrap";
import AlertImg from "assets/warning.svg";
import useWalletConnect from "hooks/useWalletConnect";
import { useActions } from "hooks/useActions";

// declare const window: any;
function App() {
  const [alertShow, setAlertShow] = useState<Boolean>(true);
  const [loading, setLoading] = useState<Boolean>(true);
  // const { connectWalletAction } = useActions();
  const { theme } = useTypedSelector((state) => state.settings);
  const {
    handleWalletConnect,
    walletProvider,
    connectedWallet,
    accounts,
    selectedNetworkId,
    currentProvider,
    getAccountBalance,
  } = useWalletConnect();
  const { getUniLendLbRouter } = useActions();
  useEffect(() => {
    dotEnv.config();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    console.log("starting");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connectedWallet) {
      handleWalletConnect(JSON.parse(connectedWallet));
      getUniLendLbRouter(currentProvider);
    }
  }, [walletProvider, connectedWallet, currentProvider]);
  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      handleTokenBalance();
    }, 5000);
    return () => clearInterval(interval);
  }, [accounts, selectedNetworkId]);
  const handleTokenBalance = () => {
    if (accounts.length && currentProvider)
      getAccountBalance(accounts[0], selectedNetworkId);
  };
  return (
    <div className={`App ${theme} mainapp`}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {alertShow && (
            <Alert onClose={() => setAlertShow(false)} dismissible>
              {/* {/ <Alert.Heading>Oh snap! You got an error!</Alert.Heading> /} */}
              <div className="alertbody d-flex align-items-center">
                <img className="icon" src={AlertImg} alt="alert" />
                <p className="alertext ml-3">
                  UniLend FlashLoan contract has been
                  <a
                    href="https://unilend.finance/docs/unilend_flashloan_audit_report.pdf"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {` audited by Certik`}
                  </a>
                  . However, it is still in beta, use it at your own risk.
                  Please familiarize yourself with the platform to understand
                  the correct usage and features of the platform.
                </p>
              </div>
            </Alert>
          )}
          <Layout>
            <div className={`app-bg`}>
              <div className={`bg-vector ${theme}`}>
                <div
                  className="pt-6"
                  style={{ height: "100%", overflow: "auto" }}
                >
                  <Switch>
                    <Route path="/swap" exact component={Swap} />
                    <Route path="/lend" exact component={Lend} />
                    <Route path="/borrow" exact component={Borrow} />
                    <Route path="/migrate" exact component={Migrate} />
                    <Route path="/mining" exact component={Mining} />
                    <Route path="/redeem" exact component={Redeem} />
                    <Route path="/repay" exact component={Repay} />
                    <Route path="/info" exact component={Info} />
                    <Redirect from="/" to="/borrow" />
                  </Switch>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </div>
  );
}

export default App;

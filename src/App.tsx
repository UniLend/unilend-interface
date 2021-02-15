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
import { useActions } from "./hooks/useActions";
import Swap from "components/View/Swap/Swap";
declare const window: any;
function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  const { connectWalletAction } = useActions();
  const { theme } = useTypedSelector((state) => state.settings);

  useEffect(() => {
    if (window && window.ethereum !== undefined && window !== undefined) {
      window.ethereum.on("disconnect", () => {});
      window.ethereum.on("accountsChanged", (accounts: any) => {
        connectWalletAction();
      });
      window.ethereum.on("chainChanged", (chainId: any) => {
        window.location.reload();
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`App ${theme}`}>
      {loading ? (
        <LoadingPage />
      ) : (
        <Layout>
          <div className={`app-bg`}>
            <div className={`bg-vector ${theme}`}>
              <div
                className="pt-6"
                style={{ height: "100%", overflow: "auto", paddingTop: "60px" }}
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
      )}
    </div>
  );
}

export default App;

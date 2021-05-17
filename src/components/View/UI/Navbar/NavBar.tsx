import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
// import { shortenAddress } from "../../../../utils";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { WalletInfoProps } from "../../../Helpers/Types";
import { NETWORKS } from "components/constants";

import {
  ThemeButton,
  AccountBalance,
  ActiveNetwork,
  NetworkInfoTab,
  AddressTab,
  ConnectWalletButton,
} from "./Common";

interface Props extends RouteComponentProps<any> {
  setWalletModalInfo: Dispatch<SetStateAction<boolean>>;
  setWalletStatusInfo: Dispatch<SetStateAction<WalletInfoProps>>;
  setSwitchNetworkModal: Dispatch<SetStateAction<boolean>>;
}

const NavBar: React.FC<Props> = (props) => {
  const {
    setWalletModalInfo,
    setWalletStatusInfo,
    setSwitchNetworkModal,
  } = props;

  const [currentPage, setCurrentPage] = useState("");
  const { theme } = useTypedSelector((state) => state.settings);
  const { themeChange, networkSwitchHandling } = useActions();
  const {
    walletConnected,
    accounts,
    // handleWalletConnect,
    currentProvider,
    loading,
    accountBalance,
  } = useWalletConnect();

  const { selectedNetworkId, activeNetWork } = useTypedSelector(
    (state) => state.configureWallet
  );

  const networkInfo = NETWORKS.filter(
    (item) => item.id === selectedNetworkId
  )[0];
  // const { accounts, walletConnected, loading } = useTypedSelector(
  //   (state) => state.configureWallet
  // );
  useEffect(() => {
    if (walletConnected) {
      networkSwitchHandling(currentProvider);      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentProvider,
    walletConnected,
    selectedNetworkId,
  ]);

  useEffect(() => {
    setCurrentPage(props.location.pathname);
  }, [props.location.pathname]);

  const handleUpdate = () => {
    themeChange(theme);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}>
        <div className="container-fluid">
          <Link className="navbar-brand navbar-brand-custom" to="#">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-top"
            />
          </Link>
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
           */}
            <div
            className=" float-right top-nav-links"
            id="navbarSupportedContent"
            >
            <ul className="navbar-nav me-auto mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className={
                    currentPage === "/swap" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/swap"
                >
                  Swap
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/borrow" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/borrow"
                >
                  Borrow
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/lend" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/lend"
                >
                  Lend
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/redeem" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/redeem"
                >
                  Redeem
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/repay" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/repay"
                >
                  Repay
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={
                    currentPage === "/migrate" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/migrate"
                >
                  Migrate
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className={
                    currentPage === "/mining" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/mining"
                >
                  Mining
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/info" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/info"
                >
                  Info
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="app-wallet-details">
            {walletConnected && !loading ? (
              <ActiveNetwork
                theme={theme}
                activeNetWork={activeNetWork}
                className="btn-custom-secondary"
              />
            ) : (
              ""
            )}
            
            <NetworkInfoTab
              theme={theme}
              logo={networkInfo.logo}
              label={networkInfo.label}
              onClick={() => {
                setSwitchNetworkModal(true);
            }}/>
            {/* {walletConnected && accounts.length && accountBalance ? ( */}
              {walletConnected && accounts.length && true ? (
              <AccountBalance
                theme={theme}
                // accountBalance={accountBalance}
                // tokenType={selectedNetworkId}
                accountBalance={accountBalance}
                tokenType={selectedNetworkId}
                className="acc-balance-header"
              />
            ) : (
              ""
            )}

            {(accounts && accounts.length) || walletConnected ? (
              <AddressTab
                theme={theme}
                onClick={() =>
                  setWalletStatusInfo({
                    show: true,
                    address: accounts[0],
                  })
                }
                address={accounts[0]}
              />
            ) : (
              <ConnectWalletButton
                theme={theme}
                onClick={() => setWalletModalInfo(true)}
                loading={loading}
              />
            )}

          </div>

          {/* {(accounts && accounts.length) || walletConnected ? (
            <button
              className={`d-flex btn ${
                theme === "dark" && "btn-dark"
              } btn-custom-secondary`}
              onClick={handleWalletConnect}
            >
              {shortenAddress(accounts[0])}
            </button>
          ) : (
            <button
              className={`d-flex btn ${
                theme === "dark" && "btn-dark"
              } btn-custom-secondary`}
              onClick={handleWalletConnect}
            >
              {!loading ? (
                <span>
                  <img
                    src={theme === "light" ? walletlight : walletdark}
                    width="26"
                    alt="Wallet"
                    className="d-inline-block px-1"
                  />
                  Connect wallet
                </span>
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          )} */}
          {/* <button
            onClick={() => handleUpdate()}
            className={`d-flex ml-3 btn ${
              theme === "dark" && "btn-dark"
            } btn-custom-secondary btn-theme-icon`}
          >
            {
              <img
                width="20"
                src={theme === "light" ? sun : moon}
                alt="theme"
              />
            }
          </button> */}
           <ThemeButton
              onClick={handleUpdate}
              theme={theme}
              dflex={true}
              className="ml-3 btn-theme-icon-header btn-h"
            />
        </div>
      </nav>
    </>
  );
};
export default withRouter(NavBar);

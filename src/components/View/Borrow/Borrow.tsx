import React, { FC, useEffect, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";

interface Props {}

const Borrow: FC<Props> = (props) => {
  const [yourCollateral, setYourCollateral] = useState("");
  const [borrowReceived, setBorrowReceived] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [currFieldName, setCurrFieldName] = useState("");
  const [collateralBal, setCollateralBal] = useState("ht");
  const [receivedType, setReceived] = useState("eth");
  const { getBorrowInterest, handleBorrowValueChange, handleBorrowAction } =
    useActions();
  const {
    walletConnected,
    accounts,
    connectedWallet,
    currentProvider,
    handleWalletConnect,
  } = useWalletConnect();
  const { unilendLbRouter, assetPoolAddress } = useTypedSelector(
    (state) => state.configureWallet
  );

  const {
    borrowInterest,
    borrowLtv,
    borrowLbv,
    liquidityAvailable,
    lbAmount1,
    lbAmount2,
    tokenBalance,
  } = useTypedSelector((state) => state.borrow);

  const [transModalInfo, setTransModalInfo] = useState<boolean>(false);
  const { borrowTransHxReceived, borrowErrorMessage, borrowLoading } =
    useTypedSelector((state) => state.borrow);

  useEffect(() => {
    if (assetPoolAddress) {
      getBorrowInterest(assetPoolAddress, accounts[0], currentProvider);
    }
    // setYourCollateral(lbAmount1);
    setBorrowReceived(lbAmount2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetPoolAddress, lbAmount1, lbAmount2]);

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleCurrChange = (selectedField: any) => {
    switch (currFieldName) {
      case "borrowCollateral":
        setCollateralBal(selectedField.name);
        break;
      case "borrowReceived":
        setReceived(selectedField.name);
        break;
      default:
        break;
    }
    setShowModel(false);
  };

  const handleBorrow = () => {
    setTransModalInfo(true);
    handleBorrowAction(
      accounts[0],
      unilendLbRouter,
      yourCollateral,
      borrowReceived,
      currentProvider
    );
  };

  let curencySelectModel = (
    <CurrencySelectModel
      currFieldName={currFieldName}
      handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
      show={showModel}
      handleClose={handleModelClose}
    />
  );
  const handleMainButton = () => {
    if (
      accounts &&
      accounts.length &&
      yourCollateral <= tokenBalance &&
      walletConnected
    ) {
      return (
        <button
          disabled={yourCollateral === "" || borrowLoading === true}
          className="btn btn-lg btn-custom-primary"
          onClick={handleBorrow}
          type="button"
        >
          Borrow
          {borrowLoading && (
            <div className="spinner-border approve-loader" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      );
    } else if (walletConnected && yourCollateral > tokenBalance) {
      return (
        <button className="btn btn-lg btn-custom-primary" disabled>
          Insufficient Balance
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={() => handleWalletConnect(JSON.parse(connectedWallet))}
        >
          Connect Wallet
        </button>
      );
    }
  };
  return (
    <>
      <ContentCard title="Borrow">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              setYourCollateral(e.target.value);
              if (walletConnected && yourCollateral <= tokenBalance) {
                setTimeout(() => {
                  handleBorrowValueChange(
                    e.target.value,
                    unilendLbRouter,
                    currentProvider
                  );
                }, 1000);
              }
            }}
            setFieldValue={setYourCollateral}
            handleModelOpen={() => handleModelOpen("borrowCollateral")}
            fieldLabel="Your Collateral"
            fieldValue={lbAmount1}
            fieldType="number"
            selectLabel={`Balance: ${tokenBalance}`}
            selectValue={collateralBal}
          />
          <div className="pt-3"></div>
          <FieldCard
            onF1Change={(e: any) => {
              setBorrowReceived(e.target.value);
            }}
            setFieldValue={() => {}}
            fieldLabel="Received"
            fieldValue={setBorrowReceived}
            fieldType="number"
            selectLabel=""
            selectValue={receivedType}
            handleModelOpen={() => handleModelOpen("borrowReceived")}
          />
          <div className="d-grid py-3">{handleMainButton()}</div>
          <div className="price_head">
            <div className="price_aa">
              <div className="price-list">
                Borrow APR{" "}
                <span className="price">
                  {borrowInterest === "" ? "-" : borrowInterest}
                </span>
              </div>
              <div className="price-list">
                LTV{" "}
                <span className="price ltv">
                  {borrowLtv === "" ? "-" : borrowLtv}
                </span>
              </div>
              <div className="price-list">
                LBV{" "}
                <span className="price lbv">
                  {borrowLbv === "" ? "-" : borrowLbv}
                </span>
              </div>
              <div className="price-list">
                Liquidity Available{" "}
                <span className="price avail">
                  {liquidityAvailable === "" ? "-" : liquidityAvailable}
                </span>
              </div>
            </div>
          </div>
        </div>
        {curencySelectModel}
      </ContentCard>
      {transModalInfo && (
        <TransactionPopup
          handleClose={() => {
            setTransModalInfo(false);
          }}
          mode={
            !borrowTransHxReceived && !borrowErrorMessage
              ? "loading"
              : borrowTransHxReceived
              ? "success"
              : "failure"
          }
        />
      )}
    </>
  );
};

export default Borrow;

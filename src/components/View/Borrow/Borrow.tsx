import React, { FC, useEffect, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { useStore } from "../../../store/store";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import web3 from "../../../ethereum/web3";
import { UnilendLBContract } from "../../../ethereum/contracts/UnilendLB";
import {
  assetAddress,
  collateralAddress,
  currencyList,
} from "../../../ethereum/contracts";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface Props {}

const Borrow: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const [yourCollateral, setYourCollateral] = useState("");
  const [borrowReceived, setBorrowReceived] = useState("");
  const [showModel, setShowModel] = useState(false);
  const setMessage = useState("")[1];
  const [currFieldName, setCurrFieldName] = useState("");
  const [collateralBal, setCollateralBal] = useState("ht");
  const [receivedType, setReceived] = useState("eth");
  const {
    connectWalletAction,
    getBorrowInterest,
    handleBorrowValueChange,
  } = useActions();
  const {
    accounts,
    walletConnected,
    assetPoolAddress,
    unilendLbRouter,
  } = useTypedSelector((state) => state.configureWallet);
  const {
    borrowInterest,
    borrowLtv,
    borrowLbv,
    liquidityAvailable,
    lbAmount1,
    lbAmount2,
  } = useTypedSelector((state) => state.borrow);

  useEffect(() => {
    if (assetPoolAddress) {
      getBorrowInterest(assetPoolAddress);
      // getTSupply(assetPoolAddress, borrowInterest);
    }
    // setYourCollateral(lbAmount1);
    setBorrowReceived(lbAmount2);
  }, [assetPoolAddress, lbAmount1, lbAmount2]);

  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");
    connectWalletAction();
    setMessage("You have been entered!");
  };

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

  const handleBorrow = async () => {
    const unilendLB = UnilendLBContract(unilendLbRouter);
    debugger;
    const amount1 = web3.utils.toWei(yourCollateral, "ether");
    const amount2 = web3.utils.toWei(borrowReceived, "ether");
    unilendLB.methods
      .borrow(collateralAddress, assetAddress, amount1, amount2)
      .send({
        from: accounts[0],
      })
      .on("transactionHash", (result: any) => {
        // console.log(result);
      })
      .on("error", function (error: any) {
        console.log(error);
      });
  };

  return (
    <>
      <ContentCard title="Borrow">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              setYourCollateral(e.target.value);
              if (walletConnected) {
                setTimeout(() => {
                  handleBorrowValueChange(e.target.value, unilendLbRouter);
                  // setBorrowReceived(lbAmount1);
                }, 1000);
              }
            }}
            handleModelOpen={() => handleModelOpen("borrowCollateral")}
            fieldLabel="Your Collateral"
            fieldValue={lbAmount1}
            fieldType="number"
            selectLabel="Balance"
            selectValue={collateralBal}
            list={currencyList}
          />
          <div className="pt-3"></div>
          <FieldCard
            onF1Change={(e: any) => {
              setBorrowReceived(e.target.value);
            }}
            fieldLabel="Received"
            fieldValue={lbAmount2}
            fieldType="text"
            selectLabel=""
            selectValue={receivedType}
            handleModelOpen={() => handleModelOpen("borrowReceived")}
            list={currencyList}
          />
          <div className="d-grid py-3">
            {(accounts && accounts.length) || walletConnected ? (
              <button
                className="btn btn-lg btn-custom-primary"
                onClick={handleBorrow}
                type="button"
              >
                Borrow
              </button>
            ) : (
              <button
                className="btn btn-lg btn-custom-primary"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
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
        <CurrencySelectModel
          currFieldName={currFieldName}
          handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
          show={showModel}
          handleClose={handleModelClose}
        />
      </ContentCard>
    </>
  );
};

export default Borrow;

import React, { FC, useCallback, useEffect, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import eth from "assets/eth.svg";
import "./Redeem.scss";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";

interface Props {}

const Redeem: FC<Props> = (props) => {
  const [redeemAmount, setRedeemAmount] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [currFieldName, setCurrFieldName] = useState("");
  const [youRedeem, setYouRedeem] = useState("ht");
  const { accounts, connectedWallet, currentProvider, handleWalletConnect } =
    useWalletConnect();
  const { getCollateralAmount, getCollateralAmountBase, handleRedeemAction } =
    useActions();
  const { unilendLbRouter, assetPoolAddress } = useTypedSelector(
    (state) => state.configureWallet
  );
  const {
    collateralShare,
    collateralShareBase,
    redeemTransHxReceived,
    redeemErrorMessage,
    redeemLoading,
  } = useTypedSelector((state) => state.redeem);
  const [transModalInfo, setTransModalInfo] = useState<boolean>(false);
  // const { youOwe } = useTypedSelector((state) => state.repay);
  const handleFieldValue = useCallback(() => {
    getCollateralAmount(assetPoolAddress, accounts[0], currentProvider);
    getCollateralAmountBase(assetPoolAddress, accounts[0], currentProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetPoolAddress]);

  useEffect(() => {
    if (assetPoolAddress) {
      handleFieldValue();
      // getTSupply(assetPoolAddress);
    }
  }, [assetPoolAddress, handleFieldValue]);

  function handleModelClose() {
    setShowModel(false);
  }

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleCurrChange = (selectedField: any) => {
    setYouRedeem(selectedField.name);
    setShowModel(false);
  };

  const handleRedeem = async () => {
    setTransModalInfo(true);
    handleRedeemAction(
      unilendLbRouter,
      redeemAmount,
      accounts,
      currentProvider
    );
  };

  return (
    <>
      <ContentCard title="Redeem">
        <div className="mb-3">
          <div className="row mt-3">
            <div className="col-6">
              <img className="ticker_img  mr-2" src={eth} alt="Eth" />
              <span className="ticker_name">uWETH</span>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <p className="collateralAmount">{collateralShare}</p>
            </div>
          </div>
          <hr className="ticket_linebreak" />
          <div className="row mt-3">
            <div className="col-6">
              <img className="ticker_img  mr-2" src={eth} alt="Eth" />
              <span className="ticker_name">ETH</span>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <p className="collateralAmount">
                {collateralShareBase === "0"
                  ? collateralShareBase
                  : `~${collateralShareBase}`}
              </p>
            </div>
            <hr className="ticket_linebreak" />
          </div>
        </div>
        <FieldCard
          onF1Change={(e: any) => {
            setRedeemAmount(e.target.value);
          }}
          setFieldValue={setRedeemAmount}
          fieldType="number"
          fieldValue={redeemAmount}
          handleModelOpen={() => handleModelOpen("youRedeem")}
          fieldLabel="You Redeem"
          selectLabel=""
          selectValue={youRedeem}
        />
        <div className="d-grid pt-4">
          {accounts.length > 0 ? (
            <button
              disabled={redeemAmount.length < 1 || redeemLoading}
              className="btn btn-lg btn-custom-primary"
              onClick={handleRedeem}
              type="button"
            >
              Redeem
              {redeemLoading && (
                <div className="spinner-border approve-loader" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          ) : (
            <button
              className="btn btn-lg btn-custom-primary"
              onClick={() => handleWalletConnect(JSON.parse(connectedWallet))}
            >
              Connect Wallet
            </button>
          )}
        </div>
        <div className="price_head py-3">
          <div className="price_aa">
            <div className="price-list">
              Liquidity Available ( ETH )<span className="price">-</span>
            </div>
          </div>
        </div>
        <CurrencySelectModel
          show={showModel}
          handleClose={handleModelClose}
          handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
          currFieldName={currFieldName}
        />
      </ContentCard>

      {transModalInfo && (
        <TransactionPopup
          handleClose={() => {
            setTransModalInfo(false);
          }}
          mode={
            !redeemTransHxReceived && !redeemErrorMessage
              ? "loading"
              : redeemTransHxReceived
              ? "success"
              : "failure"
          }
        />
      )}
    </>
  );
};

export default Redeem;

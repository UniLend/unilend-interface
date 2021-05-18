import React, { FC, useEffect, useState } from "react";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";
import useWalletConnect from "hooks/useWalletConnect";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";

interface Props {}

const Lend: FC<Props> = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [lendAmount, setLendAmount] = useState("");
  const [currFieldName, setCurrFieldName] = useState("");
  const [yourLend, setYourLend] = useState("ht");
  const {
    walletConnected,
    accounts,
    connectedWallet,
    currentProvider,
    handleWalletConnect,
  } = useWalletConnect();
  const { handleLendAction, getBorrowInterest } = useActions();
  const { unilendLbRouter, assetPoolAddress, accountBalance } =
    useTypedSelector((state) => state.configureWallet);
  const { lendTransHxReceived, lendErrorMessage, lendLoading } =
    useTypedSelector((state) => state.lend);
  const { lendInterest } = useTypedSelector((state) => state.borrow);
  const [transModalInfo, setTransModalInfo] = useState<boolean>(false);

  useEffect(() => {
    if (assetPoolAddress) {
      getBorrowInterest(assetPoolAddress, accounts[0], currentProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetPoolAddress]);
  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleCurrChange = (selectedField: any) => {
    setYourLend(selectedField.name);
    setShowModel(false);
  };

  const handleLend = async () => {
    setTransModalInfo(true);
    handleLendAction(unilendLbRouter, accounts, lendAmount, currentProvider);
  };

  return (
    <>
      <ContentCard title="Lend">
        <FieldCard
          onF1Change={(e: any) => {
            setLendAmount(e.target.value);
          }}
          setFieldValue={setLendAmount}
          fieldType="text"
          fieldValue={lendAmount}
          handleModelOpen={() => handleModelOpen("yourLend")}
          fieldLabel="You Lend"
          selectValue={yourLend}
          selectLabel=""
        />
        <div className="price_head py-4">
          <div className="price_aa">
            <div className="price-list">
              Balance{" "}
              <span className="price">
                {accountBalance ? `${accountBalance}` : ""}
              </span>
            </div>
            <div className="price-list">
              Deposit APY{" "}
              <span className="price">
                {lendInterest === "" ? "-" : lendInterest}
              </span>
            </div>
          </div>
        </div>
        <div className="d-grid py-3">
          {walletConnected ? (
            <button
              disabled={lendAmount.length < 1 || lendLoading}
              className="btn btn-lg btn-custom-primary"
              onClick={handleLend}
              type="button"
            >
              Lend
              {lendLoading && (
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
        <CurrencySelectModel
          handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
          currFieldName={currFieldName}
          show={showModel}
          handleClose={handleModelClose}
        />
      </ContentCard>
      {transModalInfo && (
        <TransactionPopup
          handleClose={() => {
            setTransModalInfo(false);
          }}
          mode={
            !lendTransHxReceived && !lendErrorMessage
              ? "loading"
              : lendTransHxReceived
              ? "success"
              : "failure"
          }
        />
      )}
    </>
  );
};

export default Lend;

import React, { FC, useEffect, useState } from "react";
import { currencyList } from "../../../ethereum/contracts";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useStore } from "../../../store/store";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Lend: FC<Props> = (props) => {
  const [showModel, setShowModel] = useState(false);
  const [lendAmount, setLendAmount] = useState("");
  const [currFieldName, setCurrFieldName] = useState("");
  const [yourLend, setYourLend] = useState("ht");
  const {
    connectWalletAction,
    handleLendAction,
    getBorrowInterest,
  } = useActions();
  const {
    accounts,
    walletConnected,
    unilendLbRouter,
    assetPoolAddress,
    accountBalance,
  } = useTypedSelector((state) => state.configureWallet);

  const { lendInterest } = useTypedSelector((state) => state.borrow);

  useEffect(() => {
    if (assetPoolAddress) {
      getBorrowInterest(assetPoolAddress);
    }
  }, [assetPoolAddress]);
  const handleModelClose = () => {
    setShowModel(false);
  };

  const connectWallet = async () => {
    connectWalletAction();
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
    handleLendAction(unilendLbRouter, accounts, lendAmount);
  };

  return (
    <>
      <ContentCard title="Lend">
        <FieldCard
          onF1Change={(e: any) => {
            setLendAmount(e.target.value);
          }}
          fieldType="text"
          handleModelOpen={() => handleModelOpen("yourLend")}
          fieldLabel="You Lend"
          selectValue={yourLend}
          selectLabel={accountBalance ? `Balance:${accountBalance}` : ""}
          list={currencyList}
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
              disabled={lendAmount.length < 1}
              className="btn btn-lg btn-custom-primary"
              onClick={handleLend}
              type="button"
            >
              Lend
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
        <CurrencySelectModel
          handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
          currFieldName={currFieldName}
          show={showModel}
          handleClose={handleModelClose}
        />
      </ContentCard>
    </>
  );
};

export default Lend;

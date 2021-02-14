import React, { FC, useEffect, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";

import "./Swap.scss";
import switchIcon from "../../../assets/switch.svg";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { currencyList } from "ethereum/contracts";
import { useTypedSelector } from "hooks/useTypedSelector";
interface Props {}

const Swap: FC<Props> = (props) => {
  const setMessage = useState("")[1];
  const [showModel, setShowModel] = useState(false);
  const [currFieldName, setCurrFieldName] = useState("");
  const { accounts, walletConnected } = useTypedSelector(
    (state) => state.configureWallet
  );
  useEffect(() => {}, []);

  const connectWallet = async () => {
    // dispatch("CONNECT_WALLET", {});
    setMessage("Waiting on transaction success...");
    console.log(walletConnected);
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
    console.log("selected", selectedField);
  };
  return (
    <ContentCard title="Swap">
      <div className="swap-root">
        <FieldCard
          onF1Change={(e: any) => {
            console.log(e);
          }}
          fieldValue=""
          fieldType="number"
          fieldLabel="Your Collateral"
          selectLabel="Balance: -"
          selectValue={""}
          handleModelOpen={() => handleModelOpen("collateralBalance")}
          list={currencyList.currency}
        />
        <div className="switch-body py-3">
          <button className="btn btn-icon align-center">
            <img src={switchIcon} alt="" />
          </button>
        </div>
        <FieldCard
          onF1Change={(e: any) => {
            console.log(e);
          }}
          fieldType="number"
          fieldValue=""
          fieldLabel="Received"
          selectLabel=""
          selectValue={""}
          handleModelOpen={() => handleModelOpen("received")}
          list={currencyList.currency}
        />
        <div className="d-grid py-3">
          <button
            className="btn btn-lg btn-custom-primary"
            onClick={connectWallet}
            type="button"
          >
            Connect Wallet
          </button>
        </div>
        <div className="price_head">
          <div className="price_aa">
            <div className="price-list">
              Borrow APR <span className="price">-</span>
            </div>
            <div className="price-list">
              LTV <span className="price ltv">-</span>
            </div>
            <div className="price-list">
              LBV <span className="price lbv">-</span>
            </div>
            <div className="price-list">
              Liquidity Available <span className="price avail">-</span>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={handleModelOpen}
      >
        Launch demo modal
      </button> */}
      <CurrencySelectModel
        show={showModel}
        handleClose={handleModelClose}
        handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
        currFieldName={currFieldName}
      />
    </ContentCard>
  );
};

export default Swap;

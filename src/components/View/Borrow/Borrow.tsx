import React, { FC, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import switchIcon from "../../../assets/switch.svg";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { useStore } from "../../../store/store";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import web3 from "../../../ethereum/web3";
import { web3Service } from "../../../ethereum/web3Service";

interface Props {}

const Borrow: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const dispatch: any = useStore(true)[1];
  const [showModel, setShowModel] = useState(false);
  const setMessage = useState("")[1];
  const [currFieldName, setCurrFieldName] = useState("");
  const [collateralBal, setCollateralBal] = useState("ht");
  const [received, setReceived] = useState("eth");

  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");
    let accounts;
    accounts = await web3Service.getAccounts();
    dispatch("CONNECT_WALLET", { accounts });
    console.log(state.walletConnected);
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
  return (
    <>
      <ContentCard title="Borrow">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              console.log(e);
            }}
            handleModelOpen={() => handleModelOpen("borrowCollateral")}
            fieldLabel="Your Collateral"
            selectLabel="Balance"
            selectValue={collateralBal}
            list={state.currency}
          />
          <div className="pt-3"></div>
          <FieldCard
            onF1Change={(e: any) => {
              console.log(e);
            }}
            fieldLabel="Received"
            selectLabel=""
            selectValue={received}
            handleModelOpen={() => handleModelOpen("borrowReceived")}
            list={state.currency}
          />
          <div className="d-grid py-3">
            {state.accounts.length > 0 ? (
              <button
                className="btn btn-lg btn-custom-primary"
                onClick={connectWallet}
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
                Borrow APR <span className="price">0.05678 ETH</span>
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

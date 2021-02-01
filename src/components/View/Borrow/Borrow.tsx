import React, { FC, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import switchIcon from "../../../assets/switch.svg";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { useStore } from "../../../store/store";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";

interface Props {}

const Borrow: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const dispatch: any = useStore(true)[1];
  const [showModel, setShowModel] = useState(false);
  const setMessage = useState("")[1];
  const [currFieldName, setCurrFieldName] = useState("");
  const [collateralBal, setCollateralBal] = useState("eth");
  const [received, setReceived] = useState("eth");
  const connectWallet = async () => {
    dispatch("CONNECT_WALLET", {});
    setMessage("Waiting on transaction success...");
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
            handleModelOpen={() => handleModelOpen("borrowCollateral")}
            fieldLabel="Your Collateral"
            selectLabel="Balance: -"
            selectValue={collateralBal}
            list={state.currency}
          />
          <div className="pt-3"></div>
          <FieldCard
            fieldLabel="Received"
            selectLabel=""
            selectValue={received}
            handleModelOpen={() => handleModelOpen("borrowReceived")}
            list={state.currency}
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

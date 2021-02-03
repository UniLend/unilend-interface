import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "../../../store/store";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import eth from "../../../assets/eth.svg";
import uft from "../../../assets/uft.svg";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { web3Service } from "../../../ethereum/web3Service";
interface Props extends RouteComponentProps<any> {}

const Repay: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const dispatch: any = useStore(true)[1];
  const setMessage = useState("")[1];

  const [showModel, setShowModel] = useState(false);
  const [youRepay, setYouRepay] = useState("ht");
  const handleChange = () => {
    dispatch("LIST_CURRENCY", {});
    console.log(state);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleModelOpen = () => {
    setShowModel(true);
  };
  const handleCurrChange = (selectedField: any) => {
    setYouRepay(selectedField.name);
    setShowModel(false);
  };
  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");
    let accounts;
    accounts = await web3Service.getAccounts();
    dispatch("CONNECT_WALLET", { accounts });
    console.log(state.walletConnected);
    setMessage("You have been entered!");
  };
  return (
    <>
      <ContentCard title="Repay">
        <div className="mb-3">
          <div className="row mt-3">
            <div className="col-5">You Owe</div>
            <div className="col-3 " style={{ textAlign: "right" }}>
              <p className="collateralAmount">12000</p>
            </div>
            <div className="col-4" style={{ textAlign: "right" }}>
              <img className="ticker_img  mr-2" src={eth} alt="Eth" />
              <span className="ticker_name">ETH</span>
            </div>
          </div>
          <hr className="ticket_linebreak" />
          <div className="row mt-3">
            <div className="col-5">Your Collateral</div>
            <div className="col-3" style={{ textAlign: "right" }}>
              <p className="collateralAmount">12000</p>
            </div>
            <div className="col-4" style={{ textAlign: "right" }}>
              <img className="ticker_img  mr-2" src={uft} alt="UFT" />
              <span className="ticker_name">UFT</span>
            </div>
          </div>
        </div>
        <FieldCard
          onF1Change={(e: any) => {
            console.log(e);
          }}
          fieldLabel="You Repay"
          selectLabel=""
          selectValue={youRepay}
          handleModelOpen={handleModelOpen}
          list={state.currency}
        />
        <div className="d-grid pt-4">
          {state.accounts.length > 0 ? (
            <button
              className="btn btn-lg btn-custom-primary"
              onClick={connectWallet}
              type="button"
            >
              Repay
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
        <div className="price_head py-3">
          <div className="price_aa">
            <div className="price-list">
              Liquidity Available ( ETH )<span className="price">-</span>
            </div>
          </div>
        </div>
        <CurrencySelectModel
          currFieldName={""}
          handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
          show={showModel}
          handleClose={handleModelClose}
        />
      </ContentCard>
    </>
  );
};

export default Repay;

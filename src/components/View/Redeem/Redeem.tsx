import React, { FC, useEffect, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import eth from "../../../assets/eth.svg";
import "./Redeem.scss";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { currencyList } from "../../../ethereum/contracts";
interface Props {}

const Redeem: FC<Props> = (props) => {
  const [redeemAmount, setRedeemAmount] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [currFieldName, setCurrFieldName] = useState("");
  const [youRedeem, setYouRedeem] = useState("ht");
  const {
    getCollateralAmount,
    getCollateralAmountBase,
    handleRedeemAction,
    connectWalletAction,
  } = useActions();
  const { accounts, unilendLbRouter, assetPoolAddress } = useTypedSelector(
    (state) => state.configureWallet
  );
  const { collateralShare, collateralShareBase } = useTypedSelector(
    (state) => state.redeem
  );
  // const { youOwe } = useTypedSelector((state) => state.repay);

  useEffect(() => {
    if (assetPoolAddress) {
      getCollateralAmount(assetPoolAddress, accounts[0]);
      getCollateralAmountBase(assetPoolAddress, accounts[0]);
      // getTSupply(assetPoolAddress);
    }
  }, [assetPoolAddress]);

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleCurrChange = (selectedField: any) => {
    setYouRedeem(selectedField.name);
    setShowModel(false);
  };

  const connectWallet = () => {
    connectWalletAction();
  };

  const handleRedeem = async () => {
    handleRedeemAction(unilendLbRouter, redeemAmount, accounts);
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
          fieldType="number"
          fieldValue=""
          handleModelOpen={() => handleModelOpen("youRedeem")}
          fieldLabel="You Redeem"
          selectLabel=""
          selectValue={youRedeem}
          list={currencyList}
        />
        <div className="d-grid pt-4">
          {accounts.length > 0 ? (
            <button
              disabled={redeemAmount.length < 1}
              className="btn btn-lg btn-custom-primary"
              onClick={handleRedeem}
              type="button"
            >
              Redeem
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
          show={showModel}
          handleClose={handleModelClose}
          handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
          currFieldName={currFieldName}
        />
      </ContentCard>
    </>
  );
};

export default Redeem;

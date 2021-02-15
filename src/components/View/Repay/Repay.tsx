import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import eth from "assets/eth.svg";
import uft from "assets/uft.svg";
import { UnilendLBContract } from "ethereum/contracts/UnilendLB";
import { UnilendLBPool } from "ethereum/contracts/UnilendLB";
import web3 from "ethereum/web3";
import { collateralAddress } from "ethereum/contracts";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
interface Props extends RouteComponentProps<any> {}

const Repay: FC<Props> = (props) => {
  const [tAmount, setTAmount] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [youRepay, setYouRepay] = useState("ht");
  const [repayValue, setRepayValue] = useState("");
  const { getOweValue, connectWalletAction } = useActions();
  const { youOwe } = useTypedSelector((state) => state.repay);
  const {
    accounts,
    unilendLbRouter,
    assetPoolAddress,
    accountBalance,
  } = useTypedSelector((state) => state.configureWallet);
  useEffect(() => {
    if (assetPoolAddress) {
      let unilendLB = UnilendLBPool(assetPoolAddress);
      unilendLB.methods
        .borrowBalanceOf(accounts[0])
        .call((error: any, result: any) => {
          if (!error && result) {
            let tAmount = web3.utils.fromWei(result.toString(), "ether");
            setTAmount(tAmount);
          } else {
            console.log(error);
          }
        });
      getOweValue(unilendLbRouter, accounts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, assetPoolAddress]);

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

  const connectWallet = () => {
    connectWalletAction();
  };

  const handleRepay = async () => {
    const unilendLB = UnilendLBContract(unilendLbRouter);
    let fullAmount = web3.utils.toWei(repayValue, "ether");
    unilendLB.methods.repayETH(collateralAddress).send({
      from: accounts[0],
      value: fullAmount,
    });
    // .on("transactionHash", (result: any) => {
    //   console.log(result);
    // })
    // .on("error", function (error: Error) {
    //   console.log(error);
    // });
    setRepayValue("");
  };

  return (
    <>
      <ContentCard title="Repay">
        <div className="mb-3">
          <div className="row mt-3">
            <div className="col-5">You Owe</div>
            <div className="col-3 " style={{ textAlign: "right" }}>
              <p className="collateralAmount">{tAmount}</p>
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
              <p className="collateralAmount">{youOwe}</p>
            </div>
            <div className="col-4" style={{ textAlign: "right" }}>
              <img className="ticker_img  mr-2" src={uft} alt="UFT" />
              <span className="ticker_name">UFT</span>
            </div>
          </div>
        </div>
        <FieldCard
          onF1Change={(e: any) => {
            setRepayValue(e.target.value);
          }}
          fieldType="text"
          fieldValue=""
          fieldLabel="You Repay"
          selectLabel=""
          selectValue={youRepay}
          handleModelOpen={handleModelOpen}
        />
        <div className="d-grid pt-4">
          {accounts.length > 0 ? (
            <button
              disabled={repayValue.length < 1}
              className="btn btn-lg btn-custom-primary"
              onClick={handleRepay}
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
              Balance{" "}
              <span className="price">
                {accountBalance ? `${accountBalance}` : ""}
              </span>
            </div>
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

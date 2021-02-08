import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "../../../store/store";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import eth from "../../../assets/eth.svg";
import uft from "../../../assets/uft.svg";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { web3Service } from "../../../ethereum/web3Service";
import { UnilendLBContract } from "../../../ethereum/contracts/UnilendLBContract";
import { UnilendLBPool } from "../../../ethereum/contracts/UnilendLBPool";
import web3 from "../../../ethereum/web3";
import { collateralAddress } from "../../../ethereum/contracts";
import { getUniLendLbRouter } from "../../../services/contractService";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
interface Props extends RouteComponentProps<any> {}

const Repay: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const dispatch: any = useStore(true)[1];
  const setMessage = useState("")[1];
  const [tAmount, setTAmount] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [youRepay, setYouRepay] = useState("ht");
  const [repayValue, setRepayValue] = useState("");
  const { getOweValue } = useActions();
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

  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");
    let accounts;
    accounts = await web3Service.getAccounts();
    dispatch("CONNECT_WALLET", { accounts });
    await getUniLendLbRouter(dispatch);

    setMessage("You have been entered!");
  };

  const handleRepay = async () => {
    const unilendLB = UnilendLBContract(state.unilendLbRouter);
    let fullAmount = web3.utils.toWei(repayValue, "ether");
    unilendLB.methods.repayETH(collateralAddress).send({
      from: state.accounts[0],
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
          fieldLabel="You Repay"
          selectLabel={accountBalance ? `Balance:${accountBalance}` : ""}
          selectValue={youRepay}
          handleModelOpen={handleModelOpen}
          list={state.currency}
        />
        <div className="d-grid pt-4">
          {state.accounts.length > 0 ? (
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

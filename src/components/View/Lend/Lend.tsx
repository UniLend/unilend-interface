import React, { FC, useState } from "react";
import { UnilendLBContract } from "../../../ethereum/contracts/UnilendLBContract";
import { UnilendLBFactory } from "../../../ethereum/contracts/UnilendLBFactory";
import web3 from "../../../ethereum/web3";
import { web3Service } from "../../../ethereum/web3Service";
import { useStore } from "../../../store/store";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Lend: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const dispatch: any = useStore()[1];
  const setMessage = useState("")[1];
  const [showModel, setShowModel] = useState(false);
  const [lendAmount, setLendAmount] = useState();
  const [currFieldName, setCurrFieldName] = useState("");
  const [yourLend, setYourLend] = useState("ht");

  const handleModelClose = () => {
    setShowModel(false);
  };

  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");
    let accounts;
    accounts = await web3Service.getAccounts();
    dispatch("CONNECT_WALLET", { accounts });
    var unilendLBFactory = UnilendLBFactory();
    unilendLBFactory.methods.router().call((error: any, result: any) => {
      dispatch("LB_FACTORY", { unilendLbRouter: result });
    });
    console.log(state.walletConnected);
    setMessage("You have been entered!");
  };

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleCurrChange = (selectedField: any) => {
    console.log("selected", selectedField);
    setYourLend(selectedField.name);
    setShowModel(false);
  };

  const handleLend = async () => {
    console.log(state);
    debugger;
    const lend = UnilendLBContract(state.unilendLbRouter);
    lend.methods.lendETH().send({
      from: state.accounts[0],
      value: web3.utils.toWei(lendAmount, "ether"),
    });
    // .on("transactionHash", (result: any) => {
    //   console.log(result);
    // })
    // .on("error", function (error: Error) {
    //   console.log(error);
    // });
  };

  return (
    <>
      <ContentCard title="Lend">
        <FieldCard
          onF1Change={(e: any) => {
            setLendAmount(e.target.value);
          }}
          handleModelOpen={() => handleModelOpen("yourLend")}
          fieldLabel="You Lend"
          selectValue={yourLend}
          selectLabel=""
          list={state.currency}
        />
        <div className="price_head py-4">
          <div className="price_aa">
            <div className="price-list">
              Balance <span className="price">-</span>
            </div>
            <div className="price-list">
              Deposit APY <span className="price">-</span>
            </div>
          </div>
        </div>
        <div className="d-grid py-3">
          {state.walletConnected ? (
            <button
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

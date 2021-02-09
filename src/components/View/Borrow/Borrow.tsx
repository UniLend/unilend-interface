import React, { FC, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { useStore } from "../../../store/store";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import web3 from "../../../ethereum/web3";
import { UnilendLBContract } from "../../../ethereum/contracts/UnilendLB";
import { assetAddress, collateralAddress } from "../../../ethereum/contracts";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface Props {}

const Borrow: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const [yourCollateral, setYourCollateral] = useState("");
  const [borrowReceived, setBorrowReceived] = useState("");
  const [showModel, setShowModel] = useState(false);
  const setMessage = useState("")[1];
  const [currFieldName, setCurrFieldName] = useState("");
  const [collateralBal, setCollateralBal] = useState("ht");
  const [receivedType, setReceived] = useState("eth");
  const { connectWalletAction } = useActions();
  const { accounts, walletConnected } = useTypedSelector(
    (state) => state.configureWallet
  );
  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");
    connectWalletAction();
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

  const handleBorrow = async () => {
    const unilendLB = UnilendLBContract(state.unilendLbRouter);
    const amount1 = web3.utils.toWei(yourCollateral, "ether");
    const amount2 = web3.utils.toWei(borrowReceived, "ether");
    unilendLB.methods
      .borrow(collateralAddress, assetAddress, amount1, amount2)
      .send({
        from: state.accounts[0],
      })
      .on("transactionHash", (result: any) => {
        // console.log(result);
      })
      .on("error", function (error: any) {
        console.log(error);
      });
  };

  return (
    <>
      <ContentCard title="Borrow">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              setYourCollateral(e.target.value);
            }}
            handleModelOpen={() => handleModelOpen("borrowCollateral")}
            fieldLabel="Your Collateral"
            fieldType="text"
            selectLabel="Balance"
            selectValue={collateralBal}
            list={state.currency}
          />
          <div className="pt-3"></div>
          <FieldCard
            onF1Change={(e: any) => {
              setBorrowReceived(e.target.value);
            }}
            fieldLabel="Received"
            fieldType="text"
            selectLabel=""
            selectValue={receivedType}
            handleModelOpen={() => handleModelOpen("borrowReceived")}
            list={state.currency}
          />
          <div className="d-grid py-3">
            {(accounts && accounts.length) || walletConnected ? (
              <button
                className="btn btn-lg btn-custom-primary"
                onClick={handleBorrow}
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

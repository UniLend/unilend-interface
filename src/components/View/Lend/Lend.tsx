import React, { FC, useEffect, useState } from "react";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";
import useWalletConnect from "hooks/useWalletConnect";
import AlertToast from "../UI/AlertToast/AlertToast";


interface Props {}

interface AlertType {
  show: boolean;
}


const Lend: FC<Props> = (props) => {
  const [progressValue, setProgressValue] = useState<Number>(100);
  const [showModel, setShowModel] = useState(false);
  const [lendAmount, setLendAmount] = useState("");
  const [currFieldName, setCurrFieldName] = useState("");
  const [yourLend, setYourLend] = useState("ht");
  const { walletConnected, accounts, handleWalletConnect } = useWalletConnect();
  const { handleLendAction, getBorrowInterest } = useActions();
  const {
    unilendLbRouter,
    assetPoolAddress,
    accountBalance,
  } = useTypedSelector((state) => state.configureWallet);
  const [alertInfo, setAlertInfo] = useState<AlertType>({
    show: false,
  });
  

  const { lendInterest } = useTypedSelector((state) => state.borrow);

  useEffect(() => {
    if (assetPoolAddress) {
      getBorrowInterest(assetPoolAddress, accounts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetPoolAddress]);
  const handleModelClose = () => {
    setShowModel(false);
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

  const handleToast = (show: boolean) => {
    setAlertInfo({
      show,
    });
  };

  return (
    <>  
        {alertInfo.show &&
          <AlertToast
            handleClose={() => {
              handleToast(false);
            }}
            now={progressValue}
            status="failed"
            message={"Transaction Failed"}
            activeTab={"lend"}
          />
        }
        {alertInfo.show &&
          <AlertToast
            handleClose={() => {
              handleToast(false);
            }}
            now={progressValue}
            status="success"
            message={"Transaction success"}
            activeTab={"lend"}
          />
        }
      <ContentCard title="Lend">
        <FieldCard
          onF1Change={(e: any) => {
            setLendAmount(e.target.value);
          }}
          fieldType="text"
          fieldValue=""
          handleModelOpen={() => handleModelOpen("yourLend")}
          fieldLabel="You Lend"
          selectValue={yourLend}
          selectLabel=""
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
              onClick={handleWalletConnect}
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

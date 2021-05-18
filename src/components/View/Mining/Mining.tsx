import useWalletConnect from "hooks/useWalletConnect";
import React, { FC, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import ContentCard from "../UI/ContentCard/ContentCard";

interface Props {}

const Mining: FC<Props> = (props) => {
  const setMessage = useState("")[1];
  const { connectWalletAction } = useActions();
  const { accounts } = useTypedSelector((state) => state.configureWallet);
  const { handleWalletConnect } = useWalletConnect();
  const connectWallet = async () => {
    setMessage("Waiting on transaction success...");

    handleWalletConnect();
  };
  return (
    <>
      <ContentCard title="Mining">
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
        <p>{accounts[0]}</p>
      </ContentCard>
    </>
  );
};

export default Mining;

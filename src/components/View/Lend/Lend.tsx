import React, { FC, useState } from "react";
import { useStore } from "../../../store/store";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Lend: FC<Props> = (props) => {
  const state: any = useStore()[0];
  const [showModel, setShowModel] = useState(false);
  const [currFieldName, setCurrFieldName] = useState("");
  const [yourLend, setYourLend] = useState("ht");
  const handleModelClose = () => {
    setShowModel(false);
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
  return (
    <>
      <ContentCard title="Lend">
        <FieldCard
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
          <button className="btn btn-lg btn-custom-primary" type="button">
            Lend
          </button>
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

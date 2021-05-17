import React, { FC, useEffect, useRef } from "react";
import "./FieldCard.scss";
import icon from "../../../../assets/htLogo.svg";
import dropdown from "../../../../assets/dropdown.svg";

interface Props {
  fieldLabel: String;
  fieldValue: any;
  selectLabel: String;
  selectValue: String;
  fieldType: string;
  handleModelOpen: () => void;
  onF1Change: (e: any) => void;
}
const FieldCard: FC<Props> = (props) => {
  const field1: any = useRef(null);

  useEffect(() => {
    field1.current.value = props.fieldValue;
  }, [props.fieldValue]);
  return (
    <>
      <div className="card field-card">
        <div className="card-body py-2">
          <div className="row main__row">
            <div className=" col-6 col-sm-6">
              <label className="form-label">{props.fieldLabel}</label>
              <input
                type={props.fieldType}
                ref={field1}
                className="form-control field-input"
                placeholder="0.0"
                onChange={props.onF1Change}
              />
            </div>
            <div className=" col-6 col-sm-6">
              <div className="align-end">
                <label className="form-label">{props.selectLabel}</label>
              </div>
              <div className="align-end">
              {/* {activeCurrency.symbol !== "Select Token" &&
                  props.selectLabel !== "" && ( */}
                    <button
                      className="btn btn-max"
                      onClick={() => {
                        alert("max button clicked");
                      }}
                    >
                      <p className="max-text">MAX</p>
                    </button>
                  {/* )} */}
                <button
                  className="btn btn-curr"
                  onClick={props.handleModelOpen}
                >
                  <img className="curr-image" src={icon} alt="Curr" />
                  <p className="curr-text">{props.selectValue}</p>
                  <img
                    style={{ paddingLeft: "4px", width: "12px" }}
                    src={dropdown}
                    alt="Curr"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldCard;

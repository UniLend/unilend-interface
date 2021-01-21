import React, { FC } from 'react';
import './FieldCard.scss';
import icon from '../../../../assets/logo.svg'
interface Props {
    fieldLabel: String,
    selectLabel: String,
    list: []
}

const FieldCard: FC<Props> = (props) => {
    return (
        <>
            <div className="card field-card">
                <div className="card-body py-2">
                    <div className="row">
                        <div className="col-8">
                            <label className="form-label">{props.fieldLabel}</label>
                            <input type="email" className="form-control field-input" placeholder="0.0" />
                        </div>
                        <div className="col-4">
                            <div className="align-end">
                                <label className="form-label">{props.selectLabel}</label>

                            </div>
                            <select className="form-control field-select ">
                                {props.list.map((list: any) => <option data-content={icon} value="1">
                                    {list.name}
                                </option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FieldCard;
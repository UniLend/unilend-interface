import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useStore } from '../../../store/store';
import ContentCard from '../UI/ContentCard/ContentCard'
import FieldCard from '../UI/FieldsCard/FieldCard'
import eth from '../../../assets/eth.svg';
import uft from '../../../assets/uft.svg'
interface Props extends RouteComponentProps<any> {

}

const Repay: FC<Props> = (props) => {
    const state: any = useStore()[0];
    const dispatch: any = useStore(true)[1];
    const handleChange = () => {
        dispatch('LIST_CURRENCY', {});
        console.log(state)
    }
    return (
        <>
            <ContentCard title="Repay">
                <div className="mb-3">
                    <div className="row mt-3" >
                        <div className="col-5">You Owe</div>
                        <div className="col-3 " style={{ textAlign: 'right' }}>
                            <p className="collateralAmount">12000</p>
                        </div>
                        <div className="col-4" style={{ textAlign: 'right' }}>
                            <img className="ticker_img  mr-2" src={eth} alt="Eth" />
                            <strong className="ticker_name">ETH</strong>
                        </div>
                    </div>
                    <hr className="ticket_linebreak" />
                    <div className="row mt-3" >
                        <div className="col-5">Your Collateral</div>
                        <div className="col-3" style={{ textAlign: 'right' }}>
                            <p className="collateralAmount">12000</p>
                        </div>
                        <div className="col-4" style={{ textAlign: 'right' }}>
                            <img className="ticker_img  mr-2" src={uft} alt="UFT" />
                            <strong className="ticker_name">UFT</strong>
                        </div>
                    </div>
                </div>
                <FieldCard fieldLabel="You Repay" selectLabel="Balance: -" list={state.currency} />
                <div className="d-grid pt-4">
                    <button onClick={handleChange} className="btn btn-lg btn-custom-primary" type="button">Connect Wallet</button>
                </div>
            </ContentCard>
        </>
    )
}

export default Repay;
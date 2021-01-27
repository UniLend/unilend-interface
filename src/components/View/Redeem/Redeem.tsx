import React, { FC } from 'react'
import { useStore } from '../../../store/store';
import ContentCard from '../UI/ContentCard/ContentCard';
import FieldCard from '../UI/FieldsCard/FieldCard';
import eth from '../../../assets/eth.svg';
import './Redeem.scss'
interface Props {

}

const Redeem: FC<Props> = (props) => {
    const state: any = useStore()[0];

    return (
        <>
            <ContentCard>
                <div className="mb-3">
                    <div className="row mt-3" >
                        <div className="col-6">
                            <img className="ticker_img  mr-2" src={eth} alt="Eth" />
                            <strong className="ticker_name">uWETH</strong>
                        </div>
                        <div className="col-6" style={{ textAlign: 'right' }}>
                            <p className="collateralAmount">0</p>
                        </div>
                    </div>
                    <hr className="ticket_linebreak" />
                    <div className="row mt-3" >
                        <div className="col-6">
                            <img className="ticker_img  mr-2" src={eth} alt="Eth" />
                            <strong className="ticker_name">ETH</strong>
                        </div>
                        <div className="col-6" style={{ textAlign: 'right' }}>
                            <p className="collateralAmount">0</p>
                        </div>
                        <hr className="ticket_linebreak" />
                    </div>
                </div>
                <FieldCard fieldLabel="You Redeem" selectLabel="" list={state.currency} />
                <div className="d-grid pt-4">
                    <button className="btn btn-lg btn-custom-primary" type="button">Connect Wallet</button>
                </div>
                <div className="price_head py-3">
                    <div className="price_aa">
                        <div className="price-list">Liquidity Available<span className="price">-</span></div>
                    </div>
                </div>
            </ContentCard>
        </>
    )
}

export default Redeem;
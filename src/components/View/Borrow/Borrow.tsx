import React, { FC, useState } from 'react'
import ContentCard from '../UI/ContentCard/ContentCard';
import switchIcon from '../../../assets/switch.svg';
import FieldCard from '../UI/FieldsCard/FieldCard';
import { useStore } from '../../../store/store';

interface Props {

}

const Borrow: FC<Props> = (props) => {
    const state: any = useStore()[0];
    const dispatch: any = useStore(true)[1];
    const setMessage = useState('')[1]

    const connectWallet = async () => {
        dispatch('CONNECT_WALLET', {});
        setMessage('Waiting on transaction success...');
        console.log(state.walletConnected)
        setMessage('You have been entered!');
    }

    return (
        <>
            <ContentCard>
            <div className="swap-root">
                <FieldCard fieldLabel="Your Collateral" selectLabel="Balance: -" list={state.currency} />
                <div className="pt-3"></div>
                <FieldCard fieldLabel="Received" selectLabel="" list={state.currency} />
                <div className="d-grid py-3">
                    <button className="btn btn-lg btn-custom-primary" onClick={connectWallet} type="button">Connect Wallet</button>
                </div>
                <div className="price_head">
                    <div className="price_aa">
                        <div className="price-list">Borrow APR <span className="price">0.05678 ETH</span></div>
                        <div className="price-list">LTV <span className="price ltv">-</span></div>
                        <div className="price-list">LBV <span className="price lbv">-</span></div>
                        <div className="price-list">Liquidity Available <span className="price avail">-</span></div>
                    </div>
                </div>
            </div>
            </ContentCard>
        </>
    )
}

export default Borrow;
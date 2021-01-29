import React, { FC } from 'react'
import { useStore } from '../../../store/store';
import ContentCard from '../UI/ContentCard/ContentCard';
import FieldCard from '../UI/FieldsCard/FieldCard';

interface Props {

}

const Lend: FC<Props> = (props) => {
    const state: any = useStore()[0];

    return (
        <>
            <ContentCard title="Lend">
                <FieldCard fieldLabel="You Lend" selectLabel="Balance: -" list={state.currency} />
                <div className="price_head py-4">
                    <div className="price_aa">
                        <div className="price-list">Balance <span className="price">-</span></div>
                        <div className="price-list">Deposit APY <span className="price">-</span></div>
                    </div>
                </div>
                <div className="d-grid py-3">
                    <button className="btn btn-lg btn-custom-primary" type="button">Connect Wallet</button>
                </div>
            </ContentCard>
        </>
    )
}

export default Lend;
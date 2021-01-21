import React, { FC } from 'react'
import ContentCard from '../UI/ContentCard/ContentCard';
import FieldCard from '../UI/FieldsCard/FieldCard';

interface Props {

}

const Redeem: FC<Props> = (props) => {
    return (
        <>
            <ContentCard>
                <FieldCard fieldLabel="You Redeem" selectLabel="" />
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
import React, { FC } from 'react'
import { useStore } from '../../../store/store';
import ContentCard from '../UI/ContentCard/ContentCard'
import FieldCard from '../UI/FieldsCard/FieldCard'

interface Props {

}

const Repay: FC<Props> = (props) => {
    const state: any = useStore()[0];
    return (
        <>
            <ContentCard>
                <FieldCard fieldLabel="You Repay" selectLabel="Balance: -" list={state.currency} />
                <div className="d-grid pt-4">
                    <button className="btn btn-lg btn-custom-primary" type="button">Connect Wallet</button>
                </div>
            </ContentCard>
        </>
    )
}

export default Repay;
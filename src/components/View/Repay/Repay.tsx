import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useStore } from '../../../store/store';
import ContentCard from '../UI/ContentCard/ContentCard'
import FieldCard from '../UI/FieldsCard/FieldCard'

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
            <ContentCard>
                <FieldCard fieldLabel="You Repay" selectLabel="Balance: -" list={state.currency} />
                <div className="d-grid pt-4">
                    <button onClick={handleChange} className="btn btn-lg btn-custom-primary" type="button">Connect Wallet</button>
                </div>
            </ContentCard>
        </>
    )
}

export default Repay;
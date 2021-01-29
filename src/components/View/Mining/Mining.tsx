import React, { FC } from 'react'
import ContentCard from '../UI/ContentCard/ContentCard';

interface Props {

}

const Mining: FC<Props> = (props) => {
    return (
        <>
            <ContentCard title="Mining">
                <h1>Hello Mining</h1>
            </ContentCard>
        </>
    )
}

export default Mining;
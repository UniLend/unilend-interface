import React, { FC } from 'react'
import ContentCard from '../UI/ContentCard/ContentCard';

interface Props {

}

const Migrate: FC<Props> = (props) => {
    return (
        <>
            <ContentCard title="Migrate">
                <h1>Hello Migrate</h1>
            </ContentCard>
        </>
    )
}

export default Migrate;
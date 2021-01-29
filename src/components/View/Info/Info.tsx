import React, { FC } from 'react'
import ContentCard from '../UI/ContentCard/ContentCard';

interface Props {

}

const Info: FC<Props> = (props) => {
    return (
        <>
            <ContentCard title="Info">
                <h1>Hello Info</h1>
            </ContentCard>
        </>
    )
}

export default Info;
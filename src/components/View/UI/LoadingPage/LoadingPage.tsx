import React, { FC } from 'react'
import './loadingPage.scss'
import logo from '../../../../assets/originalLogo.svg';
interface Props {

}

const LoadingPage: FC<Props> = (props) => {
    return (
        <div className="app-bg-light full-height">
            <div className="bg-vector">
                <div className="loading-app">
                    <img src={logo} alt="Logo" />
                    <h1 className="pl-4 fw-bold">UniLend</h1>
                </div>
            </div>
        </div>

    )
}

export default LoadingPage
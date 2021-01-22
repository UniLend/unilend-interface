import React, { FC } from 'react'
import './loadingPage.scss'
import logo from '../../../../assets/originalLogo.svg';
import { useStore } from '../../../../store/store';
interface Props {

}

const LoadingPage: FC<Props> = (props) => {
    const state: any = useStore()[0];
    return (
        <div className={`app-bg full-height`}>
            <div className={`bg-vector ${state.theme}`}>
                <div className="loading-app">
                    <img src={logo} alt="Logo" />
                    <h1 className="pl-4 fw-bold">UniLend</h1>
                </div>
            </div>
        </div>

    )
}

export default LoadingPage
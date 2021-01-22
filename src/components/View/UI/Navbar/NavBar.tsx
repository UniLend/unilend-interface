import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';


import logo from '../../../../assets/logo.svg'
import wallet from '../../../../assets/wallet.svg'
interface Props extends RouteComponentProps<any> {
}

const NavBar: React.FC<Props> = (props) => {
    const [currentPage, setCurrentPage] = useState('');
    useEffect(() => {
        setCurrentPage(props.location.pathname)
    }, [props.location.pathname])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-top" />
                    </Link>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={currentPage === '/swap' ? "nav-link active" : "nav-link"} aria-current="page" to="/swap">
                                    Swap</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={currentPage === '/lend' ? "nav-link active" : "nav-link"} aria-current="page" to="/lend">Lend</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={currentPage === '/borrow' ? "nav-link active" : "nav-link"} aria-current="page" to="/borrow">Borrow</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={currentPage === '/migrate' ? "nav-link active" : "nav-link"} aria-current="page" to="/migrate">Migrate</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={currentPage === '/mining' ? "nav-link active" : "nav-link"} aria-current="page" to="/mining">Mining</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={currentPage === '/info' ? "nav-link active" : "nav-link"} aria-current="page" to="/info">Info</Link>
                            </li>
                        </ul>

                    </div>
                    <button className="d-flex btn btn-custom-secondary">
                        <img src={wallet} width="26" alt="Wallet" className="d-inline-block px-1" />
                            Connect wallet
                        </button>
                </div>
            </nav>

        </>
    )
}
export default withRouter(NavBar);
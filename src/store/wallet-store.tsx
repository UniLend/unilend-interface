
// import web3 from '../ethereum/web3';
import { initStore } from './store';

const configureWalletStore = () => {
    const actions = {
        CONNECT_WALLET: (curState: any, payload: any) => {
            let accounts;
            // web3.eth.getAccounts().then(console.log);
            if (typeof (window as any).ethereum !== 'undefined') {
                accounts = (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                console.log('MetaMask is installed!');
            }
            return { walletConnected: true, accounts }
        }
    }
    initStore(
        actions,
        {
            walletConnected: false,
            accounts: []
        }
    );
}

export default configureWalletStore;
import { httpClient } from '../services/htttpClient';
import { initStore } from './store';

const configureCrrStore = () => {
    const actions = {
        TOGGLE: (curState: any, payload: any) => {
            const updatedCurr: any = [];
            httpClient.get('/users').then((res: any) => {
                console.log(curState)
                updatedCurr.push(res);
                return { currency: updatedCurr };
            }).catch(err => {
                console.log(err);
            })

        }
    }
    initStore(
        actions,
        {
            currency: [
                { name: "INR" },
                { name: "USD" }
            ]
        }
    );
}

export default configureCrrStore;
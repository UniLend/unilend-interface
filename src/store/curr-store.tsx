import { httpClient } from '../services/httpClient';
import { initStore } from './store';

const configureCrrStore = () => {
    const actions = {
        LIST_CURRENCY: async (curState: any, payload: any) => {
            if (curState.currency) {
            }
            const response = await httpClient.get('/users');
            console.log('response', response)
            return { currency: [...response] }
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
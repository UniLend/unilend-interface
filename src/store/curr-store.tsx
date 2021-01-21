import { initStore } from './store';

export const configureCrrStore = () => {
    const actions = {
        TOGGLE: (curState: any, payload: any) => {
            //action
            return { currency: curState.currency };
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
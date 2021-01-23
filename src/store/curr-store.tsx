
import { initStore } from './store';

const configureCrrStore = () => {
    const actions = {
        LIST_CURRENCY: (curState: any, payload: any) => {
            return { currency: payload.updatedState }
        }
    }
    initStore(
        actions,
        {
            currency: []
        }
    );
}

export default configureCrrStore;
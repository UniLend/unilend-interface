import { initStore } from "./store";

const configureCrrStore = () => {
  const actions = {
    LIST_CURRENCY: (curState: any, payload: any) => {
      return { currency: payload.updatedState };
    },
  };
  initStore(actions, {
    currency: [
      {
        id: 1,
        name: "ht",
        desc: "ht",
      },
      {
        id: 2,
        name: "eth",
        desc: "Ether",
      },
      {
        id: 3,
        name: "aave",
        desc: "aave",
      },
    ],
  });
};

export default configureCrrStore;

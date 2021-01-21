import { useEffect, useState } from "react";

let globalState = {};
let listeners: any[] = [];
let actions: any = {};

export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1];


    const dispatch = (actionIdentifier: any, payload: any) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {
            listener(globalState);
        }
    };

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState);
        }

        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState);
            }
        };
    }, [setState, shouldListen]);

    return [globalState, dispatch];
};

export const initStore = (userActions: any, initialState: any) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions };
};
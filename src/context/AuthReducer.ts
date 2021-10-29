import { StorageKey } from "../consts";

export const AuthActionTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    GET_SIGNED: 'GET_SIGNED',
}

interface Action {
    type: string;
    payload?: any;
}

interface InitialStateProps {
    isLoggedIn: boolean;
};

export const AuthReducerInitialState = {
    isLoggedIn: false
};

export function AuthReducer(state: InitialStateProps, action: Action) {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            localStorage.setItem(StorageKey.Token, action.payload);
            
            return {
                isLoggedIn: true
            };
        case AuthActionTypes.LOGOUT:
            localStorage.removeItem(StorageKey.Token);
    
            return {
                isLoggedIn: false
            };
        case AuthActionTypes.GET_SIGNED:
            return {
                isLoggedIn: action.payload
            };
        default:
            throw new Error();
    }
}
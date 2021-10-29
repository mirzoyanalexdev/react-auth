import { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router";

import { Routes, StorageKey } from "../consts";
import { AuthReducer, AuthReducerInitialState, AuthActionTypes } from "./AuthReducer";

interface IAuthContext {
    isLoggedIn: boolean;
    logIn: (token: string) => void;
    logOut: () => void;
};

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    logIn: () => undefined,
    logOut: () => undefined
});

interface AuthProviderProps {
    children: React.ReactNode;
};

export const AuthProvider = ({children}: AuthProviderProps) => {
    const history = useHistory();
    const [authState, authDispatch] = useReducer(AuthReducer, AuthReducerInitialState);

    const logIn = (token: string) => {
        authDispatch({
           type: AuthActionTypes.LOGIN,
           payload: token
        })
        history.push(Routes.Profile);
    };

    const logOut = () => {
        authDispatch({
           type: AuthActionTypes.LOGOUT,
        });
        history.push(Routes.Login);
    };

    const getSigned = () => {
        authDispatch({
            type: AuthActionTypes.GET_SIGNED,
            payload: true
         })
    };

    // Get Logged in user data
    useEffect(() => {
        const token = localStorage.getItem(StorageKey.Token);
        if(token) {
            getSigned();
        } else {
            logOut();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: authState.isLoggedIn,
            logIn: logIn,
            logOut: logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
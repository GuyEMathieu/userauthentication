import React, {createContext, useReducer} from 'react'
import authReducer from './authReducer'
import axios from 'axios'

import {
    AUTH_ERROR,
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT,
    REMOVE_ALERT
} from '../ContextTypes'

export const AuthContext = createContext()


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        alerts: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {

    }


    // Login User
    const loginUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try{
            const res = await axios.post('/api/auth', user, config)

            console.info(res)
        }catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.alerts
            })

        }

    }
    // Logout
    const logoutUser = async () => {

    }

    // Remove Alerts
    const removeAlert = async id => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                alerts: state.alerts,

                loadUser,
                loginUser,
                logoutUser,
                removeAlert
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthState;




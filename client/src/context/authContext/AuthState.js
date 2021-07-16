import React, {createContext, useReducer} from 'react'
import authReducer from './authReducer'
import axios from 'axios'
import { v4 as uid } from 'uuid';

import {
    AUTH_ERROR,
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    REGISTER_FAIL, 
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGOUT,
    REMOVE_ALERT,
    SET_ALERT
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

    const registerUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await axios.post('/api/users', user, config)
            console.info('Data', res.data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.alerts
            })
        }
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

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
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

    const addUIAlert = async uiAlerts => {
        console.info('Hey')
        console.info(uiAlerts)

        let alerts = []

        for(let i = 0; i < uiAlerts.length; i++){
            alerts.push({severity: uiAlerts[i].severity, msg: uiAlerts[i].msg, _id: uid()})
        }

        dispatch({
            type: SET_ALERT,
            payload: alerts
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
                registerUser,
                logoutUser,
                addUIAlert,
                removeAlert
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthState;




import React, {createContext, useReducer} from 'react'
import employeeReducer from './employeeReducer'
import axios from 'axios'

import {
    ADD_EMPLOYEE,
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT,
    REMOVE_ALERT
} from '../ContextTypes'

export const EmployeeContext = createContext()


const EmployeeState = props => {
    const initialState = {
        currentEmployee: null,
        alerts: null
    };

    const [state, dispatch] = useReducer(employeeReducer, initialState);

    // Load User
    const loadUser = async () => {

    }

    // Login User
    const addEmployee = async employee => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try{
            const res = await axios.post('/api/auth', employee, config)

            dispatch({
                type: ADD_EMPLOYEE,
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


    return (
        <EmployeeContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                alerts: state.alerts,

                loadUser,
                addEmployee,
                logoutUser,
                removeAlert
            }}
        >
            {props.children}
        </EmployeeContext.Provider>
    )
}



export default EmployeeState;




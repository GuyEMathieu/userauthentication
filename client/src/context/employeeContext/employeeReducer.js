
import {
    AUTH_ERROR,
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT,
    REMOVE_ALERT
} from '../ContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                alerts: action.payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(a => a._id !== action.payload)
            }
        default:
            return state;
    }
}
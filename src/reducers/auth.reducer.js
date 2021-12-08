import { authConstants } from '../actions/constants'

const initState = {
    token: null,
    user: {
        firstname: '',
        lastname: '',
        email: '',
        picture: '',
        role: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: ''
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
        case authConstants.LOGIN_FAILURE:{
            return{
                ...state,
                error:action.payload.error,
                authenticating:false
            }
        }
        case authConstants.LOGOUT_REQUEST:
            return {
                ...state,
                loading:true
            }
        case authConstants.LOGOUT_SUCCESS:
            return {
                ...initState
            }
        case authConstants.LOGOUT_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default: return state
    }
}


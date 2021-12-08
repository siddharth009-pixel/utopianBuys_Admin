import { userConstants } from "../actions/constants"


const initState={
    error:null,
    message:'',
    loading:false
}

export const userReducer=(state=initState,action)=>{
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:{
            return{
                ...state,
                loading:true
            }
        }
        case userConstants.USER_REGISTER_SUCCESS:{
            return{
                ...state,
                loading:false,
                message:action.payload
            }
        }
        case userConstants.USER_REGISTER_FAILURE:{
            return{
                ...state,
                loading:false,
                message:action.payload
            }
        }
        default: return state
    }
}
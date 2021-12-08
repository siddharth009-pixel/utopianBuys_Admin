import axios from '../helpers/axios'
import {userConstants} from './constants'


export const signup=(user)=>{
    return async(dispatch)=>{
        dispatch({type:userConstants.USER_REGISTER_REQUEST})
        const res=await axios.post('/admin/signup',{
            ...user
        })
        if(res.status===200){
            dispatch({type:userConstants.USER_REGISTER_SUCCESS,
            payload:{
                ...res.data
            }
           })
        }
        if(res.status===400){
            dispatch({type:userConstants.USER_REGISTER_FAILURE,
            payload:{
                ...res.data
            }
           })
        }
    }
}

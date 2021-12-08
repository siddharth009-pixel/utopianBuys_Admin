import axios from 'axios'
import { authConstants } from '../actions/constants'
import { api } from '../urlConfig'
import store from '../store'

const Token=window.localStorage.getItem('token')

const axiosIntance=axios.create({
    baseURL:api,
    headers:{
        'token':Token?Token:''}
})

axiosIntance.interceptors.request.use((req)=>{
    const {auth}=store.getState();
    if(auth.token){
    req.headers.token=auth.token
    }
    return req;
})

axiosIntance.interceptors.response.use((res)=>{
    return res;
},(error)=>{
    console.log(error.response);
    const {status} =error.response?error.response:500;
    if(status===500){
        localStorage.clear();
        store.dispatch({type:authConstants.LOGIN_SUCCESS})
    }
    return Promise.reject(error)
})

export default axiosIntance
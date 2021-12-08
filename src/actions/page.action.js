import axios from "../helpers/axios"
import { pageConstants } from "./constants"


export const createPageAction=(form)=>{
    return async(dispatch)=>{
        dispatch({type:pageConstants.CREATE_PAGE_REQUEST})
        const res=await axios.post('/page/create',form)
        if(res.status==201){
            dispatch({
                type:pageConstants.CREATE_PAGE_SUCCESS,
                payload:{page:res.data.page}
            })
            console.log(res.data);
        }else{
            dispatch({
                type:pageConstants.CREATE_PAGE_FAILED,
                payload:{error:res.data.error}
            })
        }
    }
}
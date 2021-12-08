import { pageConstants } from "../actions/constants"

const initState={
    page:{},
    loading:false,
    error:{}
}


export const pageReducer=(state=initState,action)=>{
    switch(action.type){
        case pageConstants.CREATE_PAGE_REQUEST:{
            return {
                ...state,
                loading:true,
            }
        }
        case pageConstants.CREATE_PAGE_SUCCESS:{
            return {
                ...state,
                loading:false,
                page:action.payload.page
            }
        }
        case pageConstants.CREATE_PAGE_FAILED:{
            return {
                ...state,
                loaading:false,
                error:action.payload.error
            }
        }
        default:
            return {
                ...state
            }
    }
}
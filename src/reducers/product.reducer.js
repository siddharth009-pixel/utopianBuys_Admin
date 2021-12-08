import { productConstants } from "../actions/constants"
import store from "../store";

const initState={
    products:[],
    loading:false,
    error:{}
}

const createNewProductList=(products,product)=>{
    let newProducts=[]
    newProducts=[...products]
    newProducts.push(product)
    return newProducts;
}

export const productReducer=(state=initState,action)=>{
    switch(action.type){
        case productConstants.GET_ALL_PRODUCT_REQUEST:{
            return{
                ...state,
                loading:true
            }
        }
        case productConstants.GET_ALL_PRODUCT_SUCCESS:{
            return {
                ...state,
                loading:false,
                products:action.payload.products
            }
        }
        case productConstants.GET_ALL_PRODUCT_FAILED:{
            return {
                ...state,
                loading:false,
                error:action.payload.error
            }
        }
        case productConstants.ADD_NEW_PRODUCT_REQUEST:{
            return {
                ...state,
                loading:true
            }
        }
        case productConstants.ADD_NEW_PRODUCT_SUCCESS:{
            const {product}=action.payload
            return {
                ...state,
                loading:false,
                products:createNewProductList(state.products,product)
            }
        }
        case productConstants.ADD_NEW_PRODUCT_FAILED:{
            return {
                ...state,
                loading:false,
                error:action.payload.error
            }
        }
        default:return state
    }
}
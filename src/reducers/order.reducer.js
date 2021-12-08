import { orderConstants } from "../actions/constants"

const initialState = {
    orders: [],
    loading: false,
    error: {}
}

const addUpdatedOrder=(oldOrders,updatedOrder)=>{
    let newOrders=oldOrders.map((order)=>{
        if(order._id==updatedOrder._id){
            return updatedOrder;
        }else{
            return order;
        }
    })

    return newOrders;
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS: {
            return{
                ...state,
                loading:false,
                orders:action.payload.orders
            }
        }
        case orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST:{
            return{
                ...state,
                loading:true
            }
        }
        case orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS:{
            const {order}=action.payload
            return {
                ...state,
                loading:false,
                orders:addUpdatedOrder(state.orders,order)
            }
        }
        case orderConstants.UPDATE_CUSTOMER_ORDER_FAILED:{
            return{
                ...state,
                loading:false,
                error:action.payload.error
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}


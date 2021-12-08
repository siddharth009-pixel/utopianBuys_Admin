import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const updateOrder = (payload) => {
    return async (dispatch) => {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST })
        const res = await axios.post('/order/update', payload)
        if (res.status === 201) {
            dispatch({ 
                type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS,
                payload:{order:res.data.order}
            })
        }else{
            dispatch({ 
                type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILED,
                payload:{error:res.data.error}
            })
        }
    }
}
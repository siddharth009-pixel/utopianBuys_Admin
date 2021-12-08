import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from '../../../actions/order.action'


export default function OrderItem({ orderItem }) {

    const order = useSelector(state => state.order)
    const [orderStatusType, setOrderStatusType] = useState('')
    const dispatch = useDispatch()

    const onOrderUpdate = (_id) => {
        const payload = {
            orderId: _id,
            type: orderStatusType
        }
        if (orderStatusType == "") {
            alert("Please select status first !!");
        } else {
            dispatch(updateOrder(payload))
        }
    }

    const orderCompleted = () => {
        return (
            <>
                <div>
                    <h2>order delivered successfully </h2>
                </div>
            </>
        )
    }

    const updateOrderFunction = (orderItem) => {
        return (
            <>
                {
                    orderItem.orderStatus.map((status) => {
                        return (
                            status.isCompleted &&
                            <div style={{ marginTop: '5px', textAlign: 'center' }}>
                                {status.type}
                            </div>
                        )
                    })
                }
                <div style={{ marginTop: '30px' }}>
                    <select onChange={(e) => { setOrderStatusType(e.target.value) }}>
                        <option>update order status</option>
                        {
                            orderItem.orderStatus.map((status) => {
                                return (
                                    !status.isCompleted &&
                                    <option value={status.type}>{status.type}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={() => { onOrderUpdate(orderItem._id) }}>Confirm</button>
                </div>

            </>
        )
    }

   let decider=orderItem.orderStatus[3]

    return (
        <div style={{ height: '200px', boxShadow: '2px 2px 10px 2px grey', margin: '10px 10px' }}>
            <div style={{ height: '20px', marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                {orderItem._id}
            </div>



            {
                decider && decider.isCompleted ? <h1>completed</h1>: updateOrderFunction(orderItem) 
            }


        </div>
    )

}

import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from '../../actions/order.action'
import Layout from '../../components/Layout'
import OrderItem from './OrderItem'


export default function Orders() {

    const order = useSelector(state => state.order)
    const [allOrders, setAllOrders] = useState([])
    
    useEffect(() => {
        setAllOrders(order.orders)
    },[order.orders])

    return (
        <>
            <Layout sidebar>
                <Container>
                    <div>
                        <div>
                            {
                                allOrders && allOrders.map((orderItem) => {
                                    return (<OrderItem orderItem={orderItem} />)
                                }
                                )
                            }
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

import React, { Children } from 'react'
import Header from '../Header'
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import {NavLink} from 'react-router-dom'
import './style.css'

export default function Layout(props) {
    return (
        <>
            <Header/>
            {props.sidebar?        
                <Container fluid>
                <Row>
                    <Col className="Sidebar" md={2} >
                        <ul>
                            <li><NavLink exact className="navLinkClass" to={`/`}>Home</NavLink></li>
                            <li><NavLink className="navLinkClass" to={`/page`}>page</NavLink></li>
                            <li><NavLink className="navLinkClass" to={`/category`}>category</NavLink></li>
                            <li><NavLink className="navLinkClass" to={`/products`}>products</NavLink></li>
                            <li><NavLink className="navLinkClass" to={`/orders`}>orders</NavLink></li>
                        </ul>
                    </Col>
                    <Col className="sidebarChildren" md={10} style={{marginLeft:'auto',zIndex:0}}>
                        {props.children}
                    </Col>
                </Row>
                </Container>
                :
                props.children
            }
        </>
    )
}
// style={{height:'100vh',position:'fixed',top:0,zIndex:1,paddingTop:'100px'}}
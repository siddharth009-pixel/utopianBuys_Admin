import React from 'react'
import { Modal,Button } from "react-bootstrap"

function NewModal(props){
return(
    <Modal show={props.show} onHide={props.handleClose} size={props.size?props.size:"sm"}>
        <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
            {
                props.buttons ? props.buttons.map((btn,index)=>{
                    return(
                        <Button key={index} varient={btn.color} onClick={btn.onClick}>{btn.label}</Button>
                    )
                }):
                <Button variant="primary" onClick={props.onSubmit}>
                    Save Changes
                </Button>
            }
        </Modal.Footer>
    </Modal>
)}

export default NewModal
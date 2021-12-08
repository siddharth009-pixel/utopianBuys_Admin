import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Input } from '../../../UI/Input';
import Modal from '../../../UI/Modal';

export const DeleteCategoryModal=(props)=>{
    const {
        show,
        handleClose,
        onSubmit,
        checkedArray,
        expandedArray,
        deleteCategories
    }=props

    return(
        <Modal
        show={show}
        onSubmit={onSubmit}
        handleClose={handleClose}
        title={"confirm"}
        buttons={[
            {
                label:"No",
                color:"primary",
                onClick:()=>{
                    alert('no')
                }
            },
            {
                label:"Yes",
                color:"danger",
                onClick:deleteCategories
            }

        ]}
    >
    
    <h5>checked Categories</h5>
        {
            checkedArray.map((cat,index)=>{
            return(
                <h6 key={index}>{cat.name}</h6>
            )                    
        })
        }
    </Modal>

    )
}
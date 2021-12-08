import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Input } from '../../../UI/Input';
import Modal from '../../../UI/Modal';


export const EditCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        onSubmit,
        checkedArray,
        expandedArray,
        handleCategoryInput,
        categoryList
    }=props;

    return (
        <Modal show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            title="Edit Categories"
            size="lg">
            <Row>
                <Col>
                    <h5>checked categories</h5>
                </Col>
            </Row>
            {checkedArray.length > 0 &&
                checkedArray.map((cat, index) => {
                    return (
                        <Row style={{ justifyContent: 'center' }}>
                            <Col>
                                <Input type="text"
                                    placeholder={'category Name'}
                                    value={cat.name}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}>
                                </Input>
                            </Col>
                            <Col style={{ justifyContent: 'center' }}>
                                <select
                                    className="form-control"
                                    value={cat.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option value="">Select Parent Category</option>
                                    {
                                        categoryList.map(category =>
                                            <option key={category.value} value={category.value}>{category.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col style={{ justifyContent: 'center' }}>
                                <select className="form-control"
                                    value={cat.type}
                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                    >
                                    <option value="">Select Type</option>
                                    <option value={"store"}>Store</option>
                                    <option value={"product"}>Product</option>
                                    <option value={"page"}>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                })
            }

            <Row>
                <Col>
                    <h5>Expanded categories</h5>
                </Col>
            </Row>
            {expandedArray.length > 0 &&
                expandedArray.map((cat, index) => {
                    return (
                        <Row style={{ justifyContent: 'center' }}>
                            <Col>
                                <Input type="text"
                                    placeholder={'category Name'}
                                    value={cat.name}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}>
                                </Input>
                            </Col>
                            <Col style={{ justifyContent: 'center' }}>
                                <select
                                    className="form-control"
                                    value={cat.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>Select Parent Category</option>
                                    {
                                        categoryList.map(category =>
                                            <option key={category.value} value={category.value}>{category.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col style={{ justifyContent: 'center' }}>
                                <select className="form-control"
                                    value={cat.type}
                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                >
                                    <option>Select Type</option>
                                    <option value={"store"}>Store</option>
                                    <option value={"product"}>Product</option>
                                    <option value={"page"}>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                })
            }

        </Modal>
    )
}

import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../../actions/product.action'
import Layout from '../../components/Layout'
import { Input } from '../../UI/Input'
import Modal from '../../UI/Modal'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'


export default function Products() {

    const [show, setShow] = useState(false);
    const [productDetailsModal, setProductDetailsModal] = useState(false)
    const [productDetails, setProductDetails] = useState({})
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [productPictures, setProductPictures] = useState([])
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)

    const handleClose = () => {

        const form = new FormData();

        form.append('name', name)
        form.append('price', price)
        form.append('quantity', quantity)
        form.append('description', description)
        form.append('category', categoryId)

        for (let pic of productPictures) {
            form.append('productPictures', pic)
        }
        dispatch(addProduct(form))
        setShow(false)
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }


    const renderAddProductModal = () => {
        return (<Modal
            show={show}
            handleClose={()=>setShow(false)}
            onSubmit={handleClose}
            Title="Add New Category">

            <Input type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}>
            </Input>
            <Input type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}>
            </Input>
            <Input type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}>
            </Input>
            <Input type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
            </Input>
            <select
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)
                }>
                <option>Select Category</option>
                {
                    createCategoryList(category.categories).map(category =>
                        <option key={category.value} value={category.value}>{category.name}</option>
                    )
                }
            </select>
            {
                productPictures.length > 0 ?
                    productPictures.map((pic, index) => <div key={index}>{pic.name}</div>)
                    : ''
            }
            <input type="file"
                name="productPicture"
                onChange={handleProductPictures}>
            </input>

        </Modal>
        )
    }

    const renderAllProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>description</th>
                        <th>pictures</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products&&product.products.length > 0 ?
                            product.products.map(product =>
                                <tr onClick={() => { showProductDetailsModal(product) }} key={product._id}>
                                    <td>2</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td>{product.pictures}</td>
                                </tr>

                            ) : null
                    }
                </tbody>
            </Table>
        )
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false)
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product)
        setProductDetailsModal(true)
    }

    const renderProductDetailsModal = () => {
        console.log(productDetails)
        return (
            <Modal show={productDetailsModal}
                handleClose={handleCloseProductDetailsModal}
                onSubmit={handleCloseProductDetailsModal}
                Title="Product details"
                size="lg">
                <Row>
                    <Col md={6}>
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category ? productDetails.category.name : ''}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <label className="key">Pictures</label>
                        <div style={{ display: 'flex' }}>
                            {
                                productDetails.productPictures ? productDetails.productPictures.map(pic => {
                                    return (
                                        <div className="productImageContainer" key={pic._id}>
                                            <a href={generatePublicUrl(pic.img)}>  
                                                <img src={generatePublicUrl(pic.img)} />
                                            </a>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </Col>
                </Row>

            </Modal>
        )
    }
    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                                <Button onClick={handleShow}>Add Product</Button>
                            </div>
                        </Col>
                    </Row>
                    {renderAllProducts()}

                </Container>
                {renderAddProductModal()}
                {renderProductDetailsModal()}
            </Layout>
        </>
    )
}

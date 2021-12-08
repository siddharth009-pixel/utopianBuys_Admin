import React, { useEffect, useState } from "react"
import Layout from '../../components/Layout'
import Modal from '../../UI/Modal'
import createCategoryList from "../../helpers/linearCategoryList"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { Input } from "../../UI/Input"
import { createPageAction } from "../../actions/page.action"


export default function NewPage() {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    const [newPageModal, setNewPageModal] = useState(false)
    const [categoryId, setCategoryId] = useState()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [banners, setBanners] = useState([])
    const [products, setProducts] = useState([])
    const [type, setType] = useState('')
    const page = useSelector(state => state.page)

    useEffect(() => {
        setCategories(createCategoryList(category.categories))
    }, [category])

    useEffect(() => {
        if(!page.loading){
            setNewPageModal(false)
        }
    }, [page.loading])


    const onCategoryChange = (e) => {
        const category = categories.find(cat => cat.value == e.target.value)
        setType(category.type)
        setCategoryId(e.target.value)
    }

    const handleBannerImages = (e) => {
        setBanners([
            ...banners,
            e.target.files[0]
        ])
    }

    const handleProductImages = (e) => {
        setProducts([
            ...products,
            e.target.files[0]
        ])
    }

    const createNewPage = () => {
        setNewPageModal(true)
    }

    const submitPageForm = () => {
        console.log(title);
        console.log(categoryId);
        console.log(desc);
        console.log(type);
        console.log(banners);
        console.log(products);

        if (title == "") {
            alert("title is empty")
        }

        const form = new FormData();
        form.append('title', title)
        form.append('category', categoryId)
        form.append('description', desc)
        form.append('type', type)
        if(banners.length>0){
            banners.forEach(banner => {
                form.append('banners', banner)
            })
        }

        if(products.length>0){
            products.forEach(product => {
                form.append('products', product)
            })
        }

        dispatch(createPageAction(form))

        setTitle('')
        setCategoryId('')
        setDesc('')
        setType('')
        setBanners([])
        setProducts([])

    }

    const renderNewPageModal = () => {

        return (
            <Modal
                show={newPageModal}
                handleClose={()=>setNewPageModal(false)}
                onSubmit={submitPageForm}
                title="create New Page"
                size="lg"
            >

                <Row>
                    <Col>
                        <Input
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            placeholder={"page title"}
                        />
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <select
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => { onCategoryChange(e) }}
                        >
                            <option>select Category</option>
                            {
                                categories.map((cat, index) => {
                                    return (
                                        <option key={index} value={cat.value}>{cat.name}</option>
                                    )
                                })
                            }
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            className="form-control"
                            placeholder={"product description"}
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value) }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) => <h6 key={index}>{banner.name}</h6>) : ''
                        }
                        <Input
                            type="file"
                            onChange={handleBannerImages}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            products.length > 0 ?
                                products.map((product, index) => <h6 key={index}>{product.name}</h6>) : ''
                        }
                        <Input
                            type="file"
                            label="ProductImages"
                            onChange={handleProductImages}
                        />
                    </Col>
                </Row>

            </Modal>
        )
    }


    return (

        <Layout sidebar>
            {
                page.loading ?
                    <>
                        <h3>creating page...please wait</h3>
                    </>
                    :
                    <>
                        <button onClick={createNewPage}>create New Page</button>
                        {renderNewPageModal()}
                    </>
            }

        </Layout>
    )
}
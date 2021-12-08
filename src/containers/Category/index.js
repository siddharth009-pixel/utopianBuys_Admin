import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { addCategory, getAllCategory, updateCategories ,deleteCategories as deleteCategoriesAction} from '../../actions/category.action'
import { Input } from '../../UI/Input'
import Modal from '../../UI/Modal'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import createCategoryList from '../../helpers/linearCategoryList'
import './style.css'
import {
    IoIosCheckbox,
    IoIosCheckboxOutline,
    IoIosArrowDroprightCircle,
    IoIosArrowDropdownCircle,
    IoIosArrowForward,
    IoIosArrowDown
} from 'react-icons/io'
import { AddCategoryModal } from './components/AddCategoryModal'
import { EditCategoriesModal } from './components/EditCategoriesModal'
import { DeleteCategoryModal } from './components/DeleteCategoryModal'

export default function Category() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState()
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

    const dispatch = useDispatch()
    const category = useSelector(state => state.category)


    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        setCategoryName('')
        setParentCategoryId('')

        dispatch(addCategory(form))
        setShow(false)
    }

    const handleShow = () => setShow(true);




    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }


    const renderCategories = (categories) => {
        let nodes = [];
        for (let category of categories) {
            nodes.push({
                label: category.name,
                value: category._id,
                children: category.children.length > 0 && renderCategories(category.children)
            })
        }
        return nodes;
    }

    const updateCheckedAndExpandedCategories=()=>{
        const categories = createCategoryList(category.categories);
        const checkedArray = []
        const expandedArray = []
        checked.forEach((checkedCat) => {
            const category = categories.find(cat => checkedCat == cat.value)
            category && checkedArray.push(category)
        })

        expanded.forEach((expandedCat) => {
            const category = categories.find(cat => expandedCat == cat.value)
            category && expandedArray.push(category)
        })

        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)

        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories()
        setUpdateCategoryModal(true)
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => {
                return index == _index ? { ...item, [key]: value } : item
            })
            setCheckedArray(updatedCheckedArray)
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => {
                return index == _index ? { ...item, [key]: value } : item
            })
            setExpandedArray(updatedExpandedArray)

        }
    }

    const updateCategoriesForm = () => {

        const form = new FormData();
        for (let item of checkedArray) {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        }

        for (let item of expandedArray) {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        }

        dispatch(updateCategories(form))
            
        setUpdateCategoryModal(false);

    }


    const deleteCategory = () => {
        updateCheckedAndExpandedCategories()
        setDeleteCategoryModal(true)
    }

    const deleteCategories=()=>{
        const ids=[];
        const id=checkedArray.map((checked)=>{
            ids.push(checked.value)
        })
        dispatch(deleteCategoriesAction(ids))
        setDeleteCategoryModal(false)  

    }

    const categoryList=createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container className="con">
                <Row>
                    <Col md={12}>
                        <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                            <Button onClick={handleShow}>Add Category</Button>
                        </div>
                    </Col>

                    <Col md={12} >
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={() => { updateCategory() }}>Edit</button>
                        <button onClick={() => {deleteCategory()}}>delete</button>
                    </Col>
                </Row>
            </Container>

            <AddCategoryModal 
            show={show}
            handleClose={()=>setShow(false)}
            onSubmit={handleClose}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            parentCategoryId={parentCategoryId}
            setParentCategoryId={setParentCategoryId}
            categoryList={categoryList}
            handleCategoryImage={handleCategoryImage}
            />

            <EditCategoriesModal 
            show={updateCategoryModal}
            handleClose={()=>{setUpdateCategoryModal(false)}}
            onSubmit={updateCategoriesForm}
            checkedArray={checkedArray}
            expandedArray={expandedArray}
            handleCategoryInput={handleCategoryInput}
            categoryList={categoryList}
            />

            <DeleteCategoryModal 
            show={deleteCategoryModal}
            handleClose={()=>{setDeleteCategoryModal(false)}}
            onSubmit={deleteCategories}
            checkedArray={checkedArray}
            expandedArray={expandedArray}
            deleteCategories={deleteCategories}
            />
            {/* Add Category */}
            {/* {renderAddCategory()} */}

            {/* edit category */}
            {/* {renderEditCategories()} */}
            
            {/* delete categories */}
            {/* {renderDeleteCategories()} */}

        </Layout>
    )
}

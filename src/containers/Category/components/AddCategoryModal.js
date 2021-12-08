import React from "react"
import { Input } from "../../../UI/Input"
import Modal from "../../../UI/Modal"


export const AddCategoryModal=(props)=>{
    const {
    show,
    onSubmit,
    handleClose,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage
    } =props

    return(
        <Modal show={show}
        onSubmit={onSubmit}
        handleClose={handleClose}
        Title="Add New Category">
        <Input type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}>
        </Input>
        <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)
            }>
            <option>Select Parent Category</option>
            {
                categoryList.map(category =>
                    <option key={category.value} value={category.value}>{category.name}</option>
                )
            }
        </select>
        <input type="file"
            name="categoryImage"
            onChange={handleCategoryImage}>
        </input>

    </Modal>
    )
}
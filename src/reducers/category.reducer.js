import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: {}
}


const buildNewCategories=(parentId,categories,category)=>{
    let myCategories=[]

    if(parentId===undefined){
            return [...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                type:category.type,
                children:[]
            }
        ]
    }
    for(let cat of categories){
        
        if(cat._id===parentId){
            const newCategory={
                _id:category._id,
                name:category.name,
                slug:category.slug,
                parentId:category.parentId,
                type:category.type,
                children:[]
                }
        
            myCategories.push({...cat,  
                children : cat.children.length> 0 ? [...cat.children,newCategory] : [newCategory]  })
        }else{
            myCategories.push({
                ...cat,
                children:cat.children && cat.children.length>0 ? buildNewCategories(parentId,cat.children,category):[]
            })
        }
    }
return myCategories;
}

export const categoryReducer = (state = initState, action) => {
    
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
        }
        case categoryConstants.GET_ALL_CATEGORIES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS: {
            const {category}=action.payload
            return {
                ...state,
                loading:false,
                categories:buildNewCategories(category.parentId,state.categories,category)
            }
        }
        case categoryConstants.ADD_NEW_CATEGORY_FAILED: {
            return {
                ...state,
                loading:false,
                err:action.payload
            }
        }
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:{
            return {
                ...state,
                loading:true
            }
        }
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:{
            return {
                ...state,
                loading:false
            }
        }
        case categoryConstants.UPDATE_CATEGORIES_FAILED:{
            return {
                ...state,
                loading:false,
                error:action.payload.error
            }
        }
        case categoryConstants.DELETE_CATEGORIES_REQUEST:{
            return {
                ...state,
                loading:true
            }
        }
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:{
            return {
                ...state,
                loading:false
            }
        }
        case categoryConstants.DELETE_CATEGORIES_FAILED:{
            return {
                ...state,
                error:action.payload.error
            }
        }
        default:{
            return state;
        }
    }
}
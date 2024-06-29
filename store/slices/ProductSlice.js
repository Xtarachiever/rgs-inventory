import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[]
}

export const productSlice = createSlice({
    name: "products",
    initialState,

    reducers:{
        setProducts(state,action){
            state.products = action.payload
        },
        updateProducts(state,action){
            state.products.push(action.payload)
        }
    }
})

export const { products, setProducts, updateProducts } = productSlice.actions
export default productSlice.reducer;
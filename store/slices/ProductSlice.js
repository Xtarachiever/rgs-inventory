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
        }
    }
})

export const { products, setProducts } = productSlice.actions
export default productSlice.reducer;
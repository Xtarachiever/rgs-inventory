import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sales:[]
}

export const saleSlice = createSlice({
    name: "sales",
    initialState,

    reducers:{
        setSales(state,action){
            state.sales = action.payload
        },
        updateSales(state,action){
            state.sales.push(action.payload)
        },
    }
})

export const { sales, setSales, updateSales } = saleSlice.actions
export default saleSlice.reducer;
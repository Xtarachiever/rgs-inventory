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
        // updatePurchases(state,action){
        //     state.purchases.push(action.payload)
        // },
    }
})

export const { sales, setSales } = saleSlice.actions
export default saleSlice.reducer;
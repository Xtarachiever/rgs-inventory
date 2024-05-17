import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    purchases:[]
}

export const purchaseSlice = createSlice({
    name: "purchases",
    initialState,

    reducers:{
        setPurchases(state,action){
            state.purchases = action.payload
        }
    }
})

export const { purchases, setPurchases } = purchaseSlice.actions
export default purchaseSlice.reducer;
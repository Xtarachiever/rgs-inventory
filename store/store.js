import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/ProductSlice";
import { purchaseSlice } from "./slices/PurchaseSlice";


export const store = configureStore({
    reducer:{
        [productSlice.name] : productSlice.reducer,
        [purchaseSlice.name] : purchaseSlice.reducer,
    },
    devTools:true
})
import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/ProductSlice";
import { purchaseSlice } from "./slices/PurchaseSlice";
import { saleSlice } from "./slices/SaleSlice";


export const store = configureStore({
    reducer:{
        [productSlice.name] : productSlice.reducer,
        [purchaseSlice.name] : purchaseSlice.reducer,
        [saleSlice.name] : saleSlice.reducer,
    },
    devTools:true
})
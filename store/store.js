import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/ProductSlice";


export const store = configureStore({
    reducer:{
        [productSlice.name] : productSlice.reducer
    },
    devTools:true
})
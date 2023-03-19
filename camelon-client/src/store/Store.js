import { configureStore } from "@reduxjs/toolkit";
import camelonSlice from './Reducer';

export default configureStore({
    reducer: {
        data: camelonSlice
    }
})
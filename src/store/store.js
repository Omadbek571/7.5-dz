import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'; // counterSlice.reducer bilan import qilinadi

const store = configureStore({
    reducer: {
        counter: counterReducer, // to'g'ri nom bilan
    }
})

export default store

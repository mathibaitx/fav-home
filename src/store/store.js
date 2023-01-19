import { configureStore } from "@reduxjs/toolkit";
import busquedasReducer from "../features/busquedasSlice";

export const store = configureStore({
    reducer: {
        busquedas: busquedasReducer,
    },
})





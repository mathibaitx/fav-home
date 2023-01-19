import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    histBusqueda: "",
    historial: [],
    busquedas: [],
    favoritos: [],
    descartados: [],
    articuloSeleccionado: [],
}

export const busquedasSlice = createSlice({
    name: "busquedas",
    initialState,
    reducers: {
        historialBusSeleccionada: (state, action) => {
            state.histBusqueda = action.payload;
        },

        guardarHistorial: (state, action) => {
            state.historial.push(action.payload);
        },
        guardarBusquedas: (state, action) => {
            state.busquedas = action.payload;
        },
        guardarFavoritos: (state, action) => {
            state.favoritos.push(action.payload);
        },
        guardarDescartados: (state, action) => {
            state.descartados.push(action.payload);
        },

        actualizarHistorial: (state, action) => {
            state.historial = action.payload;
        },
        actualizarFavoritos: (state, action) => {
            state.favoritos = action.payload;
        },
        actualizarDescartados: (state, action) => {
            state.descartados = action.payload;
        },

        seleccionarArticulo: (state, action) => {
            state.articuloSeleccionado = action.payload;
        }
    }
})

export const { guardarHistorial, guardarBusquedas, guardarFavoritos, guardarDescartados, actualizarHistorial, actualizarFavoritos, actualizarDescartados,
    historialBusSeleccionada, seleccionarArticulo } = busquedasSlice.actions;
export default busquedasSlice.reducer;
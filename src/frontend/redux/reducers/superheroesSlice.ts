import { createSlice } from '@reduxjs/toolkit';
import { ActionState } from '../../utils/interfaces';
import {
    getSuperheroesData,
    getSuperheroData,
    createSuperheroData,
    editSuperheroData,
    deleteSuperheroData,
} from '../actions/superheroActions';

const superheroSlice = createSlice({
    name: 'superheroes',
    initialState: {
        error: null,
        pagesNumber: null,
        fetchingSuperheroes: false,
        fetchingSuperhero: false,
        creatingSuperhero: false,
        deletingSuperhero: false,
        editingSuperhero: false,
        superheroes: null,
        superhero: null
    } as ActionState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSuperheroesData.fulfilled, (state, action) => {
            state.fetchingSuperheroes = false
            state.pagesNumber = Math.ceil(action.payload.superheroNumber / 5)
            state.superheroes = action.payload.superheroes
        })
        builder.addCase(getSuperheroesData.pending, (state) => {
            state.fetchingSuperheroes = true
        })
        builder.addCase(getSuperheroesData.rejected, (state, action) => {
            state.fetchingSuperheroes = false
            state.error = action.payload as string
        })
        builder.addCase(createSuperheroData.fulfilled, (state) => {
            state.creatingSuperhero = false
        })
        builder.addCase(createSuperheroData.pending, (state, action) => {
            state.creatingSuperhero = true
        })
        builder.addCase(createSuperheroData.rejected, (state, action) => {
            state.creatingSuperhero = false
            state.error = action.payload as string
        })
        builder.addCase(editSuperheroData.fulfilled, (state) => {
            state.editingSuperhero = false
        })
        builder.addCase(editSuperheroData.pending, (state, action) => {
            state.editingSuperhero = true
        })
        builder.addCase(editSuperheroData.rejected, (state, action) => {
            state.editingSuperhero = false
            state.error = action.payload as string
        })
        builder.addCase(getSuperheroData.fulfilled, (state, action) => {
            state.fetchingSuperhero = false
            state.superhero = action.payload
        })
        builder.addCase(getSuperheroData.pending, (state) => {
            state.fetchingSuperhero = true
        })
        builder.addCase(getSuperheroData.rejected, (state, action) => {
            state.fetchingSuperhero = false
            state.error = action.payload as string
        })
        builder.addCase(deleteSuperheroData.fulfilled, (state) => {
            state.deletingSuperhero = false
            state.superhero = null
        })
        builder.addCase(deleteSuperheroData.pending, (state) => {
            state.deletingSuperhero = true
        })
        builder.addCase(deleteSuperheroData.rejected, (state, action) => {
            state.deletingSuperhero = false
            state.error = action.payload as string
        })
    }
})

export default superheroSlice.reducer;
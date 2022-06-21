import { AnyAction } from 'redux'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormState, SuperheroShort, SuperheroFull } from '../../utils/interfaces'
import getFormDataFromObject from '../../utils/getFormDataFromObject'
import isPositiveInteger from '../../utils/isPositiveInteger';
import ActionTypes from './actionTypes'

const link = "http://localhost:5000"

export const getSuperheroesData = createAsyncThunk<
    { superheroes: SuperheroShort[], superheroNumber: number },
    unknown,
    {
        rejectValue: string
    }
    >(
    ActionTypes[ActionTypes.GET_SUPERHEROES],
    async function (page, { rejectWithValue }) {
        const pageNumber: number = typeof page === "number" && isPositiveInteger(page) ? +page : 1
        const response = await fetch(link + `/superheroes?page=${pageNumber}`, {
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        const rowNumber: number = response.headers.get('X-Total-Count') === null ? 0 : +response.headers.get('X-Total-Count')!
        const responseJson = await response.json()
        if (!response.ok) {
            return rejectWithValue(responseJson.message as string)
        } else {
            return { superheroes: responseJson, superheroNumber: rowNumber }
        }
    }
)

export const createSuperheroData = createAsyncThunk<
    void,
    FormState,
    {
        rejectValue: string
    }
    >(
    ActionTypes[ActionTypes.CREATE_SUPERHERO],
    async function (data, { rejectWithValue }) {
        const response = await fetch(link + `/superheroes`, {
            headers: {
                'Accept': 'application/json',
            },
            body: getFormDataFromObject(data),
            method: 'POST'

        })
        if (!response.ok) {
            const responseJson = await response.json()
            return rejectWithValue(responseJson.message)
        } else {
            return;
        }
    }
)

export const editSuperheroData = createAsyncThunk<
    void,
    { id: number, data: FormState },
    {
        rejectValue: string
    }
    >(
    ActionTypes[ActionTypes.EDIT_SUPERHERO],
    async function ({ id, data }, { rejectWithValue }) {
        const response = await fetch(link + `/superheroes/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
            body: getFormDataFromObject(data),
            method: 'PUT'

        })
        if (!response.ok) {
            const responseJson = await response.json()
            return rejectWithValue(responseJson.message)
        } else {
            return;
        }
    }
)

export const getSuperheroData = createAsyncThunk<
    SuperheroFull,
    number,
    {rejectValue: string}
    >(
    ActionTypes[ActionTypes.GET_SUPERHERO],
    async function (id, { rejectWithValue }) {
        const response = await fetch(link + `/superheroes/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET'
        })
        const responseJson = await response.json()
        if (!response.ok) {
            return rejectWithValue(responseJson.message)
        } else {
            return responseJson;
        }
    }
)

export const deleteSuperheroData = createAsyncThunk<
    void,
    number,
    {
        rejectValue: string
    }
    >(
    ActionTypes[ActionTypes.DELETE_SUPERHERO],
    async function (id, { rejectWithValue }) {
        const response = await fetch(link + `/superheroes/${id}`, {
            headers: {
                'Accept': 'application/json',
            },
            method: 'DELETE'

        })
        if (!response.ok) {
            const responseJson = await response.json()
            return rejectWithValue(responseJson.message)
        } else {
            return;
        }
    }
)

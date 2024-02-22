import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchContacts = createAsyncThunk('/contacts', async (_, thunkApi) => {
    try {
        const response = await axios.get('/contacts');
        return response.data
    }
    catch (e) { return thunkApi.rejectWithValue(e.message) }
})

export const addContact = createAsyncThunk('contacts/addContact', async (text, thunkApi) => {
    try {
        const response = await axios.post('/contacts', text);
        return response.data;
    } catch (e) { return thunkApi.rejectWithValue(e.message) }
})


export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkApi) => {
    try {
        const response = await axios.delete(`/contacts/${id}`);
        return response.data
    } catch (e) {
        return thunkApi.rejectWithValue(e.message)
    }
})


export const changeContact = createAsyncThunk('contacts/changeContact', async ({ id, name, number }, thunkApi) => {

    try {

        const response = await axios.patch(`/contacts/${id}`, { name, number })
        return response.data;
    }
    catch (error) {
        return thunkApi.rejectWithValue(error);
    }





})
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


axios.defaults.baseURL = 'https://65cccf0add519126b83f9f8f.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkApi) => {
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

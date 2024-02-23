import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, changeContact } from './contactsOperations';


const contactsInitialState = {
    items: [],
    isLoading: false,
    error: null,
    contactToChange: {
        name: '',
        number: '',
        id: ''
    },
    idToDelete: null,
}

const handlePending = (state) => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}

const contactsSlice = createSlice({
    name: 'contact',
    initialState: contactsInitialState,
    reducers: {
        setIdToDelete(state, actions) {
            state.idToDelete = actions.payload;
        },
        setContactToChange(state, actions) {
            state.contactToChange = actions.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload)
            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items.splice(index, 1)
            })
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(changeContact.fulfilled, (state, action) => {

                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items.splice(index, 1, action.payload)
            }).addCase(changeContact.pending, handlePending)
    }
})



export const contactsReducer = contactsSlice.reducer;
export const { setIdToDelete, setContactToChange } = contactsSlice.actions;


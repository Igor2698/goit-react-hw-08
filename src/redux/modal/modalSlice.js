import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDeleteModalOpen: false,
    idToDelete: null,
    isChangeModalOpen: false,
    contactToChange: {
        name: '',
        number: '',
        id: ''
    },
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeDeleteModal: {
            reducer(state) {
                state.isDeleteModalOpen = false;
            }
        },
        openDeleteModal: {
            reducer(state) {
                state.isDeleteModalOpen = true;
            }
        },
        setIdToDelete: {
            reducer(state, actions) {
                state.idToDelete = actions.payload;
            }
        },
        openChangeModal: {
            reducer(state) {
                state.isChangeModalOpen = true;
            }
        },
        closeChangeModal: {
            reducer(state) {
                state.isChangeModalOpen = false;
            }
        },
        setContactToChange: {
            reducer(state, actions) {
                state.contactToChange = actions.payload;
            }
        }
    }
})

export const { closeDeleteModal, openDeleteModal, setIdToDelete, closeChangeModal, setContactToChange, openChangeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer; 
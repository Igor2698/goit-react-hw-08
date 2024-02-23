import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDeleteModalOpen: false,
    isChangeModalOpen: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeDeleteModal(state) {
            state.isDeleteModalOpen = false;
        },
        openDeleteModal(state) {
            state.isDeleteModalOpen = true;
        },
        openChangeModal(state) {
            state.isChangeModalOpen = true;
        },
        closeChangeModal(state) {
            state.isChangeModalOpen = false;
        },
    }
})

export const { closeDeleteModal, openDeleteModal, closeChangeModal, openChangeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;



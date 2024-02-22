import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.filter.name;
export const selectIsContactsLoading = (state) => state.contacts.isLoading;
export const selectContactsError = (state) => state.contacts.error;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsDeleteModalOpen = (state) => state.modal.isDeleteModalOpen;
export const selectIdToDelete = (state) => state.modal.idToDelete;
export const selectContactToChange = (state) => state.modal.contactToChange;
export const selectIsChangeModalOpen = (state) => state.modal.isChangeModalOpen;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;




export const selectVisibleContacts = createSelector([selectContacts, selectFilter], (contacts, filter) => {
    const fuse = new Fuse(contacts, {
        keys: ["name", "number"],
        threshold: 0.0,
    });

    if (!filter.trim()) {
        return contacts;
    }

    const result = fuse.search(filter).map(result => result.item);
    return result;

})


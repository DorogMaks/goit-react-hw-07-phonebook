import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';
import {
  addContactSuccessReducer,
  deleteContactSuccessReducer,
  fetchContactsSuccessReducer,
  fulfilledReducer,
  pendingReducer,
  rejectedReducer,
} from './helpers/contactsReducers';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const extraActions = [fetchContacts, addContact, deleteContact];

const getActions = type => extraActions.map(action => action[type]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsSuccessReducer)
      .addCase(addContact.fulfilled, addContactSuccessReducer)
      .addCase(deleteContact.fulfilled, deleteContactSuccessReducer)
      .addMatcher(isAnyOf(...getActions('pending')), pendingReducer)
      .addMatcher(isAnyOf(...getActions('fulfilled')), fulfilledReducer)
      .addMatcher(isAnyOf(...getActions('rejected')), rejectedReducer),
});

export const contactsReducer = contactsSlice.reducer;

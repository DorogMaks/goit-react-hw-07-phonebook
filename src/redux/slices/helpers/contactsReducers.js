export const fetchContactsSuccessReducer = (state, action) => {
  state.items = action.payload;
};

export const addContactSuccessReducer = (state, action) => {
  state.items.push(action.payload);
};

export const deleteContactSuccessReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

export const pendingReducer = state => {
  state.isLoading = true;
};

export const fulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

export const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

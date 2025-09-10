import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme, toggleModal } = uiSlice.actions;
export default uiSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: -1,
  activeSortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSortType(state, action) {
      state.activeSortType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setActiveSortType } = filterSlice.actions;

export default filterSlice.reducer;

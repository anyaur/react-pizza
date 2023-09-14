import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: -1,
  activeSortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = action.payload.category;
      state.activeSortType = action.payload.sort;
      state.currentPage = action.payload.currentPage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setActiveSortType, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;

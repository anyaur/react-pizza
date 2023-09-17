import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id == action.payload.id &&
          obj.type == action.payload.type &&
          obj.size == action.payload.size,
      );
      console.log(action.payload);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id == action.payload.id &&
          obj.type == action.payload.type &&
          obj.size == action.payload.size,
      );
      if (findItem.count > 1) {
        findItem.count--;
      } else {
        const itemIndex = state.items.indexOf(
          state.items.find(
            (obj) =>
              obj.id == action.payload.id &&
              obj.type == action.payload.type &&
              obj.size == action.payload.size,
          ),
        );
        state.items.splice(itemIndex, 1);
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (obj) =>
          obj.id != action.payload.id ||
          obj.type != action.payload.type ||
          obj.size != action.payload.size,
      );
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    deleteItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, minusItem, removeItem, deleteItems } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to the cart
    addItem: (state, action) => {
      const itemExists = state.items.find(item => item.name === action.payload.name);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove item from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    // Update quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    }
  },
});

// Export actions
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

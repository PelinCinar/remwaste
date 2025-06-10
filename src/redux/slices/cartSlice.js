import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSkip: null,
  quantity: 1,
  extendedHire: false,
  extendedHireDays: 7,
  extendedHirePrice: 50,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedSkip: (state, action) => {
      state.selectedSkip = action.payload;
      // Reset quantity when changing skip
      state.quantity = 1;
    },
    
    updateQuantity: (state, action) => {
      const newQuantity = action.payload;
      if (newQuantity >= 1 && newQuantity <= 10) {
        state.quantity = newQuantity;
      }
    },
    
    incrementQuantity: (state) => {
      if (state.quantity < 10) {
        state.quantity += 1;
      }
    },
    
    decrementQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1;
      }
    },
    
    toggleExtendedHire: (state) => {
      state.extendedHire = !state.extendedHire;
    },
    
    addToCart: (state) => {
      if (state.selectedSkip) {
        const basePrice = state.selectedSkip.price * state.quantity;
        const extendedPrice = state.extendedHire ? state.extendedHirePrice : 0;
        const totalPrice = basePrice + extendedPrice;
        
        const cartItem = {
          id: Date.now(), // Simple ID generation
          skip: state.selectedSkip,
          quantity: state.quantity,
          extendedHire: state.extendedHire,
          extendedHireDays: state.extendedHire ? state.extendedHireDays : 0,
          extendedHirePrice: extendedPrice,
          basePrice,
          totalPrice
        };
        
        state.items.push(cartItem);
      }
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.selectedSkip = null;
      state.quantity = 1;
      state.extendedHire = false;
    }
  }
});

export const {
  setSelectedSkip,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  toggleExtendedHire,
  addToCart,
  removeFromCart,
  clearCart
} = cartSlice.actions;

// Selectors
export const selectSelectedSkip = (state) => state.cart.selectedSkip;
export const selectQuantity = (state) => state.cart.quantity;
export const selectExtendedHire = (state) => state.cart.extendedHire;
export const selectExtendedHirePrice = (state) => state.cart.extendedHirePrice;
export const selectExtendedHireDays = (state) => state.cart.extendedHireDays;
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => {
  if (!state.cart.selectedSkip) return 0;
  
  const basePrice = state.cart.selectedSkip.price * state.cart.quantity;
  const extendedPrice = state.cart.extendedHire ? state.cart.extendedHirePrice : 0;
  return basePrice + extendedPrice;
};

export const selectCartItemsTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + item.totalPrice, 0);
};

export default cartSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartPizza, Pizza} from '../types';
import {RootState} from '../api/store';
import {postOrder} from './ordersThunks';

interface CartState {
  cartPizzas: CartPizza[];
  orderTotal: number;
  showModal: boolean;
  postLoading: boolean,
}

const initialState: CartState = {
  cartPizzas: [],
  orderTotal: 0,
  showModal: false,
  postLoading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, {payload: pizza}: PayloadAction<Pizza>) => {
      const index = state.cartPizzas.findIndex((cartPizza) => cartPizza.pizza.id === pizza.id);

      if (index !== -1) {
        state.cartPizzas[index].amount++;
      } else {
        state.cartPizzas.push({
          amount: 1,
          pizza,
        });
      }
    },
    deletePizzaOrder: (state, {payload: pizza}) => {
      state.cartPizzas = state.cartPizzas.filter((cartPizza) => cartPizza.pizza.id != pizza.id);
    },
    clearCart: (state) => {
      state.cartPizzas = [];
    },
    calculateOrderTotal: (state) => {
      state.orderTotal = state.cartPizzas.reduce((sum, cartPizza) => {
        return sum + cartPizza.amount * cartPizza.pizza.price;
      }, 0);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.postLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state) => {
      state.postLoading = false;
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.postLoading = false;
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const {addPizza, deletePizzaOrder, clearCart, calculateOrderTotal} = cartSlice.actions;
export const selectCartPizzas = (state: RootState) => state.cart.cartPizzas;
export const selectOrderTotal = (state: RootState) => state.cart.orderTotal;
export const selectPostLoading = (state: RootState) => state.cart.postLoading;


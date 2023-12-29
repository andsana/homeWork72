import {configureStore} from '@reduxjs/toolkit';
import {pizzasReducer} from '../store/pizzas/pizzasSlise';
import {cartReducer} from "../store/cartSlice";
import {ordersReducer} from "../store/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    cart: cartReducer,
    orders: ordersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
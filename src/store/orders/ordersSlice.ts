import {Order} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../api/store';
import {deleteOrder, fetchOrders} from "./ordersThunks";

interface OrdersState {
    orders: Order[];
    fetchOrdersLoading: boolean;
    deleteOrderLoading: false | string;
}

const initialState: OrdersState = {
    orders: [],
    fetchOrdersLoading: false,
    deleteOrderLoading: false,
};

export const ordersSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.fetchOrdersLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, {payload: orders}) => {
            state.fetchOrdersLoading = false;
            state.orders = orders;
        });
        builder.addCase(fetchOrders.rejected, (state) => {
            state.fetchOrdersLoading = false;
        });

        builder.addCase(deleteOrder.pending, (state, {meta}) => {
            state.deleteOrderLoading = meta.arg;
        });
        builder.addCase(deleteOrder.fulfilled, (state) => {
            state.deleteOrderLoading = false;
        });
        builder.addCase(deleteOrder.rejected, (state) => {
            state.deleteOrderLoading = false;
        });
    }
});
export const ordersReducer = ordersSlice.reducer;
export const selectOrders = (state: RootState) => state.orders.orders;
export const  selectFetchOrdersLoading = (state: RootState) => state.orders.fetchOrdersLoading;
export const selectDeleteOrderLoading = (state: RootState) => state.orders.deleteOrderLoading;

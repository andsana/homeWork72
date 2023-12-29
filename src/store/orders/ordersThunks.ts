import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder, ApiOrders, Order} from '../../types';
import {AppDispatch} from '../../api/store';
import axiosApi from '../../axiosApi';
import {DELIVERY} from '../../components/constants';

export const postOrder = createAsyncThunk<void, ApiOrder, { dispatch: AppDispatch }>(
  'orders/post',
  async (apiOrder, thunkAPI) => {
    await axiosApi.post('/orders.json', apiOrder);
    await thunkAPI.dispatch(fetchOrders());
  }
);

export const fetchOrders = createAsyncThunk<Order[]>(
  'orders/fetchOrders',
  async () => {
    const ordersResponse = await axiosApi.get<ApiOrders | null>('/orders.json');
    const orders = ordersResponse.data;

    let ordersArr: Order[] = [];

    if (orders) {
      ordersArr = Object.keys(orders).map((id: string) => {
        const order = orders[id];
        const totalPrice = order.pizzas.reduce((sum, cartPizza) => {
          return sum + cartPizza.amount * cartPizza.pizza.price;
        }, 0);
        const total = totalPrice + DELIVERY;
        return {
          ...order,
          id,
          total,
        };
      });
    }

    return ordersArr;
  }
);
export const deleteOrder = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'orders/delete',
    async (orderId, thunkAPI)=> {
        await axiosApi.delete(`/orders/${orderId}.json`);
        await thunkAPI.dispatch(fetchOrders());
    }
);
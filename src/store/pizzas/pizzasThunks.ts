import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiPizza, Pizza, PizzasList} from '../../types';
import axiosApi from '../../axiosApi';
import {AppDispatch} from '../../api/store';

export const createPizza = createAsyncThunk<void, ApiPizza, { dispatch: AppDispatch }>(
  'pizzas/create',
  async (pizza, thunkAPI) => {
    await axiosApi.post('/pizzas.json', pizza);
    await thunkAPI.dispatch(fetchPizzas());
  }
);

export const fetchPizzas = createAsyncThunk<Pizza[], undefined>(
  'pizzas/fetchPizzas',
  async () => {
    const pizzasResponse = await axiosApi.get<PizzasList | null>('/pizzas.json');
    const pizzas = pizzasResponse.data;

    let newPizzas: Pizza[] = [];

    if (pizzas) {
      newPizzas = Object.keys(pizzas).map((key) => {
        const pizza = pizzas[key];
        return {
          ...pizza,
          id: key,
        };
      });
    }
    return newPizzas;
  }
);

export const fetchOnePizza = createAsyncThunk<ApiPizza, string>(
  'pizzas/fetchOne',
  async (pizzaId) => {
    const response = await axiosApi.get<ApiPizza | null>(`/pizzas/${pizzaId}.json`);
    const pizza = response.data;

    if (pizza === null) {
      throw new Error('Not found');
    }
    return pizza;
  }
);

interface UpdatePizzaParams {
  id: string,
  pizza: ApiPizza,
}

export const updatePizza = createAsyncThunk<void, UpdatePizzaParams, { dispatch: AppDispatch }>(  
  'pizzas/update',
  async ({id, pizza}, thunkAPI) => {
    await axiosApi.put(`/pizzas/${id}.json`, pizza);
    await thunkAPI.dispatch(fetchPizzas());
  }
);

export const deletePizza = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
  'pizzas/delete',
  async (pizzaId, thunkAPI)=> {
    await axiosApi.delete(`/pizzas/${pizzaId}.json`);
    await thunkAPI.dispatch(fetchPizzas());
  }
);


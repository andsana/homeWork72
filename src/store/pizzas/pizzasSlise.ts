import {ApiPizza, Pizza} from '../../types';
import {createPizza, deletePizza, fetchOnePizza, fetchPizzas, updatePizza} from './pizzasThunks';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../api/store';

interface PizzasState {
  items: Pizza[];
  pizza: ApiPizza | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: false | string;
  showModal: boolean;
}

const initialState: PizzasState = {
  items: [],
  pizza: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  showModal: false,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    showModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOnePizza.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOnePizza.fulfilled, (state, {payload: pizza}) => {
      state.fetchOneLoading = false;
      state.pizza = pizza;
    });
    builder.addCase(fetchOnePizza.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createPizza.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPizza.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPizza.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(updatePizza.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updatePizza.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updatePizza.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(deletePizza.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deletePizza.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePizza.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const pizzasReducer = pizzasSlice.reducer;
export const selectPizzas = (state: RootState) => state.pizzas.items;
export const selectFetchLoading = (state: RootState) => state.pizzas.fetchLoading;
export const selectPizza = (state: RootState) => state.pizzas.pizza;
export const selectFetchOneLoading = (state: RootState) => state.pizzas.fetchOneLoading;
export const selectCreateLoading = (state: RootState) => state.pizzas.createLoading;
export const selectUpdateLoading = (state: RootState) => state.pizzas.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.pizzas.deleteLoading;

export const {showModal} = pizzasSlice.actions;
export const selectShowModal = (state: RootState) => state.pizzas.showModal;




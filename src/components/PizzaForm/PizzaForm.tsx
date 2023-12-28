import React, {useState} from 'react';

import {ApiPizza, PizzaMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: PizzaMutation = {
    title: '',
    image: '',
    price: '',
};

interface Props {
  onSubmit: (pizza: ApiPizza) => void;
  existingPizza?: PizzaMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const PizzaForm: React.FC<Props> = ({onSubmit, existingPizza = initialState, isEdit = false, isLoading = false}) => {
  const [pizza, setPizza] = useState<PizzaMutation>(existingPizza);

  const changePizza = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPizza((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit({
      ...pizza,
      price: parseFloat(pizza.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit pizza' : 'Add new Pizza'}</h4>
      <div className="form-group">
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={pizza.title}
          onChange={changePizza}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control"
          value={pizza.price}
          onChange={changePizza}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="url"
          name="image"
          id="image"
          className="form-control"
          value={pizza.image}
          onChange={changePizza}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default PizzaForm;
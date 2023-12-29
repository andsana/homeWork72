import React, {useState} from 'react';
import {Customer} from '../../types';
import {postOrder} from '../../store/ordersThunks';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import Spinner from '../Spinner/Spinner';
import {calculateOrderTotal, clearCart, selectCartPizzas, selectPostLoading} from '../../store/cartSlice';
import {showModal} from '../../store/pizzas/pizzasSlise';


const initialState = {
  name: '',
  address: '',
  phone: '',
};

const CustomerForm = () => {
  const dispatch = useAppDispatch();
  const cartPizzas = useAppSelector(selectCartPizzas);
  const postLoading = useAppSelector(selectPostLoading);
  const [customer, setCustomer] = useState<Customer>(initialState);

  const customerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendCustomer = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(postOrder({
      customer,
      pizzas: cartPizzas,
    }));

    setCustomer(initialState);
    dispatch(clearCart());
    dispatch(showModal());
    dispatch(calculateOrderTotal());
  };

  let form = (
    <form onSubmit={sendCustomer}>
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="form-control"
          value={customer.name}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          required
          className="form-control"
          value={customer.address}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          required
          className="form-control"
          value={customer.phone}
          onChange={customerChanged}
        />
      </div>
      <div className="d-flex gap-3 mt-3 justify-content-end">
        <button type="button" className="btn btn-danger" onClick={() => dispatch(showModal())}>Cancel</button>
        <button disabled={postLoading} type="submit" className="btn btn-success">Order</button>
      </div>
    </form>
  );

  if (postLoading) {
    form = <Spinner/>;
  }

  return (
    <>
      <h5 className="modal-title mb-3">Contact data:</h5>
      {form}
    </>

  );
};

export default CustomerForm;
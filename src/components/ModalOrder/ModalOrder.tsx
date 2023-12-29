import {useAppDispatch, useAppSelector} from '../../api/hooks';
import {DELIVERY} from '../constants';
import Backdrop from '../Backdrop/Backdrop';
import CartItem from '../CartItem/CartItem';
import CustomerForm from '../CustomerForm/CustomerForm';
import React from 'react';
import {selectCartPizzas, selectOrderTotal} from '../../store/cartSlice';
import {selectShowModal, showModal} from '../../store/pizzas/pizzasSlise';

const ModalOrder = () => {
  const dispatch = useAppDispatch();
  const cartPizzas = useAppSelector(selectCartPizzas);
  const orderTotal = useAppSelector(selectOrderTotal);
  const total = orderTotal + DELIVERY;
  const isShow = useAppSelector(selectShowModal);

  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  let cart = (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Cart is empty!</h5>
      </div>
      <div className="modal-body">
        <p>Add something!</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => dispatch(showModal())}>Close</button>
      </div>
    </div>
  );

  if (cartPizzas.length > 0) {
    cart = (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Your order:</h5>
        </div>
        <div className="modal-body">
          {cartPizzas.map((cartPizza) => (
            <CartItem key={cartPizza.pizza.id} cartPizza={cartPizza}/>
          ))}
          <div className="row mb-2">
            <div className="col">Delivery</div>
            <strong className="col-5">{DELIVERY} KGS</strong>
          </div>
          <div className="row mb-3">
            <div className="col">Total</div>
            <strong className="col-5">{total} KGS</strong>
          </div>
          <hr/>
          <CustomerForm/>
        </div>
      </div>
    );
  }

  return (
    <>
      <Backdrop show={isShow} onClick={() => dispatch(showModal())}/>
      <div className="modal show" style={{display: isShow ? 'block' : 'none'}}
           onClick={() => dispatch(showModal())}>
        <div className="modal-dialog" onClick={onInnerClick}>
          {cart}
        </div>
      </div>
    </>
  );
};
export default ModalOrder;
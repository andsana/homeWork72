import React from 'react';
import {CartPizza} from '../../types';
import {useAppDispatch} from '../../api/hooks';
import {calculateOrderTotal, deletePizzaOrder} from '../../store/cartSlice';

interface Props {
  cartPizza: CartPizza;
}

const CartItem: React.FC<Props> = ({cartPizza}) => {
  const dispatch = useAppDispatch();
  const price = cartPizza.pizza.price * cartPizza.amount;
  const buttonDeleteStyle = {
    color: 'red',
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
  };

  const deletePizzaToCart = () => {
    dispatch(deletePizzaOrder(cartPizza.pizza));
    dispatch(calculateOrderTotal());
  };

  return (
    <div className="card mb-2 p-2">
      <div className="row align-items-center">
        <div className="col">{cartPizza.pizza.title}</div>
        <div className="col-2">x{cartPizza.amount}</div>
        <strong className="col-3">
          {price} KGS
        </strong>
        <button
          className="col-2"
          style={buttonDeleteStyle}
          onClick={deletePizzaToCart}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
import Pizzas from '../../components/Pizzas/Pizzas';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import Order from '../../components/Order/Order';
import {selectOrderTotal} from '../../store/cartSlice';
import {showModal} from '../../store/pizzas/pizzasSlise';

const Home = () => {
  const dispatch = useAppDispatch();
  const orderTotal = useAppSelector(selectOrderTotal);

  return (
    <div className="row">
      <div className="col">
        <Pizzas/>
        <div className="d-flex" style={{maxWidth: '540px'}}>
          <div>Order total: <strong>{orderTotal} KGS</strong></div>
          <button className="btn btn-primary ms-auto" onClick={() => dispatch(showModal())}>Checkout</button>
        </div>
      </div>
      <Order/>
    </div>
  );
};

export default Home;

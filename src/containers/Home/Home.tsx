import Pizzas from '../Pizzas/Pizzas';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import ModalOrder from '../../components/ModalOrder/ModalOrder';
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
      <ModalOrder/>
    </div>
  );
};

export default Home;

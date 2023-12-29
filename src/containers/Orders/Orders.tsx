import {useAppDispatch, useAppSelector} from '../../api/hooks';
import OrderItem from './OrderItem';
import {useEffect} from "react";
import {fetchOrders} from "../../store/orders/ordersThunks";
import {selectFetchOrdersLoading, selectOrders} from "../../store/orders/ordersSlice";
import Spinner from "../../components/Spinner/Spinner";

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const fetchOrdersLoading = useAppSelector(selectFetchOrdersLoading);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

  return (
    <div>
        {fetchOrdersLoading && <Spinner/>}
      {orders.map((order) => (
        <OrderItem key={order.id} order={order}/>
      ))}
    </div>
  );
};

export default Orders;
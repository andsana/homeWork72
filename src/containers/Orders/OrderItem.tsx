import {Order} from '../../types';
import React from 'react';
import {DELIVERY} from "../../components/constants";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import {useAppDispatch, useAppSelector} from "../../api/hooks";
import {deleteOrder} from "../../store/orders/ordersThunks";
import {selectDeleteOrderLoading} from "../../store/orders/ordersSlice";

interface Props {
  order: Order;
}

const OrderItem: React.FC<Props> = ({order}) => {
    const dispatch = useAppDispatch();
    const deleteOrderLoading = useAppSelector(selectDeleteOrderLoading);

  return (
    <div className="card card-body mb-3" style={{maxWidth: "800px"}}>
        <div className="row">
            <div className="col">
                <h5>Order:</h5>
                {order.pizzas.map((pizza, index) => (
                    <div className="row" key={index}>
                        <p className="col">{pizza.amount} Х {pizza.pizza.title}</p>
                        <strong className="col">{pizza.pizza.price} KGS</strong>
                    </div>
                ))}
                <div className="row">
                    <hr/>
                    <div className="col">Delivery:</div>
                    <strong className="col">{DELIVERY} KGS</strong>
                </div>
                <div className="row">
                    <div className="col">Order total:</div>
                    <strong className="col">{order.total} KGS</strong>
                </div>
            </div>
            <div className="contacts col-3">
                <h5>Contact:</h5>
                <div>{order.customer.name}</div>
                <div>{order.customer.address}</div>
                <div>{order.customer.phone}</div>
            </div>
            <div className="col-3 text-end">
                <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteOrder(order.id))}
                    disabled={deleteOrderLoading ? deleteOrderLoading === order.id : false}
                >
                    {deleteOrderLoading && deleteOrderLoading === order.id && (<ButtonSpinner/>)}
                    Complete order
                </button>
            </div>
        </div>
    </div>
  );
};

export default OrderItem;
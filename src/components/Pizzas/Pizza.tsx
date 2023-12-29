import React from 'react';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import {selectDeleteLoading} from '../../store/pizzas/pizzasSlise';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {deletePizza} from '../../store/pizzas/pizzasThunks';
import {Pizza} from '../../types';
import {addPizza, calculateOrderTotal} from '../../store/cartSlice';

interface Props {
  pizza: Pizza;
}

const Pizza: React.FC<Props> = ({pizza}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const isAdminPage = location.pathname.startsWith('/admin');

  const addPizzaToCart = () => {
    if (!isAdminPage) {
      dispatch(addPizza(pizza));
      dispatch(calculateOrderTotal());
    }
  };

  return (
    <div
      className="card mb-3"
      style={{maxWidth: '540px'}}
      onClick={addPizzaToCart}
    >
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={pizza.image}
            className="img-fluid rounded-start"
            style={{width: '100%', height: '100%'}}
            alt="pizza pic"
          />
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <span className="card-title ms-2">{pizza.title}</span>
        </div>
        <div className="col-md-8 text-end">
          <div className="card-body d-flex gap-3 justify-content-end align-items-center">
            <span>{pizza.price} KGS</span>
            {isAdminPage && (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deletePizza(pizza.id))}
                  disabled={deleteLoading ? deleteLoading === pizza.id : false}
                >
                  {deleteLoading && deleteLoading === pizza.id && (<ButtonSpinner/>)}
                  Delete
                </button>
                <Link to={'/admin/update-pizza/' + pizza.id} className="btn btn-primary">Edit</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import {selectFetchOneLoading, selectPizza, selectUpdateLoading} from '../../store/pizzas/pizzasSlise';
import {fetchOnePizza, updatePizza} from '../../store/pizzas/pizzasThunks';
import {useEffect} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import PizzaForm from '../../components/PizzaForm/PizzaForm';
import {ApiPizza} from '../../types';

const EditPizza = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pizza = useAppSelector(selectPizza);
  const fetchOneLoading = useAppSelector(selectFetchOneLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);

  useEffect(() => {
    dispatch(fetchOnePizza(id));
  }, [dispatch, id]);

  const onSubmit = async (pizza: ApiPizza) => {
    await dispatch(updatePizza({id, pizza}));
    navigate('/admin/pizzas');
  };

  let formSection = <Spinner/>;

  const existingPizza = pizza ? {
    ...pizza,
    price: pizza.price.toString(),
  } : undefined;

  if (!fetchOneLoading) {
    if (pizza) {
      formSection = (
        <PizzaForm
          isEdit
          onSubmit={onSubmit}
          existingPizza={existingPizza}
          isLoading={updateLoading}
        />
      );
      } else {
      formSection = <h4>Not found</h4>;
    }
  }
  
  return (
    <div className="row mt-2">
      <div className="col">
        {formSection}
      </div>
    </div>
  );
};

export default EditPizza;
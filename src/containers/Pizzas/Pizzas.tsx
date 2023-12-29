import {useEffect} from 'react';
import {fetchPizzas} from '../../store/pizzas/pizzasThunks';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import {selectFetchLoading, selectPizzas} from '../../store/pizzas/pizzasSlise';
import Spinner from '../../components/Spinner/Spinner';
import Pizza from './Pizza';

const Pizzas = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);
  const fetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]);

  return (
    <div>
      {fetchLoading && <Spinner/>}
      {pizzas.map((pizza) => (
        <Pizza key={pizza.id} pizza={pizza}/>
      ))}
    </div>
  );
};

export default Pizzas;
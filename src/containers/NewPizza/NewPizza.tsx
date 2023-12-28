import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../api/hooks';
import {ApiPizza} from '../../types';
import PizzaForm from '../../components/PizzaForm/PizzaForm';
import {selectCreateLoading} from '../../store/pizzasSlise';
import {createPizza} from '../../store/pizzasThunks';


const NewPizza: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const creatingLoading = useAppSelector(selectCreateLoading);

  const onSubmit = async (pizza: ApiPizza) => {
   await dispatch(createPizza(pizza));
    navigate('/');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <PizzaForm onSubmit={onSubmit} isLoading={creatingLoading}/>
      </div>
    </div>
  );
};

export default NewPizza;
import {Route, Routes} from 'react-router-dom';
import NewPizza from './containers/NewPizza/NewPizza';
import EditPizza from './containers/editPizza/EditPizza';
import Pizzas from './containers/Pizzas/Pizzas';
import Layout from './components/Layout/Layout';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin/new-pizza" element={<NewPizza/>}/>
        <Route path="/admin/update-pizza/:id" element={<EditPizza/>}/>
        <Route path="/admin" element={<Pizzas/>}/>
        <Route path="/admin/pizzas" element={<Pizzas/>}/>
        <Route path="/admin/orders" element={<Orders/>}/>
        <Route path="*" element={(<h1>Not Found!</h1>)}/>
      </Routes>
    </Layout>
  );
}

export default App;

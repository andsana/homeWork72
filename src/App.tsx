import {Route, Routes} from 'react-router-dom';
import NewPizza from './containers/NewPizza/NewPizza';
import EditPizza from './containers/editPizza/EditPizza';
import Pizzas from './components/Pizzas/Pizzas';
import Layout from './components/Layout/Layout';
import Home from "./containers/Home/Home";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin/new-pizza" element={<NewPizza/>}/>
        <Route path="/admin/update-pizza/:id" element={<EditPizza/>}/>
        <Route path="/admin/pizzas" element={<Pizzas/>}/>
      </Routes>
    </Layout>
  );
}

export default App;

import {Route, Routes} from 'react-router-dom';
import NewPizza from './containers/NewPizza/NewPizza';
import EditPizza from './containers/editPizza/EditPizza';
import Navbar from './components/Navbar/Navbar';


function App() {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<Navbar/>}/>
        <Route path="/admin/new-pizza" element={<NewPizza/>}/>
        <Route path="/admin/update-pizza" element={<EditPizza/>}/>
      </Routes>
    </>
  );
}

export default App;

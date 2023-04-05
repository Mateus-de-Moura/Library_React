import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Detail from "./livroDetail/Detail";
import Registre from './Pages/Login/Registre/Registre'
import { PrivateRoute } from "./Routes/PrivateRoute";
import Car from "./Carrinho/Car";

function App() {
  return (   
     <div>     
      <Routes>
        <Route path="/" exact element={<Login />} />  
        <Route path="Detail/:Id"  element={<PrivateRoute><Detail /></PrivateRoute>} /> 
        <Route path="/Registre"  element={<Registre />} /> 
        <Route path="/Home"  element={<PrivateRoute><Home /></PrivateRoute>} />      
        <Route path="/Car"  element={<PrivateRoute><Car /></PrivateRoute>} /> 
      </Routes>
    </div>
  );
}

export default App;

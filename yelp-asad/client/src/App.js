import './App.css';
import {Route,Routes} from 'react-router-dom'
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Create from './Components/Create';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home/:token' element={<Home/>}/>
        <Route path='/create/:token' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;


import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login.jsx';
import {Register} from './components/Register'
import { Home } from './components/Home';
import { Create } from './components/Create';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home/:id' element={<Home/>}/>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/create/:id' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;

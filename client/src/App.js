import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/home/home';
import LandingPage from './components/landing-page/landing-page';
import DogDetails from './components/dog-details/dog-details'
import AddDog from './components/add-dog/add-dog';
import axios from 'axios';

axios.defaults.baseURL = "https://pi-dogs-production-38b4.up.railway.app/";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/addDog' element={<AddDog/>}/> 
        <Route path='/dogs/:id' element={<DogDetails/>}/> 
      </Routes>
    </div>
  );
}

export default App;

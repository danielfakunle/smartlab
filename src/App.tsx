import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FaceDetect from './pages/FaceDetect';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/face-detect' element={<FaceDetect />} />
        <Route path='/under-construction' element={<UnderConstruction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserContext from './context/UserContext';
import FaceDetect from './pages/FaceDetect';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UnderConstruction from './pages/UnderConstruction';
import { getUser } from './utils/authUser';

function App() {
  const { currentUser, setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;

  useEffect(() => {
    const user = getUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route
          path='/login'
          element={currentUser ? <Navigate to='/home' /> : <Login />}
        />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={currentUser ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path='/face-detect'
          element={currentUser ? <FaceDetect /> : <Navigate to='/login' />}
        />
        <Route
          path='/under-construction'
          element={
            currentUser ? <UnderConstruction /> : <Navigate to='/login' />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

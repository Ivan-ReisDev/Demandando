
// React router dom
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { useState, 
        useEffect
 } from 'react';  
 import { useAuthentication } from './hooks/useAuthentication';

//context 

import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost'

// Components 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// file css
import './App.css'

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication()

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    }, [auth])

  })

  if (loadingUser) {
    return <p> Carregando... </p>
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter >
          <Navbar />
          <div className='content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" /> } />
              <Route path='/about' element={<About />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path='/post/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App


import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Footer from './Components/GeneralComponents/Footer/Footer';
import { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import { ContextGlobal } from './Components/utils/global.context';
import Spinner from './Components/GeneralComponents/Spinner/Spinner.jsx';



function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const {loading} = useContext(ContextGlobal)

  
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
     
    }
  }, [location, navigate]);

  return (
    <div className="App">
      <Header />
      <div className='containerOutlet'>
      {loading?( <Spinner />) :<Outlet />}
      </div>
      <Footer/>
      </div>

  );
}

export default App;
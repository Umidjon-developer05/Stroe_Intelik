import Cart from './components/Cart'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
 

  return(  
    <div className='container mt-5 ' >
      <ToastContainer/>
      <Cart />
           
    </div>
  )
};
export default App;
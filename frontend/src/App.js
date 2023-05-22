
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserRouter from "./Routes/UserRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/*" element={<UserRouter/>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    );
}

export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRouter from "./Routes/UserRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRouter from './Routes/AdminRouter';
import PageNotFound from './Components/PageNotFound';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path='/admin/*' element={<AdminRouter />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

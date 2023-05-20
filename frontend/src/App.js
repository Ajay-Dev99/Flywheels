
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserRouter from "./Routes/UserRouter";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/*" element={<UserRouter/>}/>
      </Routes>

    </BrowserRouter>
    );
}

export default App;

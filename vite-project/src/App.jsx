import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login'
import Signup from "./components/Signup";
import Home from "./components/Home";
import { UserProvider } from "./context/UserContext";
import History from "./components/History";
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path="/history" element={<History/>}/>
     </Routes>
    
    </BrowserRouter>
    </UserProvider>
  )  
  }
  
  export default App
  
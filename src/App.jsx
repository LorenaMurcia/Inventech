import { Route, Routes } from "react-router-dom";
import './App.css'
import PageError from "./Pages/PageError/PageError";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import SingUp from "./Pages/SingUp";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/singup" element={<SingUp/>}/>
        {/* <Route path="/pageError" element={<PageError/>} /> */}
        <Route path="*" element={<PageError/>} />
      </Routes>
    </div>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import PageError from "./Pages/PageError/PageError";
import Home from "./Pages/Home/Home";import Login from "./Pages/Login/Login";
import Singup from "./Pages/Singup/Singup";
;


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/singup" element={<Singup/>}/>
        <Route path="*" element={<PageError/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

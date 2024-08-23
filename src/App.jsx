import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import PageError from "./Pages/PageError";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SingUp from "./Pages/SingUp";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route pat="/login" element={<Login/>}/>
        <Route pat="/singup" element={<SingUp/>}/>
        <Route pat="/pageError" element={<PageError/>}/>
      </Routes>
    </div>
  )
}

export default App

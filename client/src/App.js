// import React, { useState, useEffect } from "react";
import Navbar from './NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Sets from './Pages/Sets';
import Study from './Pages/Study';


function App() {
  // const [message, setMessage] = useState("");
  // useEffect(() => logUsers, []);
  // return (
  //   <div className="App">
  //     <h1>{message}</h1>
  //   </div>
  // );

  window.addEventListener('load', logUsers);
  return (<Router>
    <Navbar />
    <Routes>
      <Route path='/home'  element={<Home/>} />
      <Route path='/sets' element={<Sets/>} />
      <Route path='/study' element={<Study/>} />
    </Routes>
  </Router>)
}

async function logUsers() {
  const response = await fetch("http://localhost:8000/users");
  const users = await response.json();
  console.log(users);
}

export default App;


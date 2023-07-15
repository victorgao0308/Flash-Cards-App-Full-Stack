// import React, { useState, useEffect } from "react";
import Navbar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Menu from "./Pages/Menu";
import Sets from "./Pages/Sets";
import Review from "./Pages/Review";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ViewSet from "./Pages/ViewSet";

function App() {
  // const [message, setMessage] = useState("");
  // useEffect(() => logUsers, []);
  // return (
  //   <div className="App">
  //     <h1>{message}</h1>
  //   </div>
  // );

  return (
    <Router>
      <Navbar/>
      <Routes forceRefresh = {true}>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/sets" element={<Sets/>} />
        <Route path="/review" element={<Review/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/viewset" element={<ViewSet/>} />
      </Routes>
    </Router>
  );
}

export default App;

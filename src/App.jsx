import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/User/SignIn/SignIn";
import SignUp from "./Pages/User/SignUp/SignUp";
import Home from "./Pages/Home/Home";


import { ThemeProvider } from "./Context/ThemeContext";
import { useEffect, useState } from "react";
import WorkSpaceOrModal from "./Pages/WorkspaceOrModal/WorkSpaceOrModal";

function App() {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if(storedUserId){
      setUserId(storedUserId);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        { userId && (
          <ThemeProvider userId={userId}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            
            <Route path="/workspace/:userId/dashboard" element={<WorkSpaceOrModal/>} />
            
          </Routes>
        </ThemeProvider>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

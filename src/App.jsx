import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import SignIn from "./Pages/User/SignIn/SignIn";
import SignUp from "./Pages/User/SignUp/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

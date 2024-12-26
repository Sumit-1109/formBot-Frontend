import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/User/SignIn/SignIn";
import SignUp from "./Pages/User/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Settings from "./Pages/Settings/Settings";


import { ThemeProvider } from "./Context/ThemeContext";
import WorkSpaceOrModal from "./Pages/WorkspaceOrModal/WorkSpaceOrModal";
import withAuth from "./Services/withAuth";

function App() {

const token = localStorage.getItem("token");
const isAuthenticated = token ? true : false;

const ProtectedSettings = withAuth((props) => <Settings {...props} />)
const ProtectedWorkSpace = withAuth(WorkSpaceOrModal)



  return (
    <div>
      <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            {isAuthenticated ? (
              <>
              <Route path="/workspace/dashboard" element={<ThemeProvider><ProtectedWorkSpace /></ThemeProvider> } />
              <Route path="/settings" element={<ProtectedSettings />} />
              </>
          ) : (
            <Route path="/signIn" element={<SignIn />} />
          )}
            

            
          </Routes>


      </BrowserRouter>
    </div>
  );
}


export default App;

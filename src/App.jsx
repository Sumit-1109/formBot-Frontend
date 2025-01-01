import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/User/SignIn/SignIn";
import SignUp from "./Pages/User/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Settings from "./Pages/Settings/Settings";
import "react-toastify/dist/ReactToastify.css";
import Dashboardandmodal from "./Pages/Dashboardandmodal/Dashboardandmodal";


import { ThemeProvider } from "./Context/ThemeContext";
import { ToastContainer, Bounce } from "react-toastify";
import withAuth from "./Services/withAuth";
import Workspace from "./Pages/WorkSpace/WorkSpace";

function App() {

const token = localStorage.getItem("token");
const isAuthenticated = !!token;

const ProtectedSettings = withAuth((props) => <Settings {...props} />);
const ProtectedDashboard = withAuth(Dashboardandmodal);



  return (
    <div>
      <BrowserRouter>
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            {isAuthenticated ? (
              <>
              <Route path="/dashBoard" element={<ThemeProvider><ProtectedDashboard /></ThemeProvider> } />
              <Route path="/dashBoard/:dashBoardId/folder/:folderId" element={<ThemeProvider><ProtectedDashboard /></ThemeProvider>} />
              <Route path="/settings" element={<ProtectedSettings />} />
              <Route path="/workspace/:fileId" element={<ThemeProvider><Workspace/></ThemeProvider>} />
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

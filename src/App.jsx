import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./Pages/User/SignIn/SignIn";
import SignUp from "./Pages/User/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Settings from "./Pages/Settings/Settings";
import "react-toastify/dist/ReactToastify.css";


import { ThemeProvider } from "./Context/ThemeContext";
import { ToastContainer, Bounce } from "react-toastify";
import WorkSpaceOrModal from "./Pages/WorkspaceOrModal/WorkSpaceOrModal";
import withAuth from "./Services/withAuth";

function App() {

const token = localStorage.getItem("token");
const isAuthenticated = !!token;

const ProtectedSettings = withAuth((props) => <Settings {...props} />)
const ProtectedWorkSpace = withAuth(WorkSpaceOrModal)



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
              <Route path="/workspace/dashboard" element={<ThemeProvider><ProtectedWorkSpace /></ThemeProvider> } />
              <Route path="/workspace/:workspaceId/folder/:folderId" element={<ThemeProvider><ProtectedWorkSpace /></ThemeProvider>} />
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

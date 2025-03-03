import React, {useEffect} from "react";
import Landing from "./pages/landing/Landing.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SideNavBar from './pages/sideNavBar/SideNavBar.tsx'
import LoginPage from './pages/loginPage/LoginPage.tsx'
import SignupPage from "./pages/signupPage/SignupPage.tsx";
import ProjectTemplate from "./pages/projectTemplate/ProjectTemplate.tsx";
import ProjectPage from './pages/projectsPage/ProjectPage.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalContext.tsx";

function App() {

  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<SideNavBar/>}>
            <Route path='projects/' element={<ProjectPage/>}/>
            <Route path='projects/:id' element={<Dashboard/>}/>
            <Route path='createProject' element={<ProjectTemplate/>} />
          </Route>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </Router>
    </GlobalProvider>

  );
}

export default App;

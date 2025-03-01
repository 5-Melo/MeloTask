import React, {useEffect} from "react";
import Landing from "./pages/landing/Landing.tsx";
import SigninPage from './pages/signinPage/SigninPage.tsx'
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SideNavBar from './pages/sideNavBar/SideNavBar.tsx'
import SignupPage from "./pages/signupPage/SignupPage.tsx";
import ProjectTemplate from "./pages/projectTemplate/ProjectTemplate.tsx";
import ProjectPage from './pages/projectsPage/ProjectPage.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<SideNavBar pages={{ 'Dashboard': Dashboard, 'Project Template':ProjectTemplate, 'Projects':ProjectPage}} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </Router>
  );
}

export default App;

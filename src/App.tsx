import React, { useEffect } from "react";
import Landing from "./pages/landing/Landing.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SideNavBar from './pages/sideNavBar/SideNavBar.tsx'
import LoginPage from './pages/loginPage/LoginPage.tsx'
import SignupPage from "./pages/signupPage/SignupPage.tsx";
import ProjectTemplate from "./pages/projectTemplate/ProjectTemplate.tsx";
import ProjectPage from './pages/projectsPage/ProjectPage.tsx'
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalContext.tsx";
import IssuePopup from "./components/issuePopup/IssuePopup.tsx";
import AccountPage from "./pages/accountPage/AccountPage.tsx";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          
          {/* Auth routes - protected from authenticated users */}
          <Route path="/login" element={
            <ProtectedRoute authRequired={false}>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute authRequired={false}>
              <SignupPage />
            </ProtectedRoute>
          } />

          {/* Protected routes - require authentication */}
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <SideNavBar />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/projects" />} />
            <Route path="project/:id" element={<Dashboard />} />
            <Route path="projectSettings" element={<ProjectTemplate isEditMode={true} />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/landing" />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;

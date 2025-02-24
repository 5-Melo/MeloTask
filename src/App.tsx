import React from "react";
import Landing from "./pages/landing/Landing.tsx";
import SideNavBar from "./pages/sideNavBar/SideNavBar.tsx";
import SigninPage from './pages/signinPage/SigninPage.tsx'
import Dashboard from "./pages/dashboard/Dashboard.tsx";

function App() {
  return (
    <div>
      {/* These are only examples and each page should correspond to its correct component */}
      <SideNavBar pages={{ "Dashboard": Dashboard,"Projects":Landing}}/>
      {/* <SigninPage/> */}
    </div>
  );
}

export default App;

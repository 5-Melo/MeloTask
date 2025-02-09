import React from "react";
import Landing from "./pages/landing/Landing.tsx";
import SideNavBar from "./pages/sideNavBar/SideNavBar.tsx";

function App() {
  return (
    <div>
      {/* These are only examples and each page should correspond to its correct component */}
      <SideNavBar pages={{"Dashboard":Landing,"Projects":Landing}}/>
    </div>
  );
}

export default App;

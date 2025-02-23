import { HashRouter, Route, Routes } from "react-router-dom";

import Week1 from "./pages/Week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Navbar from "./components/Navbar";

const navLinks = [
  { label: "Week2", path: "/Week2/" },
  { label: "Week3", path: "/Week3/" },
  { label: "Week4", path: "/Week4/" },
  { label: "Week5", path: "/Week5/" },
];
function App() {
  return (
    <div className="pt-20 bg-neutral-bg h-screen overflow-auto">
      <HashRouter>
        <Navbar links={navLinks} />
        <Routes>
          <Route index path="/Week1" element={<Week1 />} />
          <Route path="/Week2/*" element={<Week2 />} />
          <Route path="/Week3" element={<Week3 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

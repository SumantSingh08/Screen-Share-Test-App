import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import ScreenTest from "./pages/ScreenTest";
import "./App.css";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen-test" element={<ScreenTest />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
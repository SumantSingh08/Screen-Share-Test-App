import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ScreenTest from "./pages/ScreenTest";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen-test" element={<ScreenTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
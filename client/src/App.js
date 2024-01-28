import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Download from "./components/Download";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/files/:uuid" element={<Download />} />
      </Routes>
    </Router>
  );
}

export default App;

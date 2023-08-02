import "./App.css";
import Main from "./Components/Main/Main";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;

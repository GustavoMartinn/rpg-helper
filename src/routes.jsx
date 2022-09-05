import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Jogador from "./pages/Jogador";
import Mestre from "./pages/Mestre";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Jogador />} />
        <Route path="/mestre" element={<Mestre />} />
      </Routes>
    </Router>
  );
}

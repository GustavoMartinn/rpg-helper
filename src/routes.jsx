import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inventario from "./pages/Inventario";
import Jogador from "./pages/Jogador";
import Mestre from "./pages/Mestre";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Jogador />} />
        <Route path="/mestre" element={<Mestre />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="*" element={<h1 style={{ margin: "16px" }}>404</h1>} />
      </Routes>
    </Router>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./layout/PublicLayout";
import Inicio from "./pages/PublicPages/Inicio";
import Nosotros from "./pages/PublicPages/Nosotros";

import MenuLayout from "./layout/MenuLayout";
import Calendario from "./pages/MenuPages/Calendario";

import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/Register";
import ConfirmUser from "./pages/AuthPages/ConfirmUser";

import Calendar from "./pages/AdminPages/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Inicio />}/>
          <Route path="nosotros" element={<Nosotros />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="/menu" element={<MenuLayout />}>
          <Route index element={<Calendario />}/>
          <Route path="*" element={<Navigate to="/menu" />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Login />}/>
          <Route path="registrar" element={<Register />}/>
          <Route path="confirmar/:id" element={<ConfirmUser />}/>
          <Route path="*" element={<Navigate to="/auth" />} />
        </Route>

        <Route path="/admin" element={<MenuLayout />}>
          <Route index element={<Login />}/>
          <Route path="calendar" element={<Calendar />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

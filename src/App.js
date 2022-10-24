import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddPersona from "./components/AddPersona";
import Persona from "./components/Persona";
import PersonaList from "./components/PersonaList";
import LogList from "./components/LogList";
import MocionList from "./components/MocionList";
import Mocion from "./components/Mocion";
import AddMocion from "./components/AddMocion";
import TipoMocionList from "./components/TipoMocionList";
import TipoMocion from "./components/TipoMocion";
import AddTipoMocion from "./components/AddTipoMocion";
import AddPersonaMocion from "./components/AddPersonaMocion";
import PersonaMocionList from "./components/PersonaMocionList";
import PersonaMocion from "./components/PersonaMocion";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/personas" className="navbar-brand">
          UNA
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/personas"} className="nav-link">
              Lista de Personas
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Agregar Persona
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/logs"} className="nav-link">
              Ver Logs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/mociones"} className="nav-link">
              Ver Mociones
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/MocionAdd"} className="nav-link">
              Agregar Mocion
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/tipomociones"} className="nav-link">
              Ver Tipos de Mociones
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/TipoMocionAdd"} className="nav-link">
              Agregar Tipo de Mocion
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/personamociones"} className="nav-link">
              Ver Personas y Mociones
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/PersonaMocionAdd"} className="nav-link">
              Agregar Persona y Mocion
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<PersonaList />} />
          <Route path="/personas" element={<PersonaList />} />
          <Route path="/add" element={<AddPersona />} />
          <Route path="/personas/:id" element={<Persona />} />
          <Route path="/logs" element={<LogList />} />
          <Route path="/mociones" element={<MocionList />} />
          <Route path="/Mocion/:id" element={<Mocion />} />
          <Route path="/MocionAdd" element={<AddMocion />} />
          <Route path="/tipomociones" element={<TipoMocionList />} />
          <Route path="/tipomocion/:id" element={<TipoMocion />} />
          <Route path="/tipomocionadd" element={<AddTipoMocion />} />
          <Route path="/personamocionadd" element={<AddPersonaMocion />} />
          <Route path="/personamociones" element={<PersonaMocionList />} />
          <Route path="/personamocion/:id" element={<PersonaMocion />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

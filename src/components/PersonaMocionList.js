import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonaMocionService from "../Services/PersonaMocionService";

const PersonaMocionList = () => {
  const [personamociones, setpersonamociones] = useState([]);
  const [currentPersonaMocion, setCurrentPersonaMocion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrievepersonamociones();
  }, []);

  const retrievepersonamociones = () => {
    PersonaMocionService.getAll()
      .then((response) => {
        setpersonamociones(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrievepersonamociones();
    setCurrentPersonaMocion(null);
    setCurrentIndex(-1);
  };
  const setActivePersonaMocion = (PersonaMocion, index) => {
    setCurrentPersonaMocion(PersonaMocion);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de personamociones</h4>
        <ul className="list-group">
          {personamociones &&
            personamociones.map((PersonaMocion, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePersonaMocion(PersonaMocion, index)}
                key={index}
              >
                {PersonaMocion.persona.nombre}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentPersonaMocion ? (
          <div>
            <h4>Persona Mocion</h4>
            <div>
              <label>
                <strong>Persona:</strong>
              </label>{" "}
              {currentPersonaMocion.persona?(currentPersonaMocion.persona.nombre):("No hay Persona")}
            </div>
            <div>
              <label>
                <strong>Mocion:</strong>
              </label>{" "}
              {currentPersonaMocion.mocion?(currentPersonaMocion.mocion.texto):("No hay mocion")}
            </div>

            
            <Link to={"/PersonaMocion/" + currentPersonaMocion.id} className="btn-success">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Escoja una PersonaMocion.</p>
          </div>
        )}
      </div>
    </div>

  );
};
export default PersonaMocionList;

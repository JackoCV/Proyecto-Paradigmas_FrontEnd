import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MocionService from "../Services/MocionService";

const MocionList = () => {
  const [mociones, setmociones] = useState([]);
  const [currentMocion, setCurrentMocion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrievemociones();
  }, []);

  const retrievemociones = () => {
    MocionService.getAll()
      .then((response) => {
        setmociones(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrievemociones();
    setCurrentMocion(null);
    setCurrentIndex(-1);
  };
  const setActiveMocion = (Mocion, index) => {
    setCurrentMocion(Mocion);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de mociones</h4>
        <ul className="list-group">
          {mociones &&
            mociones.map((Mocion, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveMocion(Mocion, index)}
                key={index}
              >
                {Mocion.texto}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentMocion ? (
          <div>
            <h4>Mocion</h4>
            <div>
              <label>
                <strong>Texto:</strong>
              </label>{" "}
              {currentMocion.texto}
            </div>
            <div>
              <label>
                <strong>Tipo:</strong>
              </label>{" "}
              {currentMocion.tipo?(currentMocion.tipo.descripcion):("No hay tipo")}
            </div>
            <div> 
              <label>
                <strong>Fecha:</strong>
              </label>{" "}
              {currentMocion.fecha}
            </div>
            
            <Link to={"/Mocion/" + currentMocion.id} className="btn-success">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Escoja una Mocion.</p>
          </div>
        )}
      </div>
    </div>
  );

};
export default MocionList;

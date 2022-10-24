import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TipoMocionService from "../Services/TipoMocionService";
 
const TipoMocionList = () => {
  const [tipomociones, settipomociones] = useState([]);
  const [currentTipoMocion, setCurrentTipoMocion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrievetipomociones();
  }, []);

  const retrievetipomociones = () => {
    TipoMocionService.getAll()
      .then((response) => {
        settipomociones(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrievetipomociones();
    setCurrentTipoMocion(null);
    setCurrentIndex(-1);
  };
  const setActiveTipoMocion = (TipoMocion, index) => {
    setCurrentTipoMocion(TipoMocion);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de tipomociones</h4>
        <ul className="list-group">
          {tipomociones &&
            tipomociones.map((TipoMocion, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTipoMocion(TipoMocion, index)}
                key={index}
              >
                {TipoMocion.descripcion}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTipoMocion ? (
          <div>
            <h4>TipoMocion</h4>
            <div>
              <label>
                <strong>Descripcion:</strong>
              </label>{" "}
              {currentTipoMocion.descripcion}
            </div>
            
            <Link to={"/TipoMocion/" + currentTipoMocion.id} className="btn-success">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Escoja una Tipo Mocion.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TipoMocionList;

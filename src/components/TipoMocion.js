import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TipoMocionService from "../Services/TipoMocionService";
const TipoMocion = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialTipoMocionState = {
    id: null,
    descripcion: "",
  };
  const [currentTipoMocion, setCurrentTipoMocion] = useState(initialTipoMocionState);
  const [message, setMessage] = useState("");
  const getTipoMocion = (id) => {
    TipoMocionService.get(id)
      .then((response) => {
        setCurrentTipoMocion(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id) getTipoMocion(id);
  }, [id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTipoMocion({ ...currentTipoMocion, [name]: value });
  };

  const updateTipoMocion = () => {
    TipoMocionService.create(currentTipoMocion)
      .then((response) => {
        console.log(response.data);
        setMessage("La mocion fue actualizada");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteTipoMocion = () => {
    TipoMocionService.remove(currentTipoMocion.id)
      .then((response) => {
        console.log(response.data);
        navigate("/tipomociones");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentTipoMocion ? (
        <div className="edit-form">
          <h4>TipoMocion</h4>
          <form>
            <div className="form-group">
              <label htmlFor="identidicacion">Identificacion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={currentTipoMocion.descripcion}
                onChange={handleInputChange}
              />
            </div>
           
          </form>

          <button className="btn btn-danger" onClick={deleteTipoMocion}>
            Borrar
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateTipoMocion}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Seleccione un tipo de mocion.</p>
        </div>
      )}
    </div>
  );
};
export default TipoMocion;

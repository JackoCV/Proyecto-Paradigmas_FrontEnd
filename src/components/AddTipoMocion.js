import React, { useState } from "react";
import TipoMocionService from "../Services/TipoMocionService";
const AddTipoMocion = () => {
  const initialTipoMocionState = {
    id: null,
    descripcion: "",

  };
  const [tipomocion, setTipoMocion] = useState(initialTipoMocionState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTipoMocion({ ...tipomocion, [name]: value });
  };
  const saveTipoMocion = () => {
    var data = {
      descripcion: tipomocion.descripcion,
    };
    TipoMocionService.create(data)
      .then((response) => {
        setTipoMocion({
          descripcion: response.data.descripcion,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newTipoMocion = () => {
    setTipoMocion(initialTipoMocionState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Almacenado Corretamente</h4>
          <button className="btn btn-success" onClick={newTipoMocion}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripcion</label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              required
              value={tipomocion.descripcion}
              onChange={handleInputChange}
              name="descripcion"
            />
          </div>
          <button onClick={saveTipoMocion} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTipoMocion;

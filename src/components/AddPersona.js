import React, { useState } from "react";
import PersonaDataService from "../Services/PersonaService";
const AddPersona = () => {
  const initialPersonaState = {
    id: null,
    identificacion: "",
    persona: "",

  };
  const [persona, setPersona] = useState(initialPersonaState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPersona({ ...persona, [name]: value });
  };
  const savePersona = () => {
    var data = {
      identificacion: persona.identificacion,
      nombre: persona.nombre,
    };
    PersonaDataService.create(data)
      .then((response) => {
        setPersona({
          identificacion: response.data.identificacion,
          nombre: response.data.nombre,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newPersona = () => {
    setPersona(initialPersonaState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Almacenado Corretamente</h4>
          <button className="btn btn-success" onClick={newPersona}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="identificacion">Identificacion</label>
            <input
              type="text"
              className="form-control"
              id="identificacion"
              required
              value={persona.identificacion}
              onChange={handleInputChange}
              name="identificacion"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={persona.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>   
          <button onClick={savePersona} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};
export default AddPersona;

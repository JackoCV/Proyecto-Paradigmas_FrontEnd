import React, { useState, useEffect } from "react";
import MocionService from "../Services/MocionService";
import TipoMocionService from "../Services/TipoMocionService";

const AddMocion = () => {
  const initialMocionState = {
    id: null,
    texto: "",
    mocion: "",

  };
  const initialTipoMocion ={
    id:null,
    descripcion:""
  }
  const [mocion, setMocion] = useState(initialMocionState);
  const [submitted, setSubmitted] = useState(false);
  const [currentTipoMocion, setCurrentTipoMocion] = useState(initialTipoMocion);
  const [tipoMociones, settipoMociones] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMocion({ ...mocion, [name]: value });
  };
  const saveMocion = () => {
    var data = {
      texto: mocion.texto,
      fecha: mocion.fecha,
    };
    MocionService.create(data,currentTipoMocion.id)
      .then((response) => {
        setMocion({
          texto: response.data.texto,
          fecha: response.data.fecha,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let valores = tipoMociones.map((tipoMocion, index)=> {
    return (
    console.log(tipoMocion),
    <option key={index} value={tipoMocion.id}>
      
      {tipoMocion.descripcion}
    </option>
    );
    
  },this);

  useEffect(() => {
    retrievetipoMociones();
  }, []);

  
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setCurrentTipoMocion({ ...currentTipoMocion, [name]: value });
  };
  const newMocion = () => {
    setMocion(initialMocionState);
    setSubmitted(false);
  };
  const retrievetipoMociones = () => {
    TipoMocionService.getAll()
      .then((response) => {
        settipoMociones(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Almacenado Corretamente</h4>
          <button className="btn btn-success" onClick={newMocion}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="texto">Texto</label>
            <input
              type="text"
              className="form-control"
              id="texto"
              required
              value={mocion.texto}
              onChange={handleInputChange}
              name="texto"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              required
              value={mocion.fecha}
              onChange={handleInputChange}
              name="fecha"
            />
          </div>   
          <div className="form-group"> 
              <label htmlFor="id">Tipo</label>
              <select name = "id" id="id" placeholder="seleccione una opcion"  onChange={handleInputChange2}>
              <option value= "0" >escoja</option>
                {valores}
              </select>
            </div>
          <button onClick={saveMocion} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};
export default AddMocion;

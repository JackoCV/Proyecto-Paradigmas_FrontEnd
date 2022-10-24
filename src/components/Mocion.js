import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MocionService from "../Services/MocionService";
import TipoMocionService from "../Services/TipoMocionService";

const Mocion = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialMocionState = {
    id: null,
    texto: "",
    fecha: false,
    tipom:  null,
  };
  const initialTipoMocion ={
    id:null,
    descripcion:""
  }
  const [tipoMociones, settipoMociones] = useState([]);
  const [currentMocion, setCurrentMocion] = useState(initialMocionState);
  const [currentTipoMocion, setCurrentTipoMocion] = useState(initialTipoMocion);
  const [message, setMessage] = useState("");



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

  let valores = tipoMociones.map((tipoMocion, index)=> {
    return (
    console.log(tipoMocion),
    <option key={index} value={tipoMocion.id}>
      
      {tipoMocion.descripcion}
    </option>
    );
    
  },this);

  const setActiveMocion = (Mocion) => {
    setCurrentMocion(Mocion);
  };

    
  const getMocion = (id) => {
    MocionService.get(id)
      .then((response) => {
        setCurrentMocion(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    
    if (id) getMocion(id);
    retrievetipoMociones();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentMocion({ ...currentMocion, [name]: value });
    
  };


  const updateMocion = () => {
    MocionService.edit(currentMocion,currentMocion.tipom)
      .then((response) => {
        console.log(response.data);
        setMessage("La mocion fue actualizada");
      })
      .catch((e) => {     
        console.log(e);
      });
  };

  const deleteMocion = () => {
    MocionService.remove(currentMocion.id)
      .then((response) => {
        console.log(response.data);
        navigate("/Mocion");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentMocion ? (
        <div className="edit-form">
          <h4>Mocion</h4>
          <form>
            <div className="form-group">
              <label htmlFor="identidicacion">Identificacion</label>
              <input
                type="text"
                className="form-control"
                id="texto"
                name="texto"
                value={currentMocion.texto}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                name="fecha"
                value={currentMocion.fecha}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group"> 
              <label htmlFor="id">Tipo</label>
              <select name = "tipom" id="tipom" placeholder="seleccione una opcion"  onChange={handleInputChange}>
              <option value= "0" >escoja</option>
                {valores}
              </select>
            </div>

          </form>

          <button className="btn btn-danger" onClick={deleteMocion}>
            Borrar
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateMocion}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Seleccione una mocion.</p>
        </div>
      )}
    </div>
  );
};
export default Mocion;

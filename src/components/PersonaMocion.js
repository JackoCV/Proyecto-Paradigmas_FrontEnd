import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MocionService from "../Services/MocionService";
import PersonaService from "../Services/PersonaService";
import Persona from "./Persona";
import Mocion from "./Mocion";
import TipoMocion from "./TipoMocion";
import PersonaMocionService from "../Services/PersonaMocionService";

const PersonaMocion = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialMocionState = {
    id: null,
    texto: "",
    tipo: TipoMocion,
    fecha: false,
  };
  const initialPersonaState ={
    id: null,
    identificacion: "",
    nombre: "",
  };
  const initialPersonaMocionState ={
    id: null,
    persona: Persona,
    mocion: Mocion,
    };
  const [Mociones, setMociones] = useState([]);
  const [Personas, setPersonas] = useState([]);
  const [currentPersonaMocion, setCurrentPersonaMocion] = useState(initialPersonaMocionState);
  const [currentMocion, setCurrentMocion] = useState(initialMocionState)
  const [currentPersona, setCurrentPersona] = useState(initialPersonaState);
  const [message, setMessage] = useState("");



  const retrieveMociones = () => {
    MocionService.getAll()
      .then((response) => {
        setMociones(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrievePersonas = () => {
    PersonaService.getAll()
      .then((response) => {
        setPersonas(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let valoresMocion = Mociones.map((Mocion,index)=> {
    return (
    
    <option key={index} value={Mocion.id}>
      
      {Mocion.texto}
    </option>
    )
    
  },this);

  let valoresPersona = Personas.map((Persona,index)=> {
    return (
    <option key={index} value={Persona.id}>
      
      {Persona.nombre}
    </option>
    )
    
  },this);
    
  const getPersonaMocion = (id) => {

    PersonaMocionService.get(id)
      .then((response) => {
        setCurrentPersonaMocion(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    
    if (id) getPersonaMocion(id);
    retrieveMociones();
    retrievePersonas();
    
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPersonaMocion({ ...currentPersonaMocion, [name]: value });
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setCurrentMocion({ ...currentMocion, [name]: value });
  };

  const handleInputChange3 = (event) => {
    const { name, value } = event.target;
    setCurrentPersona({ ...currentPersona, [name]: value });
  };

  const updateMocion = () => {
    PersonaMocionService.create(currentPersona.id,currentMocion.id)
      .then((response) => {
        console.log(response.data);
        setMessage("La mocion fue actualizada");
      })
      .catch((e) => {     
        console.log(e);
      });
  };

  const deleteMocion = () => {
    PersonaMocionService.remove(currentPersonaMocion.id)
      .then((response) => {
        console.log(response.data);
        navigate("/PersonaMocionList");
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
              <label htmlFor="persona">Persona</label>
              <select name = "persona" id="persona" select={currentPersona.id} placeholder="seleccione una opcion"  onChange={handleInputChange3}>
              <option>Seleccione una opcion</option>
                {valoresPersona}
              </select>
            </div>
            
            <div className="form-group"> 
              <label htmlFor="mocion">Mocion</label>
              <select name = "mocion" id="mocion" select={currentMocion.id} placeholder="seleccione una opcion"  onChange={handleInputChange2}>
              <option>Seleccione una opcion</option>
                {valoresMocion}
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
export default PersonaMocion;

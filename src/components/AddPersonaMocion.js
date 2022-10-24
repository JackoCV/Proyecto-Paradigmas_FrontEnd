import React, { useState, useEffect } from "react";
import MocionService from "../Services/MocionService";
import PersonaService from "../Services/PersonaService";
import Persona from "./Persona";
import Mocion from "./Mocion";
import TipoMocion from "./TipoMocion";
import PersonaMocionService from "../Services/PersonaMocionService";

const AddPersonaMocion = () => {
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
  const [personamocion, setPersonaMocion] = useState(initialPersonaMocionState);
  const [submitted, setSubmitted] = useState(false);
  const [currentMocion, setCurrentMocion] = useState(initialMocionState)
  const [currentPersona, setCurrentPersona] = useState(initialPersonaState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPersonaMocion({ ...personamocion, [name]: value });
  };
  const createPersonaMocion = () => {
    PersonaMocionService.create(currentPersona.id,currentMocion.id)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
        
      })
      .catch((e) => {     
        console.log(e);
      });
  };
  
  const newPersonaMocion = () => {
    setPersonaMocion(initialPersonaMocionState);
    setSubmitted(false);
  };


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


  useEffect(() => {
    retrieveMociones();
    retrievePersonas();
  }, []);

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setCurrentMocion({ ...currentMocion, [name]: value });
  };

  const handleInputChange3 = (event) => {
    const { name, value } = event.target;
    setCurrentPersona({ ...currentPersona, [name]: value });
  };
  
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Almacenado Correctamente</h4>
          <button className="btn btn-success" onClick={newPersonaMocion}>
            Agregar
          </button>
        </div>
      ) : (
        <div>
           <div className="form-group"> 
              <label htmlFor="id">Persona</label>
              <select name = "id" id="id"  placeholder="seleccione una opcion"  onChange={handleInputChange3}>
              <option>Seleccione una opcion</option>
                {valoresPersona}
              </select>
            </div>
            
            <div className="form-group"> 
              <label htmlFor="id">Mocion</label>
              <select name = "id" id="id"  placeholder="seleccione una opcion"  onChange={handleInputChange2}>
              <option>Seleccione una opcion</option>
                {valoresMocion}
              </select>
            </div>

          <button  onClick={createPersonaMocion} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};
export default AddPersonaMocion;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ObservationsCard = () => {
  const { id } = useParams();
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (id) {
      setObservations("Observación cargada desde la API para editar");
    }
  }, [id]);

  const handleInputChange = (e) => {
    setObservations(e.target.value);
  };

  const handleSave = () => {
    if (id) {
      console.log(`Actualizando observación con ID: ${id}`);
    } else {
      console.log("Creando nueva observación");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title">{id ? "Editar Observaciones" : "Crear Observaciones"}</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Escribe tus observaciones aquí..."
            value={observations}
            onChange={handleInputChange}
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleSave}>
              {id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationsCard;

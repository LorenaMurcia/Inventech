import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getAllEstadoEquipos } from "../Servicios/estado_equipos";
import { createTraza } from "../Servicios/traza_mantenimiento";
import Swal from "sweetalert2";

const ObservationsCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serial = queryParams.get("serial");

  const [estadoOptions, setEstadoOptions] = useState([]);
  const [formData, setFormData] = useState({
    estado: "",
    observations: "",
    fecha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await getAllEstadoEquipos();
        setEstadoOptions(data);
      } catch (error) {
        console.error("Error fetching estados:", error);
      }
    };
    fetchEstados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fecha_recepcion") {
      const today = new Date().toISOString().split("T")[0];
      setError(value > today ? "La fecha de mantenimiento no puede ser superior al día de hoy." : "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (title, text, icon, callback) => {
    Swal.fire({ title, text, icon, confirmButtonText: "Aceptar" }).then((result) => {
      if (result.isConfirmed && callback) callback();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) return;
    console.log("serial", serial);

    setLoading(true);
    try {
      const body = {
        id_mantenimiento: id,
        serial: serial,
        id_estado: formData.estado,
        descripcion: formData.observations,
        fecha: formData.fecha_recepcion,
      };
      const response = await createTraza(body);
      if (response) {
        showAlert("Mantenimiento creado", "", "success", () => (window.location.href = "/maintenance"));
        setFormData({ estado: "", observations: "", fecha: "" });
      }
    } catch (err) {
      console.error("Error creating traza:", err);
      showAlert("Error", "Hubo un problema al crear el mantenimiento.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 p-4">
      <div className="container mx-auto p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Crear Observaciones</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Estado</span>
                </label>
                <select
                  name="estado"
                  className="select select-bordered w-full"
                  value={formData.estado}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>
                    Selecciona un estado
                  </option>
                  {estadoOptions.map(({ id_estado, descripcion }) => (
                    <option key={id_estado} value={id_estado}>
                      {descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control mb-4">
                <label className="label" htmlFor="diagnostico_inicial">
                  <span className="label-text">Observaciones del mantenimiento</span>
                </label>
                <textarea
                  id="diagnostico_inicial"
                  name="observations"
                  className="textarea textarea-bordered"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Escribe tus observaciones aquí..."
                  required></textarea>
              </div>

              <div className="form-control mb-4">
                <label className="label" htmlFor="fecha_recepcion">
                  <span className="label-text">Fecha de mantenimiento</span>
                </label>
                <input
                  type="date"
                  id="fecha_recepcion"
                  name="fecha_recepcion"
                  className="input input-bordered"
                  value={formData.fecha_recepcion}
                  onChange={handleChange}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="form-control text-center mt-6">
                <button type="submit" className="btn btn-primary" disabled={!!error || loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationsCard;

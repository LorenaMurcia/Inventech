import { useEffect, useState } from "react";
import { getAllEquipos } from "../Servicios/equipos";
import { createMantenimiento } from "../Servicios/mantenimientos";
import Swal from "sweetalert2";

const NewMaintenance = () => {
  const [serialOptions, setSerialOptions] = useState([]);
  const [formData, setFormData] = useState({
    serial: "",
    diagnostico_inicial: "",
    fecha_recepcion: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const equipos = await getAllEquipos();
        const serials = equipos.map((equipo) => equipo.serial);
        setSerialOptions(serials);
      } catch (error) {
        console.error("Error fetching equipos:", error);
      }
    };
    fetchEquipos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fecha_recepcion") {
      const today = new Date().toISOString().split("T")[0];
      if (value > today) {
        setError("La fecha de recepción no puede ser superior al día de hoy.");
      } else {
        setError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!error) {
      setLoading(true);

      try {
        const response = await createMantenimiento(formData);
        if (response) {
          Swal.fire({
            title: "Mantenimiento creado",
            icon: "success",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/maintenance";
            }
          });
          setFormData({
            serial: "",
            diagnostico_inicial: "",
            fecha_recepcion: "",
          });
        }
      } catch (err) {
        console.log("🚀 ~ handleSubmit ~ err:", err)
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al crear el mantenimiento.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 p-4">
      <div className="container mx-auto p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Nuevo Mantenimiento</h2>
            <form onSubmit={handleSubmit}>
              {/* Serial */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Serial</span>
                </label>
                <select
                  name="serial"
                  className="select select-bordered w-full"
                  value={formData.serial}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>
                    Selecciona un serial
                  </option>
                  {serialOptions.map((serial, index) => (
                    <option key={index} value={serial}>
                      {serial}
                    </option>
                  ))}
                </select>
              </div>

              {/* Diagnóstico Inicial */}
              <div className="form-control mb-4">
                <label className="label" htmlFor="diagnostico_inicial">
                  <span className="label-text">Diagnóstico Inicial</span>
                </label>
                <textarea
                  id="diagnostico_inicial"
                  name="diagnostico_inicial"
                  className="textarea textarea-bordered"
                  value={formData.diagnostico_inicial}
                  onChange={handleChange}
                  placeholder="Escribe el diagnóstico inicial"
                  required></textarea>
              </div>

              {/* Fecha de Recepción */}
              <div className="form-control mb-4">
                <label className="label" htmlFor="fecha_recepcion">
                  <span className="label-text">Fecha de Recepción</span>
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

              {/* Botón de enviar */}
              <div className="form-control text-center mt-6">
                <button type="submit" className="btn btn-primary" disabled={!!error || loading}>
                  Guardar Mantenimiento
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMaintenance;

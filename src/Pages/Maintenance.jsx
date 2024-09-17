import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMantenimientos, updateMantenimiento, deleteMantenimiento } from "../Servicios/mantenimientos";
import { getAllTrazas, updateTraza } from "../Servicios/traza_mantenimiento";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const dateFormatString = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const filterMaintenances = (maintenances, searchTerm) =>
  maintenances.filter(
    (maintenance) =>
      (maintenance.serial && maintenance.serial.includes(searchTerm)) ||
      (maintenance.observations &&
        maintenance.observations.some(
          (obs) =>
            (obs.observation && obs.observation.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (obs.date && obs.date.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
  );

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [editingObservationId, setEditingObservationId] = useState(null);
  const [editingObservationIdTraza, setEditingObservationIdTraza] = useState(null);
  const [editObservationText, setEditObservationText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;

  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const mantenimientos = await getAllMantenimientos();
        const traza = await getAllTrazas();

        const maintenancesWithObservations = mantenimientos.map((e) => {
          const maintenanceObservations = [
            {
              observation: e.diagnostico_inicial,
              date: dateFormatString(e.fecha_recepcion),
              id_traza: 0,
            },
          ];

          const relatedTraza = traza.filter((t) => t.id_mantenimiento === e.id_mantenimiento);
          relatedTraza.forEach((t) => {
            maintenanceObservations.push({
              observation: t.descripcion,
              date: dateFormatString(t.fecha),
              id_traza: t.id_traza,
            });
          });

          return {
            id: e.id_mantenimiento,
            serial: e.serial,
            date: e.fecha_recepcion,
            observations: maintenanceObservations,
          };
        });
        setMaintenances(maintenancesWithObservations);
      } catch (error) {
        console.error("Error fetching mantenimientos:", error);
      }
    };
    fetchMaintenances();
  }, []);

  const handleEditClick = (obsId, currentObservation, trazaId) => {
    setEditingObservationId(obsId);
    setEditingObservationIdTraza(trazaId);
    setEditObservationText(currentObservation);
  };

  const handleSaveClick = async (maintenanceId) => {
    try {
      const newObservation = editObservationText;

      if (editingObservationIdTraza === 0) {
        await updateMantenimiento(maintenanceId, {
          diagnostico_inicial: newObservation,
        });
      } else {
        await updateTraza(editingObservationIdTraza, {
          descripcion: newObservation,
        });
      }
      setMaintenances((prevMaintenances) => {
        const updatedMaintenances = prevMaintenances.map((maintenance) => {
          if (maintenance.id === maintenanceId) {
            const updatedObservations = maintenance.observations.map((obs) => {
              if (obs.id_traza === editingObservationIdTraza) {
                return { ...obs, observation: newObservation };
              }
              return obs;
            });
            return { ...maintenance, observations: updatedObservations };
          }
          return maintenance;
        });
        return updatedMaintenances;
      });
      setEditingObservationId(null);
      setEditingObservationIdTraza(null);
    } catch (error) {
      console.error("Error al guardar el mantenimiento:", error);
    }
  };

  const handleDeleteClick = async (maintenanceId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar este mantenimiento?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteMantenimiento(maintenanceId);
        setMaintenances((prevMaintenances) =>
          prevMaintenances.filter((maintenance) => maintenance.id !== maintenanceId)
        );
        Swal.fire("Eliminado", "El mantenimiento ha sido eliminado.", "success");
      } catch (error) {
        console.error("Error al eliminar el mantenimiento:", error);
        Swal.fire("Error", "Hubo un problema al eliminar el mantenimiento.", "error");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredMaintenances = filterMaintenances(maintenances, searchTerm);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMaintenances.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredMaintenances.length / recordsPerPage);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Historial de Mantenimientos de Computadores</h1>

      <div className="mb-10">
        <input
          type="text"
          placeholder="Buscar por fecha u observación"
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {role !== 3 && (
        <div className="text-center mb-5">
          <Link className="btn btn-primary" to="/maintenance/new">
            Nuevo mantenimiento
          </Link>
        </div>
      )}

      <div className="space-y-8">
        {currentRecords.map((maintenance) => (
          <div key={maintenance.id} className="card bg-base-100 shadow-xl">
            <div className="card-body relative">
              {/* <button
                className="absolute right-10 top-4 transition-transform hover:scale-105"
                onClick={() => handleDeleteClick(maintenance.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button> */}
              <h2 className="card-title">Mantenimiento del equipo {maintenance.serial}</h2>
              <ul className="timeline timeline-vertical">
                {maintenance.observations.map((obs, index) => (
                  <li key={index}>
                    {index !== 0 && <hr />}
                    <div className="timeline-start">{obs.date}</div>
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="timeline-end timeline-box flex items-center">
                      {editingObservationId === maintenance.id && editingObservationIdTraza === obs.id_traza ? (
                        <>
                          <input
                            type="text"
                            value={editObservationText}
                            onChange={(e) => setEditObservationText(e.target.value)}
                            className="input input-sm input-bordered w-full max-w-xs"
                          />
                          <button
                            className="ml-2 transition-transform hover:scale-105"
                            onClick={() => handleSaveClick(maintenance.id, obs.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          {obs.observation}
                          {role !== 3 && (
                            <button
                              className="ml-2 transition-transform hover:scale-105"
                              onClick={() => handleEditClick(maintenance.id, obs.observation, obs.id_traza ?? 0)}>
                              <svg
                                className="stroke-0"
                                width="24px"
                                height="24px"
                                viewBox="0 -0.5 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z"
                                  stroke="#102f4c"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z"
                                  fill="#102f4c"
                                />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {index !== maintenance.observations.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
              {role !== 3 && (
                <Link to={`/observations/${maintenance.id}?serial=${maintenance.serial}`} className="btn btn-primary">
                  Nueva Observación
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${currentPage === index + 1 ? "btn-active" : ""}`}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([
    {
      id: "1",
      name: "Computador 1",
      observations: [
        {
          observation: "Se limpió el ventilador y se aplicó pasta térmica.",
          date: "2024-08-28",
          id: "1",
        },
        {
          observation: "Se actualizó el sistema operativo a la última versión.",
          date: "2024-08-31",
          id: "2",
        },
      ],
    },
    {
      id: 2,
      name: "Computador 2",
      observations: [
        {
          observation: "Se reemplazó el disco duro por un SSD.",
          date: "2024-08-15",
          id: "1",
        },
        {
          observation: "Se realizaron pruebas de rendimiento.",
          date: "2024-08-16",
          id: "2",
        },
      ],
    },
    {
      id: 3,
      name: "Computador 3",
      observations: [
        {
          observation: "Se realizó la limpieza del teclado y la pantalla.",
          date: "2024-08-01",
          id: "3",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;

  const filteredMaintenances = maintenances.filter(
    (maintenance) =>
      maintenance.name.includes(searchTerm) ||
      maintenance.observations.some(
        (obs) =>
          obs.observation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obs.date.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMaintenances.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredMaintenances.length / recordsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

      <div className="space-y-8">
        {currentRecords.map((maintenance) => (
          <div key={maintenance.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Mantenimiento del {maintenance.name}</h2>
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
                      {obs.observation}
                      {index === maintenance.observations.length - 1 && (
                        <Link
                          to={`/observations/${maintenance.id}/${obs.id}`}
                          className="ml-2 transition-transform hover:scale-105">
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
                        </Link>
                      )}
                    </div>
                    {index !== maintenance.observations.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link to={`/observations/${maintenance.id}`} className="btn btn-primary">
                  Nueva Observación
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 mb-6 flex justify-center">
        <div className="join">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`join-item btn ${currentPage === i + 1 ? "btn-active" : ""}`}
              onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

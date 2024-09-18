const api = 'http://localhost:3004'

const getAllMantenimientos = async () => {
  const response = await fetch(`${api}/api/mantenimiento`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
};

const getOneMantenimiento = async (id) => {
  const response = await fetch(`${api}/api/mantenimiento/${id}`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}

const createMantenimiento = async (data) => {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${api}/api/mantenimiento`, payload)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
};

const updateMantenimiento = async (id, data) => {
  const payload = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${api}/api/mantenimiento/${id}`, payload);
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
};

const deleteMantenimiento = async (id)=> {
  const payload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api}/api/mantenimiento/${id}`, payload);
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();

}

export { getAllMantenimientos, getOneMantenimiento, createMantenimiento, updateMantenimiento, deleteMantenimiento }
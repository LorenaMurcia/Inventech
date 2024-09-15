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

const createMantenimiento = async (data)=>{
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

export {getAllMantenimientos,getOneMantenimiento,createMantenimiento}
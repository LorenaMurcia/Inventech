const api = 'http://localhost:3004';

const getAllTrazas = async ()=>{
  const response = await fetch(`${api}/api/traza`)
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  };

  const getOneTraza = async (id)=>{
    const response = await fetch(`${api}/api/traza/${id}`)
      if (!response.ok) {
        throw new Error('Error en la conexion');
      }
      return response.json();
  };

  const createTraza = async (data)=>{
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${api}/api/users`, payload)
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  }
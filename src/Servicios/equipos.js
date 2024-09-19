//import env from "react-dontenv";

const api = 'inventech-back.vercel.app'

const getAllEquipos = async () => {
    const response = await fetch(`${api}/api/equipos`)
    if(!response.ok){
        throw new Error('Error en la conexión');
    }
    return response.json();
};

const createEquipos = async (data)=>{
  console.log(data)
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${api}/api/equipos`, payload)
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  };

const updateEquipo = async (id, data)=>{
    const payload = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${api}/api/equipos/${id}`, payload);
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  };

  const deleteEquipo = async (id)=> {
    const payload = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${api}/api/equipos/${id}`, payload);
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  
  }

export {getAllEquipos, updateEquipo, createEquipos, deleteEquipo}

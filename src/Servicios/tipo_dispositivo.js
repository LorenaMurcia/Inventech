const api = 'https://inventech-back.vercel.app'

const getAllTipos = async ()=>{
  const response = await fetch(`${api}/api/tipo_dispositivoRoutes`)
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  };
  
  const getOneTipo = async (id)=>{
    const response = await fetch(`${api}/api/tipo_dispositivoRoutes/${id}`)
    if (!response.ok) {
      throw new Error('Error en la conexion');
    }
    return response.json();
  
  }

  export {getAllTipos, getOneTipo }

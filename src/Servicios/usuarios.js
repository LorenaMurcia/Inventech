import env from "react-dotenv";
// const api = env.API_URL;
const api = 'http://localhost:3004'

const getAllUsers = async ()=>{
const response = await fetch(`${api}/api/users`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}

const createusers = async (data)=>{
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


export  {getAllUsers, createusers}


const api = 'http://localhost:3004'

const getAllUsers = async ()=>{
const response = await fetch(`${api}/api/users`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
};

const getOneUser = async (id)=>{
  const response = await fetch(`${api}/api/users/${id}`)
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
};

const updateUser = async (id, data)=>{
  const payload = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${api}/api/users/${id}`, payload);
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
};

const deteleUser = async (id)=> {
  const payload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api}/api/users/${id}`, payload);
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();

}

const atuhLogin = async (data)=>{
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(`${api}/api/users/auth/login`, payload);
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}


export  {getAllUsers, createusers, updateUser, deteleUser, getOneUser, atuhLogin}


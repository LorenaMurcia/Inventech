import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { atuhLogin } from "../Servicios/usuarios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { jwtDecode } from "jwt-decode";

function Login() {
  const { t } = useTranslation();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const { login, token, role } = useContext(AuthContext);
  console.log(role)

  const submit = async (e) => {
    e.preventDefault();
    try {
      const dataLogin = await atuhLogin({ correo, contraseña });
      console.log(dataLogin);
      if (dataLogin) {
        const token = dataLogin.token;
        // Guarda el token en el context por ende en el localStorage
        login(token);
        const decoded = jwtDecode(token);
        if (decoded.id_rol === 1) {
          navigate("/usersPanel");
        }
        if (decoded.id_rol === 2) {
          navigate("/deviceManagment");
        }
        if (decoded.id_rol === 3) {
          navigate("/maintenance");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Datos incorrectos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (token) {
      if (role == 1) {
        navigate("/usersPanel");
      } else if (role == 2) {
        navigate("/deviceManagment");
      } else if (role == 3) {
        navigate("/maintenance");
      } else {
        navigate("/deviceManagment");
      }
    }
  }, []);

  return (
    <div className="flex flex-grow items-center justify-center p-4">
      <div className="h-[300px] w-full max-w-md rounded-lg bg-Blue100 p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">{t("login.btnlogin")}</h2>
        <form className="space-y-4" onSubmit={submit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-600">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="flex-1 border-none outline-none"
              placeholder={t("login.email")}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-600">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="flex-1 border-none outline-none"
              placeholder={t("login.password")}
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </label>
          <button className="w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {t("login.btnlogin")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

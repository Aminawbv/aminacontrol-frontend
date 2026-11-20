"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UsuariosListado() {

  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {

    const cargarUsuarios = async () => {

      try {

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/usuarios"
        );

        setUsuarios(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarUsuarios();

  }, []);

  return (

    <div
      className="
      mt-8
      bg-white
      rounded-2xl
      border
      border-[#E5E7EB]
      p-6
      shadow-sm
      "
    >

      <h2 className="text-xl font-bold mb-6">
        Usuarios Registrados
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Nombre
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Rol
            </th>

            <th className="p-3 text-left">
              Empresa
            </th>

          </tr>

        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr
              key={usuario.id}
              className="hover:bg-slate-50"
            >

              <td className="p-3 font-medium">
                {usuario.nombre}
              </td>

              <td className="p-3">
                {usuario.email}
              </td>

              <td className="p-3">

                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-[#E8FAF7]
                  text-[#12B7A6]
                  text-sm
                  font-medium
                  "
                >
                  {usuario.rol}
                </span>

              </td>

              <td className="p-3">
                {usuario.empresa_id}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
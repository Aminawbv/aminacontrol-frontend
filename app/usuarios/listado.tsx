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

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Usuarios Registrados
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">Nombre</th>

            <th className="border p-2">Email</th>

            <th className="border p-2">Rol</th>

            <th className="border p-2">Empresa</th>

          </tr>

        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr key={usuario.id}>

              <td className="border p-2">
                {usuario.nombre}
              </td>

              <td className="border p-2">
                {usuario.email}
              </td>

              <td className="border p-2">
                {usuario.rol}
              </td>

              <td className="border p-2">
                {usuario.empresa_id}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

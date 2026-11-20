"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientesListado() {

  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {

    const cargarClientes = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/clientes",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setClientes(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarClientes();

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
        Clientes Registrados
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              RUT
            </th>

            <th className="p-3 text-left">
              Nombre
            </th>

            <th className="p-3 text-left">
              Teléfono
            </th>

            <th className="p-3 text-left">
              Email
            </th>

          </tr>

        </thead>

        <tbody>

          {clientes.map((cliente) => (

            <tr
              key={cliente.cliente_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3">
                {cliente.rut}
              </td>

              <td className="p-3 font-medium">
                {cliente.nombre}
              </td>

              <td className="p-3">
                {cliente.telefono}
              </td>

              <td className="p-3">
                {cliente.email}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
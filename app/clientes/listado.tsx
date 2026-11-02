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

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Clientes Registrados
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100">

            <th className="border p-2">RUT</th>

            <th className="border p-2">Nombre</th>

            <th className="border p-2">Teléfono</th>

            <th className="border p-2">Email</th>

          </tr>

        </thead>

        <tbody>

          {clientes.map((cliente) => (

            <tr key={cliente.cliente_id}>

              <td className="border p-2">
                {cliente.rut}
              </td>

              <td className="border p-2">
                {cliente.nombre}
              </td>

              <td className="border p-2">
                {cliente.telefono}
              </td>

              <td className="border p-2">
                {cliente.email}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
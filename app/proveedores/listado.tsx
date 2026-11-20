"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProveedoresListado() {

  const [proveedores, setProveedores] = useState<any[]>([]);

  useEffect(() => {

    const cargarProveedores = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/proveedores",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setProveedores(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarProveedores();

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
        Proveedores Registrados
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

          {proveedores.map((proveedor) => (

            <tr
              key={proveedor.proveedor_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3">
                {proveedor.rut}
              </td>

              <td className="p-3 font-medium">
                {proveedor.nombre}
              </td>

              <td className="p-3">
                {proveedor.telefono}
              </td>

              <td className="p-3">
                {proveedor.email}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
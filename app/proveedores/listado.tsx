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

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Proveedores Registrados
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              RUT
            </th>

            <th className="border p-2">
              Nombre
            </th>

            <th className="border p-2">
              Teléfono
            </th>

            <th className="border p-2">
              Email
            </th>

          </tr>

        </thead>

        <tbody>

          {proveedores.map((proveedor) => (

            <tr key={proveedor.proveedor_id}>

              <td className="border p-2">
                {proveedor.rut}
              </td>

              <td className="border p-2">
                {proveedor.nombre}
              </td>

              <td className="border p-2">
                {proveedor.telefono}
              </td>

              <td className="border p-2">
                {proveedor.email}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
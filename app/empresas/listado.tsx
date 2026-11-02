"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EmpresasListado() {

  const [empresas, setEmpresas] = useState<any[]>([]);

  useEffect(() => {

    const cargarEmpresas = async () => {

      try {

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/empresas"
        );

        setEmpresas(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarEmpresas();

  }, []);

  return (

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Empresas Registradas
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              ID
            </th>

            <th className="border p-2">
              Nombre Comercial
            </th>

            <th className="border p-2">
              Rubro
            </th>

            <th className="border p-2">
              Ciudad
            </th>

          </tr>

        </thead>

        <tbody>

          {empresas.map((empresa) => (

            <tr key={empresa.empresa_id}>

              <td className="border p-2">
                {empresa.empresa_id}
              </td>

              <td className="border p-2">
                {empresa.nombre_comercial}
              </td>

              <td className="border p-2">
                {empresa.rubro}
              </td>

              <td className="border p-2">
                {empresa.ciudad}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
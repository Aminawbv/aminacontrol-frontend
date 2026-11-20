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
        Empresas Registradas
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              ID
            </th>

            <th className="p-3 text-left">
              Nombre Comercial
            </th>

            <th className="p-3 text-left">
              Rubro
            </th>

            <th className="p-3 text-left">
              Ciudad
            </th>

          </tr>

        </thead>

        <tbody>

          {empresas.map((empresa) => (

            <tr
              key={empresa.empresa_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3 font-medium">
                {empresa.empresa_id}
              </td>

              <td className="p-3">
                {empresa.nombre_comercial}
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
                  {empresa.rubro}
                </span>

              </td>

              <td className="p-3">
                {empresa.ciudad}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
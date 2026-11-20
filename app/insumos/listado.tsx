"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InsumosListado() {

  const [insumos, setInsumos] = useState<any[]>([]);

  useEffect(() => {

    const cargarInsumos = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/insumos",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setInsumos(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarInsumos();

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
        Insumos Registrados
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Nombre
            </th>

            <th className="p-3 text-left">
              Unidad
            </th>

            <th className="p-3 text-left">
              Costo
            </th>

            <th className="p-3 text-left">
              Stock Actual
            </th>

            <th className="p-3 text-left">
              Stock Mínimo
            </th>

          </tr>

        </thead>

        <tbody>

          {insumos.map((insumo) => (

            <tr
              key={insumo.insumo_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3">
                {insumo.nombre}
              </td>

              <td className="p-3">
                {insumo.unidad}
              </td>

              <td className="p-3 font-medium">
                $
                {Number(
                  insumo.costo_unitario || 0
                ).toLocaleString()}
              </td>

              <td className="p-3">
                {insumo.stock_actual}
              </td>

              <td className="p-3">

                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-[#FFF7D6]
                  text-[#A16207]
                  text-sm
                  font-medium
                  "
                >
                  {insumo.stock_minimo}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProduccionListado() {

  const [producciones, setProducciones] =
    useState<any[]>([]);

  useEffect(() => {

    const cargarProduccion = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/produccion",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setProducciones(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    cargarProduccion();

  }, []);

  return (

    <div className="list-card mt-8">

      <h2 className="text-xl font-bold mb-6">
        Producciones Registradas
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Fecha
            </th>

            <th className="p-3 text-left">
              Producto
            </th>

            <th className="p-3 text-left">
              Cantidad
            </th>

            <th className="p-3 text-left">
              Costo Total
            </th>

          </tr>

        </thead>

        <tbody>

          {producciones.map((produccion) => (

            <tr
              key={produccion.produccion_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3 whitespace-nowrap">

                {produccion.fecha_produccion?.value ||
                  produccion.fecha_produccion ||
                  "-"}

              </td>

              <td className="p-3 font-medium">

                {produccion.producto || "-"}

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
                  {produccion.cantidad_producida}
                </span>

              </td>

              <td className="p-3 font-semibold">

                $

                {Number(
  produccion.costo_total ||
  0
).toLocaleString("es-CL")}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
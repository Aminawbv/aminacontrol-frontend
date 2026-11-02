"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProduccionListado() {

  const [producciones, setProducciones] = useState<any[]>([]);

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

        setProducciones(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarProduccion();

  }, []);

  return (

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Producciones Registradas
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Fecha
            </th>

            <th className="border p-2">
              Producto
            </th>

            <th className="border p-2">
              Cantidad
            </th>

            <th className="border p-2">
              Costo Total
            </th>

          </tr>

        </thead>

        <tbody>

          {producciones.map((produccion) => (

            <tr key={produccion.produccion_id}>

              <td className="border p-2">
                {produccion.fecha_produccion?.value ||
                 produccion.fecha_produccion}
              </td>

              <td className="border p-2">
                {produccion.producto || "-"}
              </td>

              <td className="border p-2">
                {produccion.cantidad_producida}
              </td>

              <td className="border p-2">
                $
                {Number(
                  produccion.costo_total?.value ||
                  produccion.costo_total ||
                  0
                ).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
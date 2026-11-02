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

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Insumos Registrados
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Nombre
            </th>

            <th className="border p-2">
              Unidad
            </th>

            <th className="border p-2">
              Costo
            </th>

            <th className="border p-2">
              Stock Actual
            </th>

            <th className="border p-2">
              Stock Mínimo
            </th>

          </tr>

        </thead>

        <tbody>

          {insumos.map((insumo) => (

            <tr key={insumo.insumo_id}>

              <td className="border p-2">
                {insumo.nombre}
              </td>

              <td className="border p-2">
                {insumo.unidad}
              </td>

              <td className="border p-2">
                ${Number(insumo.costo_unitario).toLocaleString()}
              </td>

              <td className="border p-2">
                {insumo.stock_actual}
              </td>

              <td className="border p-2">
                {insumo.stock_minimo}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
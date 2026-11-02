"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InventarioListado() {

  const [movimientos, setMovimientos] = useState<any[]>([]);

  useEffect(() => {

    const cargarMovimientos = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/movimientos-inventario",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setMovimientos(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarMovimientos();

  }, []);

  return (

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Movimientos de Inventario
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Fecha
            </th>

            <th className="border p-2">
              Tipo
            </th>

            <th className="border p-2">
              Insumo
            </th>

            <th className="border p-2">
              Cantidad
            </th>

            <th className="border p-2">
              Observación
            </th>

          </tr>

        </thead>

        <tbody>

          {movimientos.map((movimiento) => (

            <tr key={movimiento.movimiento_id}>

              <td className="border p-2">
                {movimiento.fecha?.value ||
                 movimiento.fecha ||
                 "-"}
              </td>

              <td className="border p-2">
                {movimiento.tipo_movimiento}
              </td>

              <td className="border p-2">
                {movimiento.insumo}
              </td>

              <td className="border p-2">
                {movimiento.cantidad}
              </td>

              <td className="border p-2">
                {movimiento.observacion}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
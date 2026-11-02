"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InventarioTabla() {

  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const cargarMovimientos = async () => {

      try {

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/movimientos-inventario"
        );

        setMovimientos(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    cargarMovimientos();

  }, []);

  if (loading) {
    return <p>Cargando movimientos...</p>;
  }

  return (

    <div className="overflow-x-auto">

      <table className="min-w-full border border-gray-300">

        <thead className="bg-gray-800 text-white">

          <tr>
            <th className="border px-3 py-2 text-left">Fecha</th>
            <th className="border px-3 py-2 text-left">Tipo</th>
            <th className="border px-3 py-2 text-left">Insumo ID</th>
            <th className="border px-3 py-2 text-left">Cantidad</th>
            <th className="border px-3 py-2">Observación</th>
          </tr>

        </thead>

        <tbody>

          {movimientos.map((movimiento) => (

            <tr key={movimiento.movimiento_id}>

              <td className="border px-3 py-2">
                {movimiento.fecha?.value?.substring(0, 10)}
              </td>

              <td className="border px-3 py-2">
                {movimiento.tipo_movimiento}
              </td>

              <td className="border px-3 py-2">
                {movimiento.insumo_id}
              </td>

              <td className="border px-3 py-2">
                {movimiento.cantidad}
              </td>

              <td className="border px-3 py-2">
                {movimiento.observacion}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InventarioTabla() {

  const [movimientos, setMovimientos] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const cargarMovimientos = async () => {

      try {

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/movimientos-inventario"
        );

        setMovimientos(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    cargarMovimientos();

  }, []);

  if (loading) {

    return (
      <p>
        Cargando movimientos...
      </p>
    );

  }

  return (

    <div className="list-card mt-8">

      <h2 className="text-xl font-bold mb-6">
        Tabla de Movimientos
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Fecha
            </th>

            <th className="p-3 text-left">
              Tipo
            </th>

            <th className="p-3 text-left">
              Insumo ID
            </th>

            <th className="p-3 text-left">
              Cantidad
            </th>

            <th className="p-3 text-left">
              Observación
            </th>

          </tr>

        </thead>

        <tbody>

          {movimientos.map((movimiento) => (

            <tr
              key={movimiento.movimiento_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3 whitespace-nowrap">

                {movimiento.fecha?.value
                  ?.substring(0, 10) || "-"}

              </td>

              <td className="p-3">

                <span
                  className={
                    movimiento.tipo_movimiento ===
                    "SALIDA"

                      ? "px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-sm font-medium"

                      : "px-3 py-1 rounded-full bg-[#E8FAF7] text-[#12B7A6] text-sm font-medium"
                  }
                >

                  {movimiento.tipo_movimiento}

                </span>

              </td>

              <td className="p-3 font-medium">

                {movimiento.insumo_id}

              </td>

              <td className="p-3">

                {movimiento.cantidad}

              </td>

              <td className="p-3">

                {movimiento.observacion || "-"}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
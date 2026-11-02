"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function InsumosCriticos() {

  const [insumos, setInsumos] = useState<any[]>([]);

  useEffect(() => {

    const cargarCriticos = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/insumos-criticos",
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

    cargarCriticos();

  }, []);

  if (insumos.length === 0) {

    return (

      <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-4 mb-8">

        ✅ No existen insumos con stock crítico.

      </div>

    );

  }

  return (

    <div className="mb-8">

      <div className="bg-red-100 border border-red-300 rounded-lg p-4">

        <h2 className="text-xl font-bold text-red-700 mb-4">

          ⚠️ Insumos Críticos

        </h2>

        <table className="w-full border bg-white">

          <thead>

            <tr className="bg-red-50">

              <th className="border p-2">
                Insumo
              </th>

              <th className="border p-2">
                Unidad
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

            {insumos.map((item) => (

              <tr key={item.insumo_id}>

                <td className="border p-2">
                  {item.nombre}
                </td>

                <td className="border p-2">
                  {item.unidad}
                </td>

                <td className="border p-2 text-red-600 font-bold">
                  {item.stock_actual}
                </td>

                <td className="border p-2">
                  {item.stock_minimo}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
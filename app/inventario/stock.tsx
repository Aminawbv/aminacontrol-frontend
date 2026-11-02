"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function StockInventario() {

  const [stock, setStock] = useState<any[]>([]);

  useEffect(() => {

    const cargarStock = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/stock",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setStock(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarStock();

  }, []);

  return (

    <div className="mt-10">

      <h2 className="text-xl font-bold mb-4">
        Stock Actual
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

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

            <th className="border p-2">
              Estado
            </th>

          </tr>

        </thead>

        <tbody>

          {stock.map((item) => (

            <tr key={item.insumo_id}>

              <td className="border p-2">
                {item.nombre}
              </td>

              <td className="border p-2">
                {item.unidad}
              </td>

              <td className="border p-2">
                {item.stock_actual}
              </td>

              <td className="border p-2">
                {item.stock_minimo}
              </td>

              <td className="border p-2">

                {item.estado === "CRITICO" ? (
                  <span className="text-red-600 font-bold">
                    ⚠️ Crítico
                  </span>
                ) : (
                  <span className="text-green-600 font-bold">
                    ✅ Normal
                  </span>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
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

        setStock(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    cargarStock();

  }, []);

  return (

    <div className="list-card mt-8">

      <h2 className="text-xl font-bold mb-6">
        Stock Actual
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Insumo
            </th>

            <th className="p-3 text-left">
              Unidad
            </th>

            <th className="p-3 text-left">
              Stock Actual
            </th>

            <th className="p-3 text-left">
              Stock Mínimo
            </th>

            <th className="p-3 text-left">
              Estado
            </th>

          </tr>

        </thead>

        <tbody>

          {stock.map((item) => (

            <tr
              key={item.insumo_id}
              className="hover:bg-slate-50"
            >

              <td className="p-3 font-medium">
                {item.nombre}
              </td>

              <td className="p-3">
                {item.unidad}
              </td>

              <td className="p-3">

                <span
                  className={
                    item.estado === "CRITICO"

                      ? "font-semibold text-[#DC2626]"

                      : "font-semibold text-[#12B7A6]"
                  }
                >
                  {item.stock_actual}
                </span>

              </td>

              <td className="p-3">
                {item.stock_minimo}
              </td>

              <td className="p-3">

                {item.estado === "CRITICO" ? (

                  <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    bg-[#FEE2E2]
                    text-[#DC2626]
                    text-sm
                    font-medium
                    "
                  >
                    Crítico
                  </span>

                ) : (

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
                    Normal
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
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RentabilidadPage() {

  const [productos, setProductos] =
    useState<any[]>([]);

  useEffect(() => {

    const cargarRentabilidad = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/rentabilidad-productos",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setProductos(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    cargarRentabilidad();

  }, []);

  return (

    <div className="max-w-7xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Rentabilidad de Productos
      </h1>

      <div className="list-card">

        <table className="w-full">

          <thead>

            <tr>

              <th className="p-3 text-left">
                Producto
              </th>

              <th className="p-3 text-left">
                Cantidad Vendida
              </th>

              <th className="p-3 text-left">
                Ingresos
              </th>

            </tr>

          </thead>

          <tbody>

            {productos.map(
              (producto, index) => (

                <tr
                  key={index}
                  className="hover:bg-slate-50"
                >

                  <td className="p-3 font-medium">
                    {producto.nombre}
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
                      {producto.cantidad_vendida}
                    </span>

                  </td>

                  <td className="p-3 font-semibold">

                    $

                    {Number(
  producto.ingresos ||
  0
).toLocaleString("es-CL")}


                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}
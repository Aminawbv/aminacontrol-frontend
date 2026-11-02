"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RentabilidadPage() {

  const [productos, setProductos] = useState<any[]>([]);

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

        setProductos(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarRentabilidad();

  }, []);

  return (

    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Rentabilidad de Productos
      </h1>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Producto
            </th>

            <th className="border p-2">
              Cantidad Vendida
            </th>

            <th className="border p-2">
              Ingresos
            </th>

          </tr>

        </thead>

        <tbody>

          {productos.map((producto, index) => (

            <tr key={index}>

              <td className="border p-2">
                {producto.nombre}
              </td>

              <td className="border p-2">
                {producto.cantidad_vendida}
              </td>

              <td className="border p-2">

                $

                {Number(
                  producto.ingresos?.value ||
                  producto.ingresos ||
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
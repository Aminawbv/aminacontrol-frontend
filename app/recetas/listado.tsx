"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RecetasListado() {

  const [recetas, setRecetas] = useState<any[]>([]);

  useEffect(() => {

    const cargarRecetas = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/recetas",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setRecetas(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarRecetas();

  }, []);

  return (

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Recetas Registradas
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Producto
            </th>

            <th className="border p-2">
              Insumo
            </th>

            <th className="border p-2">
              Cantidad
            </th>

            <th className="border p-2">
              Unidad
            </th>

            <th className="border p-2">
              Rendimiento
            </th>

          </tr>

        </thead>

        <tbody>

          {recetas.map((receta) => (

            <tr
              key={`${receta.receta_id}-${receta.insumo}`}
            >

              <td className="border p-2">
                {receta.producto}
              </td>

              <td className="border p-2">
                {receta.insumo}
              </td>

              <td className="border p-2">
                {receta.cantidad}
              </td>

              <td className="border p-2">
                {receta.unidad}
              </td>

              <td className="border p-2">
                {receta.rendimiento}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
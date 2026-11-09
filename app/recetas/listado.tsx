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

  const verDetalle = async (
    recetaId: string
  ) => {

    try {

      const response = await axios.get(
        `https://aminacontrol-api-729925860477.us-central1.run.app/recetas/${recetaId}`
      );

      const detalle = response.data
        .map(
          (item: any) =>
            `${item.insumo} - ${item.cantidad} ${item.unidad}`
        )
        .join("\n");

      alert(
        `Ingredientes:\n\n${detalle}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al cargar detalle"
      );

    }

  };

const editarReceta = (
  recetaId: string
) => {

  window.location.href =
    `/recetas/editar/${recetaId}`;

};

  const eliminarReceta = async (
    recetaId: string
  ) => {

    const confirmar = confirm(
      "¿Desea eliminar esta receta?"
    );

    if (!confirmar) return;

    try {

      await axios.delete(
        `https://aminacontrol-api-729925860477.us-central1.run.app/recetas/${recetaId}`
      );

      alert(
        "Receta eliminada"
      );

      setRecetas(
        recetas.filter(
          (r) =>
            r.receta_id !== recetaId
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al eliminar receta"
      );

    }

  };

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
        Rendimiento
      </th>

      <th className="border p-2">
        Acciones
      </th>

    </tr>

  </thead>

  <tbody>

    {recetas.map((receta) => (

      <tr key={receta.receta_id}>

        <td className="border p-2">
          {receta.producto}
        </td>

        <td className="border p-2">

          {receta.rendimiento}

          {" "}

          {receta.unidad_rendimiento || ""}

        </td>

        <td className="border p-2">

          <button
            onClick={() =>
              verDetalle(
                receta.receta_id
              )
            }
            className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
          >
            Ver
          </button>
<button
  onClick={() =>
    window.location.href =
      `/recetas/editar/${receta.receta_id}`
  }
  className="bg-yellow-600 text-white px-2 py-1 rounded mr-2"
>
  Editar
</button>

          <button
            onClick={() =>
              eliminarReceta(
                receta.receta_id
              )
            }
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Eliminar
          </button>

        </td>

      </tr>

    ))}

  </tbody>

</table>

    </div>

  );

}
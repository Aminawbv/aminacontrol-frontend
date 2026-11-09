"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditarRecetaPage() {

  const params = useParams();

  const router = useRouter();

  const recetaId =
    params.receta_id as string;

  const [insumos, setInsumos] =
    useState<any[]>([]);

  const [producto, setProducto] =
    useState("");

  const [rendimiento, setRendimiento] =
    useState("");

  const [
    unidadRendimiento,
    setUnidadRendimiento
  ] = useState("porciones");

  const [nombreProducto,
  setNombreProducto] =
  useState("");

  const [detalles, setDetalles] =
    useState<any[]>([]);

  useEffect(() => {

    const cargarReceta =
      async () => {

        try {

          const recetaResponse =
            await axios.get(
              `https://aminacontrol-api-729925860477.us-central1.run.app/recetas-editar/${recetaId}`
            );

          const receta =
            recetaResponse.data;

          if (
            receta.length > 0
          ) {

            setProducto(
              receta[0].producto_id
            );

            setRendimiento(
              receta[0]
                .rendimiento
                ?.toString() || ""
            );

            setUnidadRendimiento(
              receta[0]
                .unidad_rendimiento ||
                "porciones"
            );
             setNombreProducto(
  receta[0].producto
);   
            setDetalles(
              receta.map(
                (r: any) => ({
                  insumo_id:
                    r.insumo_id,
                  cantidad:
                    r.cantidad,
                  unidad:
                    r.unidad
                })
              )
            );

          }

          const insumosResponse =
            await axios.get(
              "https://aminacontrol-api-729925860477.us-central1.run.app/insumos-select"
            );

          setInsumos(
            insumosResponse.data
          );

        } catch (error) {

          console.error(error);

        }

      };

    cargarReceta();

  }, [recetaId]);

  const agregarInsumo =
    () => {

      setDetalles([
        ...detalles,
        {
          insumo_id: "",
          cantidad: "",
          unidad: "gr"
        }
      ]);

    };

  const eliminarInsumo =
    (index: number) => {

      const nuevos =
        [...detalles];

      nuevos.splice(
        index,
        1
      );

      setDetalles(
        nuevos
      );

    };

  const actualizarDetalle =
    (
      index: number,
      campo: string,
      valor: string
    ) => {

      const nuevos =
        [...detalles];

      nuevos[index] = {
        ...nuevos[index],
        [campo]: valor
      };

      setDetalles(
        nuevos
      );

    };

  const guardar =
    async () => {

      try {

        await axios.put(
          `https://aminacontrol-api-729925860477.us-central1.run.app/recetas/${recetaId}`,
          {
            rendimiento:
              Number(
                rendimiento
              ),

            unidad_rendimiento:
              unidadRendimiento,

            detalles:
              detalles.map(
                (d) => ({
                  insumo_id:
                    d.insumo_id,

                  cantidad:
                    Number(
                      d.cantidad
                    ),

                  unidad:
                    d.unidad
                })
              )
          }
        );

        alert(
          "Receta actualizada"
        );

        router.push(
          "/recetas"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Error al actualizar receta"
        );

      }

    };

  return (

    <div className="max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">

  ✏️ Editando:
  {" "}
  {nombreProducto}

</h1>


      <div className="mb-4">

        <label>

          Rendimiento

        </label>

        <input
          type="number"
          value={rendimiento}
          onChange={(e) =>
            setRendimiento(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

      </div>

      <div className="mb-6">

        <label>

          Unidad de Rendimiento

        </label>

        <select
          value={
            unidadRendimiento
          }
          onChange={(e) =>
            setUnidadRendimiento(
              e.target.value
            )
          }
          className="border p-2 w-full"
        >

          <option value="porciones">
            Porciones
          </option>

          <option value="unidades">
            Unidades
          </option>

          <option value="kg">
            Kg
          </option>

          <option value="lt">
            Litros
          </option>

        </select>

      </div>

      <h2 className="font-bold mb-4">

        Ingredientes

      </h2>

      {detalles.map(
        (detalle, index) => (

          <div
            key={index}
            className="grid grid-cols-4 gap-2 mb-2"
          >

            <select
              value={
                detalle.insumo_id
              }
              onChange={(e) =>
                actualizarDetalle(
                  index,
                  "insumo_id",
                  e.target.value
                )
              }
              className="border p-2"
            >

              <option value="">
                Insumo
              </option>

              {insumos.map(
                (insumo) => (

                  <option
                    key={
                      insumo.insumo_id
                    }
                    value={
                      insumo.insumo_id
                    }
                  >
                    {insumo.nombre}
                  </option>

                )
              )}

            </select>

            <input
              type="number"
              value={
                detalle.cantidad
              }
              onChange={(e) =>
                actualizarDetalle(
                  index,
                  "cantidad",
                  e.target.value
                )
              }
              className="border p-2"
            />

            <select
              value={
                detalle.unidad
              }
              onChange={(e) =>
                actualizarDetalle(
                  index,
                  "unidad",
                  e.target.value
                )
              }
              className="border p-2"
            >

              <option value="kg">
                kg
              </option>

              <option value="gr">
  gr
</option>

              <option value="lt">
                lt
              </option>

              <option value="ml">
                ml
              </option>

              <option value="unidad">
                unidad
              </option>

            </select>

            <button
              type="button"
              onClick={() =>
                eliminarInsumo(
                  index
                )
              }
              className="bg-red-600 text-white rounded px-2"
            >
              X
            </button>

          </div>

        )
      )}

      <button
        type="button"
        onClick={
          agregarInsumo
        }
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 mr-4"
      >
        + Agregar Insumo
      </button>

      <button
        type="button"
        onClick={guardar}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Guardar Cambios
      </button>

    </div>

  );

}
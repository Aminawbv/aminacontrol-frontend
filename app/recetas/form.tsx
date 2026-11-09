"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RecetasForm() {

  const [productos, setProductos] = useState<any[]>([]);
  const [insumos, setInsumos] = useState<any[]>([]);

  const [productoId, setProductoId] = useState("");
  const [rendimiento, setRendimiento] = useState("");
  const [unidadRendimiento,
  setUnidadRendimiento] =
  useState("porciones");

  const [detalles, setDetalles] = useState([
    {
      insumo_id: "",
      cantidad: "",
      unidad: "gr"
    }
  ]);

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const productosResponse =
          await axios.get(
            "https://aminacontrol-api-729925860477.us-central1.run.app/productos-elaborados",
            {
              params: {
                empresa_id: usuario.empresa_id
              }
            }
          );

        const insumosResponse =
          await axios.get(
            "https://aminacontrol-api-729925860477.us-central1.run.app/insumos-select"
          );

        setProductos(
          productosResponse.data
        );

        setInsumos(
          insumosResponse.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    cargarDatos();

  }, []);

  const agregarInsumo = () => {

    setDetalles([
      ...detalles,
      {
        insumo_id: "",
        cantidad: "",
        unidad: "gr"
      }
    ]);

  };

  const eliminarInsumo = (index: number) => {

    const nuevosDetalles =
      [...detalles];

    nuevosDetalles.splice(
      index,
      1
    );

    setDetalles(
      nuevosDetalles
    );

  };

  const actualizarDetalle = (
    index: number,
    campo: string,
    valor: string
  ) => {

    const nuevosDetalles =
      [...detalles];

    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [campo]: valor
    };

    setDetalles(
      nuevosDetalles
    );

  };

  const guardar = async () => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/recetas",
        {
          empresa_id:
            usuario.empresa_id,

          producto_id:
            productoId,

          rendimiento:
            Number(
              rendimiento
            ),

            unidad_rendimiento:
            unidadRendimiento,

          detalles:
            detalles.map(
              (detalle) => ({
                insumo_id:
                  detalle.insumo_id,

                cantidad:
                  Number(
                    detalle.cantidad
                  ),

                unidad:
                  detalle.unidad
              })
            )
        }
      );

      alert(
        "Receta creada correctamente"
      );

      location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Error al guardar receta"
      );

    }

  };

  return (

    <div className="space-y-6">

      <div>

        <label className="block mb-2">

          Producto

        </label>

        <select
          value={productoId}
          onChange={(e) =>
            setProductoId(
              e.target.value
            )
          }
          className="border p-2 w-full"
        >

          <option value="">
            Seleccione
          </option>

          {productos.map(
            (producto) => (

              <option
                key={
                  producto.id_producto
                }
                value={
                  producto.id_producto
                }
              >
                {producto.nombre}
              </option>

            )
          )}

        </select>

      </div>

      <div>

        <label className="block mb-2">

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

          <div>

  <label className="block mb-2">

    Unidad de Rendimiento

  </label>

  <select
    value={unidadRendimiento}
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

      <div>

        <h3 className="font-bold text-lg mb-4">

          Insumos

        </h3>

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
                placeholder="Cantidad"
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
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          + Agregar Insumo
        </button>

      </div>

      <button
        type="button"
        onClick={guardar}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar Receta
      </button>

    </div>

  );

}
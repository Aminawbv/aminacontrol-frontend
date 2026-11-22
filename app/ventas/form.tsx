"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  fecha: z.string(),
  producto: z.string().min(1),
  cantidad: z.number().min(1),
  precio: z.number(),
  medio_pago: z.string().min(1),
  cliente: z.string().optional()
});

export default function VentasForm() {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting
    },
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });

  const [productos, setProductos] =
    useState<any[]>([]);

  const [productoSeleccionado,
    setProductoSeleccionado] =
    useState<any>(null);

  useEffect(() => {

    const cargarProductos = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario")
          || "{}"
        );

        const response =
          await axios.get(
            "https://aminacontrol-api-729925860477.us-central1.run.app/productos",
            {
              params: {
                empresa_id:
                  usuario.empresa_id
              }
            }
          );

        setProductos(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarProductos();

  }, []);

  const seleccionarProducto = (
    idProducto: string
  ) => {

    const producto =
      productos.find(
        (p) =>
          p.id_producto === idProducto
      );

    setProductoSeleccionado(
      producto
    );

    setValue(
      "precio",
      Number(
        producto?.precio_venta || 0
      )
    );

  };

  const onSubmit = async (
    data: any
  ) => {

      if (
  productoSeleccionado &&
  data.cantidad >
    productoSeleccionado.stock_actual
) {

  alert(
    `Stock insuficiente.
Disponible: ${productoSeleccionado.stock_actual}`
  );

  return;

}

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario")
        || "{}"
      );

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/venta",
        {
          empresa_id:
            usuario.empresa_id,

          productos: [
            {
              id_producto:
                data.producto,

              cantidad:
                data.cantidad,

              precio:
                data.precio
            }
          ],

          medio_pago:
            data.medio_pago
        }
      );

      alert(
        "Venta registrada con éxito"
      );

      reset();

      setProductoSeleccionado(
        null
      );

    } catch (error: any) {

      console.error(error);

      alert(
        JSON.stringify(
          error?.response?.data,
          null,
          2
        )
      );

    }

  };

  const hoy = new Date();

  const fechaChile = new Date(
    hoy.getTime() -
    hoy.getTimezoneOffset() *
    60000
  )
    .toISOString()
    .slice(0, 16);

  return (

    <form
      onSubmit={
        handleSubmit(onSubmit)
      }
    >

      <div className="form-card">

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Fecha
          </label>

          <input
            type="datetime-local"
            defaultValue={
              fechaChile
            }
            {...register("fecha")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Producto
          </label>

          <select
            {...register("producto")}
            className="input"
            onChange={(e) =>
              seleccionarProducto(
                e.target.value
              )
            }
          >

            <option value="">
              Selecciona un producto
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

        {productoSeleccionado && (

          <div
            className="
            bg-slate-50
            border
            rounded-xl
            p-4
            mb-6
            "
          >

            <p>
              <strong>
                Precio:
              </strong>
              {" "}
              $
              {Number(
                productoSeleccionado.precio_venta
              ).toLocaleString(
                "es-CL"
              )}
            </p>

            <p>

  <strong>
    Stock Disponible:
  </strong>

  {" "}

  <span
    className="
    px-3
    py-1
    rounded-full
    bg-green-100
    text-green-700
    text-sm
    font-medium
    "
  >
    {productoSeleccionado.stock_actual}
  </span>

</p>

          </div>

        )}

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Cantidad
          </label>

          <input
            type="number"
            {...register(
              "cantidad",
              {
                valueAsNumber:
                  true
              }
            )}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Precio Venta
          </label>

          <input
            type="number"
            readOnly
            {...register(
              "precio",
              {
                valueAsNumber:
                  true
              }
            )}
            className="
            input
            bg-slate-100
            "
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Cliente
          </label>

          <input
            {...register(
              "cliente"
            )}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Medio de Pago
          </label>

          <select
            {...register(
              "medio_pago"
            )}
            className="input"
          >

            <option value="">
              Selecciona medio de pago
            </option>

            <option value="efectivo">
              Efectivo
            </option>

            <option value="transferencia">
              Transferencia
            </option>

            <option value="tarjeta">
              Tarjeta
            </option>

          </select>

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {
            isSubmitting
              ? "Guardando..."
              : "Registrar Venta"
          }
        </button>

      </div>

    </form>

  );

}
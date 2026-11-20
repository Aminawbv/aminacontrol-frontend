"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  fecha: z.string().min(1, "Fecha requerida"),
  empresa: z.string().min(1, "Empresa requerida"),
  producto: z.string().min(1, "Producto requerido"),
  cantidad: z.number().min(1, "Cantidad mínima 1"),
  precio: z.number().min(1, "Precio mínimo 1"),
  cliente: z.string().optional(),
  medio_pago: z.string().min(1, "Medio de pago requerido"),
});

export default function VentasForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [productos, setProductos] =
    useState<any[]>([]);

  useEffect(() => {

    const cargarProductos = async () => {

      try {

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/productos"
        );

        setProductos(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    cargarProductos();

  }, []);

  const onSubmit = async (data: any) => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      const payload = {

        empresa_id:
          usuario.empresa_id,

        productos: [
          {
            id_producto:
              data.producto,

            cantidad:
              data.cantidad,

            precio:
              data.precio,
          },
        ],

        medio_pago:
          data.medio_pago,

      };

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/venta",
        payload
      );

      alert(
        "Venta registrada con éxito"
      );

      reset();

    } catch (error: any) {

      console.error(
        "ERROR FRONT:",
        error
      );

      alert(
        "Error al registrar la venta"
      );

    }

  };

const hoy = new Date();

const fechaChile = new Date(
  hoy.getTime() -
  hoy.getTimezoneOffset() * 60000
)
  .toISOString()
  .slice(0, 16);

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="form-card">

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Fecha
          </label>

         <input
  type="datetime-local"
  defaultValue={fechaChile}
  {...register("fecha")}
  className="input"
/>

          {errors.fecha && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.fecha.message)}
            </p>
          )}

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Empresa
          </label>

          <input
            type="text"
            {...register("empresa")}
            className="input"
          />

          {errors.empresa && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.empresa.message)}
            </p>
          )}

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Producto
          </label>

          <select
            {...register("producto")}
            className="input"
          >

            <option value="">
              Selecciona un producto
            </option>

            {productos.map((producto) => (

              <option
                key={producto.id_producto}
                value={producto.id_producto}
              >
                {producto.nombre}
              </option>

            ))}

          </select>

          {errors.producto && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.producto.message)}
            </p>
          )}

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Cantidad
          </label>

          <input
            type="number"
            {...register(
              "cantidad",
              { valueAsNumber: true }
            )}
            className="input"
          />

          {errors.cantidad && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.cantidad.message)}
            </p>
          )}

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Precio
          </label>

          <input
            type="number"
            {...register(
              "precio",
              { valueAsNumber: true }
            )}
            className="input"
          />

          {errors.precio && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.precio.message)}
            </p>
          )}

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Cliente
          </label>

          <input
            type="text"
            {...register("cliente")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Medio de Pago
          </label>

          <select
            {...register("medio_pago")}
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

          {errors.medio_pago && (
            <p className="text-red-600 text-sm mt-1">
              {String(errors.medio_pago.message)}
            </p>
          )}

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting
            ? "Guardando..."
            : "Registrar Venta"}
        </button>

      </div>

    </form>

  );

}
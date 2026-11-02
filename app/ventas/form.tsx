"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// ⭐ Validación real
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

  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {

  const cargarProductos = async () => {

    try {

      const response = await axios.get(
        "https://aminacontrol-api-729925860477.us-central1.run.app/productos"
      );

      setProductos(response.data);

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
  empresa_id: usuario.empresa_id,

  productos: [
    {
      id_producto: data.producto,
      cantidad: data.cantidad,
      precio: data.precio,
    },
  ],

  medio_pago: data.medio_pago,
};

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/venta",
        payload
      );

      alert("Venta registrada con éxito");
      reset();
    } catch (error: any) {
      console.error("ERROR FRONT:", error);
      alert("Error al registrar la venta");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Fecha */}
      <div>
        <label className="block font-medium">Fecha</label>
        <input type="datetime-local" {...register("fecha")} className="input" />
        {errors.fecha && <p className="error">{errors.fecha.message}</p>}
      </div>

      {/* Empresa */}
      <div>
        <label className="block font-medium">Empresa</label>
        <input type="text" {...register("empresa")} className="input" />
        {errors.empresa && <p className="error">{errors.empresa.message}</p>}
      </div>

      {/* Producto */}
      <div>
        <label className="block font-medium">Producto</label>
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
        {errors.producto && <p className="error">{errors.producto.message}</p>}
      </div>

      {/* Cantidad */}
      <div>
        <label className="block font-medium">Cantidad</label>
        <input
          type="number"
          {...register("cantidad", { valueAsNumber: true })}
          className="input"
        />
        {errors.cantidad && <p className="error">{errors.cantidad.message}</p>}
      </div>

      {/* Precio */}
      <div>
        <label className="block font-medium">Precio</label>
        <input
          type="number"
          {...register("precio", { valueAsNumber: true })}
          className="input"
        />
        {errors.precio && <p className="error">{errors.precio.message}</p>}
      </div>

      {/* Cliente */}
      <div>
        <label className="block font-medium">Cliente</label>
        <input type="text" {...register("cliente")} className="input" />
      </div>

      {/* Medio de Pago */}
      <div>
        <label className="block font-medium">Medio de Pago</label>
        <select {...register("medio_pago")} className="input">
          <option value="">Selecciona medio de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
        {errors.medio_pago && (
          <p className="error">{errors.medio_pago.message}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Guardando..." : "Registrar Venta"}
      </button>
    </form>
  );
}

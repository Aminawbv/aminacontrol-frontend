"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function ProduccionForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {

  const cargarProductos = async () => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      const response = await axios.get(
        "https://aminacontrol-api-729925860477.us-central1.run.app/productos-elaborados",
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

  cargarProductos();

}, []);

  const onSubmit = async (data: any) => {

    try {

     const usuario = JSON.parse(
  localStorage.getItem("usuario") || "{}"
);

const response = await axios.post(
  "https://aminacontrol-api-729925860477.us-central1.run.app/produccion",
  {
    empresa_id: usuario.empresa_id,
    producto_id: data.producto_id,
    cantidad_producida: Number(data.cantidad_producida)
  }
);

      alert(
        `Producción registrada. Costo total: ${response.data.costo_total}`
      );

      reset();

} catch (error: any) {

  console.error("ERROR PRODUCCION", error);

  console.log(
    error?.response?.data
  );

  alert(
    JSON.stringify(
      error?.response?.data || error.message
    )
  );

}

  };

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>

        <label>Producto</label>

<select
  {...register("producto_id")}
  className="input"
>

  <option value="">
    Seleccione
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

      </div>

      <div>

        <label>Cantidad a producir</label>

        <input
          type="number"
          {...register("cantidad_producida")}
          className="input"
        />

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting
          ? "Procesando..."
          : "Registrar Producción"}
      </button>

    </form>

  );

}
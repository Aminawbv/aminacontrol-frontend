"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function RecetasForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const [productos, setProductos] = useState<any[]>([]);
  const [insumos, setInsumos] = useState<any[]>([]);

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const productosResponse = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/productos"
        );

        const insumosResponse = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/insumos-select"
        );

        setProductos(productosResponse.data);
        setInsumos(insumosResponse.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarDatos();

  }, []);

  const onSubmit = async (data: any) => {

    try {

     const usuario = JSON.parse(
  localStorage.getItem("usuario") || "{}"
);

await axios.post(
  "https://aminacontrol-api-729925860477.us-central1.run.app/recetas",
  {
    empresa_id: usuario.empresa_id,

    producto_id: data.producto_id,

    rendimiento: Number(data.rendimiento),

    insumo_id: data.insumo_id,

    cantidad: Number(data.cantidad),

    unidad: data.unidad
  }
);

      alert("Receta creada correctamente");

      reset();

    } catch (error) {

      console.error(error);

      alert("Error al crear receta");

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

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

        <label>Rendimiento</label>

        <input
          type="number"
          {...register("rendimiento")}
          className="input"
        />

      </div>

      <div>

        <label>Insumo</label>

        <select
          {...register("insumo_id")}
          className="input"
        >

          <option value="">
            Seleccione
          </option>

          {insumos.map((insumo) => (

            <option
              key={insumo.insumo_id}
              value={insumo.insumo_id}
            >
              {insumo.nombre}
            </option>

          ))}

        </select>

      </div>

      <div>

        <label>Cantidad</label>

        <input
          type="number"
          {...register("cantidad")}
          className="input"
        />

      </div>

      <div>

        <label>Unidad</label>

        <select
          {...register("unidad")}
          className="input"
        >
          <option value="">Seleccione</option>
          <option value="kg">kg</option>
          <option value="gr">gr</option>
          <option value="lt">lt</option>
          <option value="ml">ml</option>
          <option value="unidad">unidad</option>
        </select>

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting
          ? "Guardando..."
          : "Registrar Receta"}
      </button>

    </form>

  );

}
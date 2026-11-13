"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ComprasForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const [proveedores, setProveedores] = useState<any[]>([]);
  const [insumos, setInsumos] = useState<any[]>([]);

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const proveedoresResponse = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/proveedores-select"
        );

        const insumosResponse = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/insumos-select"
        );

        setProveedores(proveedoresResponse.data);
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
  "https://aminacontrol-api-729925860477.us-central1.run.app/compras",
  {
    empresa_id: usuario.empresa_id,

    proveedor_id: data.proveedor_id,

    fecha_compra: data.fecha_compra,

    metodo_pago: data.metodo_pago,

    insumo_id: data.insumo_id,

    cantidad: Number(data.cantidad),

    unidad_compra: data.unidad_compra,

    costo_unitario: Number(data.costo_unitario)
  }
);

      alert("Compra registrada correctamente");

      reset();

    } catch (error) {

      console.error(error);

      alert("Error al registrar compra");

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      <div>

        <label>Proveedor</label>

        <select
          {...register("proveedor_id")}
          className="input"
        >

          <option value="">
            Seleccione
          </option>

          {proveedores.map((proveedor) => (

            <option
              key={proveedor.proveedor_id}
              value={proveedor.proveedor_id}
            >
              {proveedor.nombre}
            </option>

          ))}

        </select>

      </div>

      <div>

        <label>Fecha Compra</label>

        <input
          type="date"
          {...register("fecha_compra")}
          className="input"
        />

      </div>

      <div>

        <label>Método de Pago</label>

        <select
          {...register("metodo_pago")}
          className="input"
        >
          <option value="">
            Seleccione
          </option>

          <option value="EFECTIVO">
            Efectivo
          </option>

          <option value="TRANSFERENCIA">
            Transferencia
          </option>

          <option value="TARJETA">
            Tarjeta
          </option>

        </select>

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

          <div>

  <label>Unidad Compra</label>

  <select
    {...register("unidad_compra")}
    className="input"
  >

    <option value="">
      Seleccione
    </option>

    <option value="kg">
      Kg
    </option>

    <option value="gr">
      Gramos
    </option>

    <option value="lt">
      Litros
    </option>

    <option value="ml">
      Mililitros
    </option>

    <option value="unidad">
      Unidad
    </option>

  </select>

</div>

      </div>

      <div>

        <label>Costo Unitario</label>

        <input
          type="number"
          {...register("costo_unitario")}
          className="input"
        />

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting
          ? "Guardando..."
          : "Registrar Compra"}
      </button>

    </form>

  );

}
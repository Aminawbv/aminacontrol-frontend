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

  const [proveedores, setProveedores] =
    useState<any[]>([]);

  const [insumos, setInsumos] =
    useState<any[]>([]);

    const [productos, setProductos] =
  useState<any[]>([]);

const [tipoCompra, setTipoCompra] =
  useState("INSUMO");

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const proveedoresResponse =
          await axios.get(
            "https://aminacontrol-api-729925860477.us-central1.run.app/proveedores-select"
          );

        const insumosResponse =
          await axios.get(
            "https://aminacontrol-api-729925860477.us-central1.run.app/insumos-select"
          );

          const usuario = JSON.parse(
  localStorage.getItem("usuario") || "{}"
);

const productosResponse =
  await axios.get(
    "https://aminacontrol-api-729925860477.us-central1.run.app/productos-select",
    {
      params: {
        empresa_id:
          usuario.empresa_id
      }
    }
  );
  
setProductos(
  productosResponse.data
);

        setProveedores(
          proveedoresResponse.data
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

  const onSubmit = async (data: any) => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      console.log({
  empresa_id: usuario.empresa_id,
  tipo_compra: tipoCompra,
  proveedor_id: data.proveedor_id,
  insumo_id: data.insumo_id,
  producto_id: data.producto_id,
  cantidad: Number(data.cantidad),
  costo_unitario: Number(data.costo_unitario)
});

     await axios.post(
  "https://aminacontrol-api-729925860477.us-central1.run.app/compras",
  {
    empresa_id: usuario.empresa_id,

    tipo_compra: tipoCompra,

    proveedor_id: data.proveedor_id,

    fecha_compra: data.fecha_compra,

    metodo_pago: data.metodo_pago,

    insumo_id: data.insumo_id,

    producto_id: data.producto_id,

    cantidad: Number(
      data.cantidad
    ),

    unidad_compra:
      data.unidad_compra,

    costo_unitario: Number(
      data.costo_unitario
    )
  }
);

      alert(
        "Compra registrada correctamente"
      );

      reset();

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
    hoy.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="form-card">

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Proveedor
          </label>

          <select
            {...register("proveedor_id")}
            className="input"
          >

            <option value="">
              Seleccione
            </option>

            {proveedores.map(
              (proveedor) => (

                <option
                  key={
                    proveedor.proveedor_id
                  }
                  value={
                    proveedor.proveedor_id
                  }
                >
                  {proveedor.nombre}
                </option>

              )
            )}

          </select>

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Fecha Compra
          </label>

          <input
            type="date"
            defaultValue={fechaChile}
            {...register("fecha_compra")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Método de Pago
          </label>

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

        <div className="mb-6 form-field">

  <label className="block mb-2">
    Tipo Compra
  </label>

  <select
    value={tipoCompra}
    onChange={(e) =>
      setTipoCompra(
        e.target.value
      )
    }
    className="input"
  >

    <option value="INSUMO">
      Insumo
    </option>

    <option value="PRODUCTO">
      Producto
    </option>

  </select>

</div>

        <div className="mb-6 form-field">

  <label className="block mb-2">

    {tipoCompra === "INSUMO"
      ? "Insumo"
      : "Producto"}

  </label>

  <select
    {...register(
      tipoCompra === "INSUMO"
        ? "insumo_id"
        : "producto_id"
    )}
    className="input"
  >

    <option value="">
      Seleccione
    </option>

    {tipoCompra === "INSUMO"

      ? insumos.map((insumo) => (

          <option
            key={insumo.insumo_id}
            value={insumo.insumo_id}
          >
            {insumo.nombre}
          </option>

        ))

      : productos.map((producto) => (

          <option
            key={producto.id_producto}
            value={producto.id_producto}
          >
            {producto.nombre}
          </option>

        ))

    }

  </select>

</div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Cantidad
          </label>

          <input
            type="number"
            {...register("cantidad")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Unidad Compra
          </label>

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

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Costo Unitario
          </label>

          <input
            type="number"
            {...register("costo_unitario")}
            className="input"
          />

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting
            ? "Guardando..."
            : "Registrar Compra"}
        </button>

      </div>

    </form>

  );

}
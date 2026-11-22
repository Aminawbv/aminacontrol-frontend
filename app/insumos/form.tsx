"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function InsumosForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/insumos",
        {
          empresa_id: usuario.empresa_id,

          nombre: data.nombre,

          unidad: data.unidad,

          costo_unitario:
            Number(data.costo_unitario),

          stock_minimo:
            Number(data.stock_minimo)
        }
      );

      alert(
        "Insumo creado correctamente"
      );

      reset();

    } catch (error) {

      console.error(error);

      alert(
        "Error al crear insumo"
      );

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="form-card">

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Nombre
          </label>

          <input
            {...register("nombre")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Unidad
          </label>

          <select
            {...register("unidad")}
            className="input"
          >

            <option value="">
              Seleccione
            </option>

            <option value="kg">
              Kilogramos (kg)
            </option>

            <option value="gr">
              Gramos (gr)
            </option>

            <option value="lt">
              Litros (lt)
            </option>

            <option value="ml">
              Mililitros (ml)
            </option>

            <option value="unidad">
              Unidad
            </option>

            <option value="caja">
              Caja
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

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Stock Mínimo
          </label>

          <input
            type="number"
            {...register("stock_minimo")}
            className="input"
          />

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {
            isSubmitting
              ? "Guardando..."
              : "Registrar Insumo"
          }
        </button>

      </div>

    </form>

  );

}
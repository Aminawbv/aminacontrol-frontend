"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function ProveedoresForm() {

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
        "https://aminacontrol-api-729925860477.us-central1.run.app/proveedores",
        {
          empresa_id: usuario.empresa_id,

          rut: data.rut,
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
        }
      );

      alert("Proveedor creado correctamente");

      reset();

    } catch (error) {

      console.error(error);

      alert("Error al crear proveedor");

    }

  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="form-card">

        <div className="mb-6 form-field">

          <label className="block mb-2">
            RUT
          </label>

          <input
            {...register("rut")}
            className="input"
          />

        </div>

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
            Teléfono
          </label>

          <input
            {...register("telefono")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Dirección
          </label>

          <input
            {...register("direccion")}
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
            : "Registrar Proveedor"}
        </button>

      </div>

    </form>

  );

}
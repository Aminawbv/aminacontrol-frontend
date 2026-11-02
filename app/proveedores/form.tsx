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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label>RUT</label>
        <input {...register("rut")} className="input" />
      </div>

      <div>
        <label>Nombre</label>
        <input {...register("nombre")} className="input" />
      </div>

      <div>
        <label>Teléfono</label>
        <input {...register("telefono")} className="input" />
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} className="input" />
      </div>

      <div>
        <label>Dirección</label>
        <input {...register("direccion")} className="input" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Guardando..." : "Registrar Proveedor"}
      </button>

    </form>
  );
}
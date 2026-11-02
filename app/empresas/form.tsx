"use client";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function EmpresasForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data: any) => {

    try {

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/empresas",
        {
          empresa_id: data.empresa_id,
          rut: data.rut,
          razon_social: data.razon_social,
          nombre_comercial: data.nombre_comercial,
          giro: data.giro,
          email: data.email,
          telefono: data.telefono,
          direccion: data.direccion,
          ciudad: data.ciudad,
          rubro: data.rubro
        }
      );

      alert("Empresa creada correctamente");

      reset();

    } catch (error) {

      console.error(error);

      alert("Error al crear empresa");

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      <div>
        <label>ID Empresa</label>
        <input
          {...register("empresa_id")}
          className="input"
          placeholder="Ej: PIZ001"
        />
      </div>

      <div>
        <label>RUT</label>
        <input
          {...register("rut")}
          className="input"
          placeholder="76XXXXXX-X"
        />
      </div>

      <div>
        <label>Razón Social</label>
        <input
          {...register("razon_social")}
          className="input"
        />
      </div>

      <div>
        <label>Nombre Comercial</label>
        <input
          {...register("nombre_comercial")}
          className="input"
        />
      </div>

      <div>
        <label>Giro</label>
        <input
          {...register("giro")}
          className="input"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email")}
          className="input"
        />
      </div>

      <div>
        <label>Teléfono</label>
        <input
          {...register("telefono")}
          className="input"
        />
      </div>

      <div>
        <label>Dirección</label>
        <input
          {...register("direccion")}
          className="input"
        />
      </div>

      <div>
        <label>Ciudad</label>
        <input
          {...register("ciudad")}
          className="input"
        />
      </div>

      <div>
        <label>Rubro</label>

        <select
          {...register("rubro")}
          className="input"
        >
          <option value="">
            Seleccione
          </option>

          <option value="Pizzeria">
            Pizzería
          </option>

          <option value="Panaderia">
            Panadería
          </option>

          <option value="Pasteleria">
            Pastelería
          </option>

          <option value="Carniceria">
            Carnicería
          </option>

          <option value="Restaurant">
            Restaurant
          </option>

          <option value="Completos">
            Completos
          </option>

          <option value="Cafeteria">
            Cafetería
          </option>

          <option value="Topografia">
            Topografía
          </option>

          <option value="Gimnasio">
            Gimnasio
          </option>

          <option value="Otro">
            Otro
          </option>

        </select>

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting
          ? "Guardando..."
          : "Registrar Empresa"}
      </button>

    </form>

  );

}
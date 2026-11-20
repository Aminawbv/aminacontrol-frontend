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

    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="form-card">

        <div className="mb-6 form-field">

          <label className="block mb-2">
            ID Empresa
          </label>

          <input
            {...register("empresa_id")}
            className="input"
            placeholder="Ej: PIZ001"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            RUT
          </label>

          <input
            {...register("rut")}
            className="input"
            placeholder="76XXXXXX-X"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Razón Social
          </label>

          <input
            {...register("razon_social")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Nombre Comercial
          </label>

          <input
            {...register("nombre_comercial")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Giro
          </label>

          <input
            {...register("giro")}
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
            Teléfono
          </label>

          <input
            {...register("telefono")}
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

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Ciudad
          </label>

          <input
            {...register("ciudad")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Rubro
          </label>

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
          className="btn-primary"
        >
          {isSubmitting
            ? "Guardando..."
            : "Registrar Empresa"}
        </button>

      </div>

    </form>

  );

}
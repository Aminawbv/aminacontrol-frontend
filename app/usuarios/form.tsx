"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function UsuariosForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const [empresas, setEmpresas] = useState<any[]>([]);

  useEffect(() => {

    const cargarEmpresas = async () => {

      try {

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/empresas"
        );

        setEmpresas(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarEmpresas();

  }, []);

  const onSubmit = async (data: any) => {

    try {

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/usuarios",
        {
          nombre: data.nombre,
          email: data.email,
          password: data.password,
          rol: data.rol,
          empresa_id: data.empresa_id
        }
      );

      alert("Usuario creado correctamente");

      reset();

    } catch (error) {

      console.error(error);

      alert("Error al crear usuario");

    }

  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

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
            Contraseña
          </label>

          <input
            type="password"
            {...register("password")}
            className="input"
          />

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Rol
          </label>

          <select
            {...register("rol")}
            className="input"
          >

            <option value="">
              Seleccione
            </option>

            <option value="admin">
              Administrador
            </option>

            <option value="gerencia">
              Gerencia
            </option>

            <option value="bodega">
              Bodega
            </option>

            <option value="produccion">
              Producción
            </option>

          </select>

        </div>

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Empresa
          </label>

          <select
            {...register("empresa_id")}
            className="input"
          >

            <option value="">
              Seleccione
            </option>

            {empresas.map((empresa) => (

              <option
                key={empresa.empresa_id}
                value={empresa.empresa_id}
              >
                {empresa.nombre_comercial}
              </option>

            ))}

          </select>

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting
            ? "Guardando..."
            : "Registrar Usuario"}
        </button>

      </div>

    </form>

  );

}
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

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

      <div>
        <label>Nombre</label>

        <input
          {...register("nombre")}
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
        <label>Contraseña</label>

        <input
          type="password"
          {...register("password")}
          className="input"
        />
      </div>

      <div>
        <label>Rol</label>

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

      <div>
        <label>Empresa</label>

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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting
          ? "Guardando..."
          : "Registrar Usuario"}
      </button>

    </form>

  );

}
"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = async (data: any) => {

    try {

      const response = await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/login",
        {
          email: data.email,
          password: data.password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );

      alert("Login exitoso");

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Usuario o contraseña incorrecta");

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >

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

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {isSubmitting
          ? "Ingresando..."
          : "Ingresar"}
      </button>

    </form>

  );

}
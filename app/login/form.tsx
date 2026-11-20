"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

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

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      alert(
        "Usuario o contraseña incorrecta"
      );

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <div>

        <label
          className="
          block
          text-sm
          font-medium
          text-slate-700
          mb-2
          "
        >
          Email
        </label>

        <div className="relative">

          <Mail
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="
            w-full
            border
            border-gray-200
            rounded-xl
            pl-12
            pr-4
            py-3
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#B5FFFF]
            "
          />

        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">

          <label
            className="
            text-sm
            font-medium
            text-slate-700
            "
          >
            Contraseña
          </label>

          <button
            type="button"
            className="
            text-sm
            text-[#5DC1B9]
            hover:underline
            "
          >
            ¿Olvidaste tu contraseña?
          </button>

        </div>

        <div className="relative">

          <Lock
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "
          />

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
            className="
            w-full
            border
            border-gray-200
            rounded-xl
            pl-12
            pr-4
            py-3
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#B5FFFF]
            "
          />

        </div>

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
        w-full
        py-3
        rounded-xl
        bg-[#5DC1B9]
        hover:bg-[#4DAAA3]
        text-white
        font-medium
        transition
        "
      >
        {isSubmitting
          ? "Ingresando..."
          : "Acceder"}
      </button>

    </form>

  );

}
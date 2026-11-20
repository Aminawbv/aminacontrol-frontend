import LoginForm from "./form";

export default function LoginPage() {

  return (

    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-[#F6F7F9]
      px-4
      "
    >

      <div
        className="
        flex
        items-center
        justify-center
        gap-2
        mb-10
        "
      >

        <img
          src="/Logo1.png"
          alt="Amina"
          className="w-16 h-16"
        />

        <span
          className="
          text-5xl
          font-bold
          text-[#12B7A6]
          "
        >
          Amina
        </span>

      </div>

      <div
        className="
        w-full
        max-w-xl
        bg-white
        rounded-3xl
        shadow-sm
        border
        border-[#E5E7EB]
        p-10
        "
      >

        <h2
          className="
          text-3xl
          font-semibold
          text-center
          mb-8
          "
        >
          Iniciar sesión
        </h2>

        <LoginForm />

      </div>

    </div>

  );

}
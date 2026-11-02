import UsuariosForm from "./form";
import UsuariosListado from "./listado";

export default function UsuariosPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Usuarios
      </h1>

      <UsuariosForm />

      <UsuariosListado />

    </div>

  );

}
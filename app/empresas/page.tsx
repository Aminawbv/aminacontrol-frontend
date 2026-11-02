import EmpresasForm from "./form";
import EmpresasListado from "./listado";

export default function EmpresasPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Empresas
      </h1>

      <EmpresasForm />

      <EmpresasListado />

    </div>

  );

}
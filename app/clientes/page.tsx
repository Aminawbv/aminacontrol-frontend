import ClientesForm from "./form";
import ClientesListado from "./listado";

export default function ClientesPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Clientes
      </h1>

      <ClientesForm />

      <ClientesListado />

    </div>

  );

}
import ProveedoresForm from "./form";
import ProveedoresListado from "./listado";

export default function ProveedoresPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Proveedores
      </h1>

      <ProveedoresForm />

      <ProveedoresListado />

    </div>

  );

}
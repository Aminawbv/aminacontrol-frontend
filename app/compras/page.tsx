import ComprasForm from "./form";
import ComprasListado from "./listado";

export default function ComprasPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Compras
      </h1>

      <ComprasForm />

      <ComprasListado />

    </div>

  );

}
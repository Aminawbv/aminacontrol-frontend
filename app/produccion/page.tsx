import ProduccionForm from "./form";
import ProduccionListado from "./listado";

export default function ProduccionPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Producción
      </h1>

      <ProduccionForm />

      <ProduccionListado />

    </div>

  );

}
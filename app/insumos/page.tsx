import InsumosForm from "./form";
import InsumosListado from "./listado";

export default function InsumosPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Insumos
      </h1>

      <InsumosForm />

      <InsumosListado />

    </div>

  );

}
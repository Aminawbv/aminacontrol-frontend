import RecetasForm from "./form";
import RecetasListado from "./listado";

export default function RecetasPage() {

  return (

    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Recetas
      </h1>

      <RecetasForm />

      <RecetasListado />

    </div>

  );

}
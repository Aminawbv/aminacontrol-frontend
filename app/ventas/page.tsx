import VentasForm from "./form";
import VentasListado from "./listado";

export default function VentasPage() {

  return (

    <div className="max-w-5xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Ventas
      </h1>

      <VentasForm />

      <VentasListado />

    </div>

  );

}
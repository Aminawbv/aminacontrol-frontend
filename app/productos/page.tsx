import ProductosForm from "./form";
import ProductosListado from "./listado";

export default function ProductosPage() {

  return (

    <div className="max-w-5xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Productos
      </h1>

      <ProductosForm />

      <ProductosListado />

    </div>

  );

}
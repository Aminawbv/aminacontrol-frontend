import InventarioListado from "./listado";
import StockInventario from "./stock";
import InsumosCriticos from "./criticos";

export default function InventarioPage() {

  return (

    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Inventario
      </h1>

      <InsumosCriticos />

      <StockInventario />

      <InventarioListado />

    </div>

  );

}
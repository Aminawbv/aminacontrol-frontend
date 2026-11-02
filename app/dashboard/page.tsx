"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";




export default function DashboardPage() {

  const [data, setData] = useState<any>(null);

  const [topProductos, setTopProductos] = useState<any[]>([]);

  useEffect(() => {

    const cargarDashboard = async () => {

  try {

    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const response = await axios.get(
      "https://aminacontrol-api-729925860477.us-central1.run.app/dashboard",
      {
        params: {
          empresa_id: usuario.empresa_id
        }
      }
    );

    const topResponse = await axios.get(
      "https://aminacontrol-api-729925860477.us-central1.run.app/top-productos"
    );

    setData(response.data);

    setTopProductos(topResponse.data);

  } catch (error) {

    console.error(error);

  }

};

    cargarDashboard();

  }, []);

  if (!data) {
    return <p>Cargando dashboard...</p>;
  }

 
return (

  <div className="p-8">

    <h1 className="text-3xl font-bold mb-8">
      Dashboard Operacional
    </h1>

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-emerald-700 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Ventas Totales
        </h2>

        <p className="text-3xl font-bold">
          ${data.ventas_mes?.toLocaleString()}
        </p>
      </div>



      <div className="bg-red-700 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Compras Totales
        </h2>

        <p className="text-3xl font-bold">
          ${data.compras_mes?.toLocaleString()}
        </p>
      </div>

 
<Link href="/inventario">

  <div
 className={`relative text-white p-6 rounded-lg cursor-pointer transition hover:scale-105 ${
  data.stock_critico > 0
    ? "bg-red-600 animate-pulse"
    : "bg-green-600"
}`}
  >

    {data.stock_critico > 0 && (

      <div className="absolute top-2 right-2 bg-white text-red-600 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow">

        {data.stock_critico}

      </div>

    )}

    <h2 className="text-sm">
      ⚠️ Stock Crítico
    </h2>

    <p className="text-3xl font-bold mt-2">
      {data.stock_critico}
    </p>

    <p className="text-sm mt-2">

      {data.stock_critico > 0
        ? "Ver insumos críticos"
        : "Sin alertas"}

    </p>

  </div>

</Link>

      <div className="bg-slate-700 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Movimientos
        </h2>

        <p className="text-3xl font-bold">
          {data.movimientos}
        </p>
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Clientes
        </h2>

        <p className="text-3xl font-bold">
          {data.clientes}
        </p>
      </div>

      <div className="bg-green-600 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Proveedores
        </h2>

        <p className="text-3xl font-bold">
          {data.proveedores}
        </p>
      </div>

      <div className="bg-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Insumos
        </h2>

        <p className="text-3xl font-bold">
          {data.insumos}
        </p>
      </div>

      <div className="bg-orange-600 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Compras Registradas
        </h2>

        <p className="text-3xl font-bold">
          {data.compras}
        </p>
      </div>

<div className="bg-cyan-700 text-white p-6 rounded-lg">

  <h2 className="text-sm">
    Resultado Operacional
  </h2>

  <p className="text-3xl font-bold">
    ${data.resultado_operacional?.toLocaleString()}
  </p>

</div>

      <div className="bg-pink-600 text-white p-6 rounded-lg">
        <h2 className="text-sm">
          Producciones
        </h2>

        <p className="text-3xl font-bold">
          {data.producciones}
        </p>
      </div>
<div className="mt-8 bg-white text-black p-6 rounded-lg">

  <h2 className="text-xl font-bold mb-4">
    🏆 Top Productos Vendidos
  </h2>

  <ul>

    {topProductos.map((producto, index) => (

      <li
        key={index}
        className="flex justify-between border-b py-2"
      >
        <span>
          {producto.nombre}
        </span>

        <span>
          {producto.cantidad_vendida}
        </span>

      </li>

    ))}

  </ul>

</div>

    </div>

  </div>

);
}
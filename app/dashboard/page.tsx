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
  "https://aminacontrol-api-729925860477.us-central1.run.app/top-productos",
  {
    params: {
      empresa_id: usuario.empresa_id
    }
  }
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

  <div className="space-y-8">

    <div>

      <h1 className="text-4xl font-bold text-[#243746]">
        Dashboard Operacional
      </h1>

      <p className="text-lg
  font-semibold
  text-slate-500">
        Resumen general de la operación
      </p>

    </div>

    {/* KPI PRINCIPALES */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

        <div className="h-1 bg-[#12B7A6]" />

        <div className="p-6">

          <p className="text-lg
  font-semibold
  text-slate-500">
            Ventas Totales
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ${data.ventas_mes?.toLocaleString("es-CL")}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

        <div className="h-1 bg-[#4F83CC]" />

        <div className="p-6">

          <p className="text-lg
  font-semibold
  text-slate-500">
            Compras Totales
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ${data.compras_mes?.toLocaleString("es-CL")}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

        <div className="h-1 bg-[#8B5CF6]" />

        <div className="p-6">

          <p className="text-lg
  font-semibold
  text-slate-500">
            Resultado Operacional
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ${data.resultado_operacional?.toLocaleString("es-CL")}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

        <div className="h-1 bg-[#4A5568]" />

        <div className="p-6">

          <p className="text-lg
  font-semibold
  text-slate-500">
            Movimientos
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {data.movimientos}
          </h2>

        </div>

      </div>

    </div>

   {/* KPI SECUNDARIOS */}

<div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

  <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

    <div className="h-1 bg-[#12B7A6]" />

    <div className="p-6">

      <p className="text-lg font-semibold text-slate-500">
        Clientes
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {data.clientes}
      </h2>

    </div>

  </div>

  <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

    <div className="h-1 bg-[#4F83CC]" />

    <div className="p-6">

      <p className="text-lg font-semibold text-slate-500">
        Proveedores
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {data.proveedores}
      </h2>

    </div>

  </div>

  <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

    <div className="h-1 bg-[#8B5CF6]" />

    <div className="p-6">

      <p className="text-lg font-semibold text-slate-500">
        Insumos
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {data.insumos}
      </h2>

    </div>

  </div>

  <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">

    <div className="h-1 bg-[#F97316]" />

    <div className="p-6">

      <p className="text-lg font-semibold text-slate-500">
        Producciones
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {data.producciones}
      </h2>

    </div>

  </div>

</div>

    {/* BLOQUES INFERIORES */}

    <div className="grid xl:grid-cols-2 gap-6">

      <Link
  href="/inventario"
  className="block"
>

        <div
  className="
  bg-white
  border
  border-[#E5E7EB]
  rounded-2xl
  shadow-sm
  overflow-hidden
  "
>

  <div className="h-1 bg-red-500" />

  <div className="p-6">

 <h2 className="text-xl font-semibold">
  Stock Crítico
</h2>

<p className="text-2xl font-bold mt-2">
  {data.stock_critico}
</p>

<p className="text-slate-500">
  insumos en riesgo
</p>

<div className="mt-4 space-y-2">

  <div className="flex justify-between">

    <span className="text-slate-500">
      Insumos críticos
    </span>

    <span className="font-semibold">
      {data.stock_critico}
    </span>

  </div>

  <div className="w-full bg-slate-100 rounded-full h-2">

    <div
      className="bg-red-500 h-2 rounded-full"
      style={{
        width:
          data.stock_critico > 0
            ? "25%"
            : "0%"
      }}
    />

  </div>

</div>

    {/* aquí después mostraremos los insumos */}
    
  </div>

</div>

      </Link>

      <div
        className="
        bg-white
        border
        border-[#E5E7EB]
        rounded-2xl
        shadow-sm
        overflow-hidden
        "
      >

        <div className="h-1 bg-[#12B7A6]" />

        <div className="p-6">

          <h2 className="text-xl font-semibold mb-4">
            Top Productos Vendidos
          </h2>

          <ul>

            {topProductos.map((producto, index) => (

              <li
                key={index}
                className="
                flex
                justify-between
                py-3
                border-b
                border-slate-100
                "
              >

                <span>
                  {producto.nombre}
                </span>

                <span className="font-semibold">
                  {producto.cantidad_vendida}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>

  </div>

);
}
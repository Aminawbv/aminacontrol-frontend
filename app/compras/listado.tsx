"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ComprasListado() {

  const [compras, setCompras] = useState<any[]>([]);

  useEffect(() => {

    const cargarCompras = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/compras",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        console.log(
          "COMPRAS",
          response.data
        );

        setCompras(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    cargarCompras();

  }, []);

  return (

    <div className="list-card mt-8">

      <h2 className="text-xl font-bold mb-6">
        Compras Registradas
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Fecha
            </th>

            <th className="p-3 text-left">
              Proveedor
            </th>

            <th className="p-3 text-left">
              Insumo
            </th>

            <th className="p-3 text-left">
              Cantidad
            </th>

            <th className="p-3 text-left">
              Unidad
            </th>

            <th className="p-3 text-left">
              Total
            </th>

            <th className="p-3 text-left">
              Método Pago
            </th>

            <th className="p-3 text-left">
              Estado
            </th>

          </tr>

        </thead>

        <tbody>

          {compras.map((compra) => (

            <tr
              key={`${compra.compra_id}-${compra.insumo}`}
              className="hover:bg-slate-50"
            >

             <td className="p-3 whitespace-nowrap">

  {compra.fecha_compra?.value ||
    compra.fecha_compra ||
    "-"}

</td>

              <td className="p-3 font-medium">

                {compra.proveedor || "-"}

              </td>

              <td className="p-3">

                {compra.insumo || "-"}

              </td>

              <td className="p-3">

                {compra.cantidad?.value ||
                  compra.cantidad ||
                  "-"}

              </td>

              <td className="p-3">

                {compra.unidad_compra || "-"}

              </td>

              <td className="p-3 font-semibold">

                $

                {Number(
  compra.total ||
  0
).toLocaleString("es-CL")}

              </td>

             <td className="p-3">

  <span
    className="
    px-3
    py-1
    rounded-full
    bg-[#EEF5FF]
    text-[#4F83CC]
    text-sm
    font-medium
    "
  >

    {compra.metodo_pago === "TRANSFERENCIA"
      ? "Transferencia"
      : compra.metodo_pago === "EFECTIVO"
      ? "Efectivo"
      : compra.metodo_pago === "TARJETA"
      ? "Tarjeta"
      : compra.metodo_pago}

  </span>

</td>

              <td className="p-3">

  <span
    className={
      compra.estado === "ANULADA"

        ? "px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] text-sm font-medium"

        : compra.estado === "PENDIENTE"

        ? "px-3 py-1 rounded-full bg-[#FFF7D6] text-[#A16207] text-sm font-medium"

        : "px-3 py-1 rounded-full bg-[#E8FAF7] text-[#12B7A6] text-sm font-medium"
    }
  >

    {compra.estado || "-"}

  </span>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
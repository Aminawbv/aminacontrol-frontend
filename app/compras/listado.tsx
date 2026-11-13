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
console.log("COMPRAS", response.data);
        setCompras(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarCompras();

  }, []);

  return (

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Compras Registradas
      </h2>

      <table className="w-full border">

<thead>

  <tr className="bg-slate-100 text-black">

    <th className="border p-2">
      Fecha
    </th>

    <th className="border p-2">
      Proveedor
    </th>

    <th className="border p-2">
      Insumo
    </th>

    <th className="border p-2">
      Cantidad
    </th>

    <th className="border p-2">
      Unidad
    </th>

    <th className="border p-2">
      Total
    </th>

    <th className="border p-2">
      Método Pago
    </th>

    <th className="border p-2">
      Estado
    </th>

  </tr>

</thead>

        <tbody>

          {compras.map((compra) => (

            <tr key={`${compra.compra_id}-${compra.insumo}`}>

              <td className="border p-2">
                {compra.fecha_compra?.value ||
                  compra.fecha_compra ||
                  "-"}
              </td>

              <td className="border p-2">
                {compra.proveedor || "-"}
              </td>

              <td className="border p-2">
                {compra.insumo || "-"}
              </td>

<td className="border p-2">
  {compra.cantidad?.value ||
    compra.cantidad ||
    "-"}
</td>

<td className="border p-2">
  {compra.unidad_compra || "-"}
</td>
             
              <td className="border p-2">
                $
                {Number(
                  compra.total?.value ||
                  compra.total ||
                  0
                ).toLocaleString()}
              </td>

              <td className="border p-2">
                {compra.metodo_pago || "-"}
              </td>

              <td className="border p-2">
                {compra.estado || "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
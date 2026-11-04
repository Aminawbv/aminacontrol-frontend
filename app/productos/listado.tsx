"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductosListado() {

  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {

const cargarProductos = async () => {

  try {

    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    const response = await axios.get(
      "https://aminacontrol-api-729925860477.us-central1.run.app/productos",
      {
        params: {
          empresa_id: usuario.empresa_id
        }
      }
    );

    console.log("PRODUCTOS", response.data);

    setProductos(response.data);

  } catch (error) {

    console.error(error);

  }

};

    cargarProductos();

  }, []);

  return (

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Productos Registrados
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Producto
            </th>

            <th className="border p-2">
              Tipo
            </th>

            <th className="border p-2">
  Precio Venta
</th>  

          </tr>

        </thead>

        <tbody>

          {productos.map((producto) => (

            <tr key={producto.id_producto}>

              <td className="border p-2">
                {producto.nombre}
              </td>

              <td className="border p-2">
  $
  {Number(
    producto.precio_venta || 0
  ).toLocaleString()}
</td>

              <td className="border p-2">

                {producto.tipo_producto === "ELABORADO" ? (

                  <span className="text-green-600 font-bold">
                    Elaborado
                  </span>

                ) : (

                  <span className="text-blue-600 font-bold">
                    Reventa
                  </span>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
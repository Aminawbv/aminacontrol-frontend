"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductosListado() {

  const [productos, setProductos] = useState<any[]>([]);
  const [editando, setEditando] =
  useState<any>(null);

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

const eliminarProducto = async (
  idProducto: string
) => {

  const confirmar = confirm(
    "¿Desea eliminar este producto?"
  );

  if (!confirmar) return;

  try {

    await axios.delete(
      `https://aminacontrol-api-729925860477.us-central1.run.app/productos/${idProducto}`
    );

    setProductos(
      productos.filter(
        (p) =>
          p.id_producto !== idProducto
      )
    );

  } catch (error) {

    console.error(error);

  }

};

const editarProducto = async (
  producto: any
) => {

  const nombre = prompt(
    "Nombre producto",
    producto.nombre
  );

  if (!nombre) return;

  const precio = prompt(
    "Precio venta",
    producto.precio_venta
  );

  if (!precio) return;

  await axios.put(
    `https://aminacontrol-api-729925860477.us-central1.run.app/productos/${producto.id_producto}`,
    {
      nombre,
      precio_venta: Number(precio),
      tipo_producto:
        producto.tipo_producto
    }
  );

  location.reload();

};

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
<th className="border p-2">
  Acciones
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

<td className="border p-2">

  <button
    onClick={() =>
      editarProducto(
        producto
      )
    }
    className="bg-yellow-600 text-white px-2 py-1 rounded mr-2"
  >
    Editar
  </button>

  <button
    onClick={() =>
      eliminarProducto(
        producto.id_producto
      )
    }
    className="bg-red-600 text-white px-2 py-1 rounded"
  >
    Eliminar
  </button>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
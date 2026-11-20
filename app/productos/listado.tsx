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

    <div className="list-card mt-8">

      <h2 className="text-xl font-bold mb-6">
        Productos Registrados
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Producto
            </th>

            <th className="p-3 text-left">
              Tipo
            </th>

            <th className="p-3 text-left">
              Precio Venta
            </th>

            <th className="p-3 text-left">
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {productos.map((producto) => (

            <tr
              key={producto.id_producto}
              className="hover:bg-slate-50"
            >

              <td className="p-3 font-medium">
                {producto.nombre}
              </td>

              <td className="p-3">

                {producto.tipo_producto === "ELABORADO" ? (

                  <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-[#E8FAF7]
                    text-[#12B7A6]
                    "
                  >
                    Elaborado
                  </span>

                ) : (

                  <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-[#EEF5FF]
                    text-[#4F83CC]
                    "
                  >
                    Reventa
                  </span>

                )}

              </td>

              <td className="p-3 font-semibold">

                $
                {Number(
  producto.precio_venta || 0
).toLocaleString("es-CL")}

              </td>

              <td className="p-3">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      editarProducto(
                        producto
                      )
                    }
                    className="btn-edit"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      eliminarProducto(
                        producto.id_producto
                      )
                    }
                    className="btn-delete"
                  >
                    Eliminar
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
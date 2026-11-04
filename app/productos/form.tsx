"use client";

import { useState } from "react";
import axios from "axios";

export default function ProductosForm() {

  const [nombre, setNombre] = useState("");

  const [precioVenta, setPrecioVenta] = useState("");

  const [tipoProducto, setTipoProducto] =
    useState("ELABORADO");

  const guardar = async () => {

    try {

      const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
      );

      await axios.post(
        "https://aminacontrol-api-729925860477.us-central1.run.app/productos",
        {
          empresa_id: usuario.empresa_id,
          nombre,
          precio_venta: Number(precioVenta),
          tipo_producto: tipoProducto
        }
      );

      alert("Producto registrado");

      location.reload();

   } catch (error: any) {

  console.error(
    "ERROR PRODUCTO:",
    error?.response?.data
  );

  alert(
    JSON.stringify(
      error?.response?.data,
      null,
      2
    )
  );

}

  };

  return (

    <div className="space-y-4">

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Precio Venta"
        value={precioVenta}
        onChange={(e) =>
          setPrecioVenta(e.target.value)
        }
        className="border p-2 w-full"
      />

      <select
        value={tipoProducto}
        onChange={(e) =>
          setTipoProducto(e.target.value)
        }
        className="border p-2 w-full"
      >

        <option value="ELABORADO">
          Elaborado
        </option>

        <option value="REVENTA">
          Reventa
        </option>

      </select>

      <button
        onClick={guardar}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>

    </div>

  );

}
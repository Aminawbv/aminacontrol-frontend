"use client";

import { useState } from "react";
import axios from "axios";

export default function ProductosForm() {

  const [nombre, setNombre] = useState("");

  const [precioVenta, setPrecioVenta] =
    useState("");

  const [costoUnitario, setCostoUnitario] =
    useState("");

  const [stockInicial, setStockInicial] =
    useState("");

  const [stockMinimo, setStockMinimo] =
    useState("");

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

          precio_venta:
            Number(precioVenta),

          costo_unitario:
            tipoProducto === "REVENTA"
              ? Number(costoUnitario)
              : 0,

          stock_inicial:
            Number(stockInicial),

          stock_minimo:
            Number(stockMinimo),

          tipo_producto:
            tipoProducto
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

    <div className="form-card">

      <div className="mb-6 form-field">

        <label className="block mb-2">
          Nombre
        </label>

        <input
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          className="input"
          placeholder="Nombre del producto"
        />

      </div>

      <div className="mb-6 form-field">

        <label className="block mb-2">
          Precio Venta
        </label>

        <input
          type="number"
          value={precioVenta}
          onChange={(e) =>
            setPrecioVenta(
              e.target.value
            )
          }
          className="input"
          placeholder="0"
        />

      </div>

      <div className="mb-6 form-field">

        <label className="block mb-2">
          Tipo de Producto
        </label>

        <select
          value={tipoProducto}
          onChange={(e) =>
            setTipoProducto(
              e.target.value
            )
          }
          className="input"
        >

          <option value="ELABORADO">
            Elaborado
          </option>

          <option value="REVENTA">
            Reventa
          </option>

        </select>

      </div>

      {tipoProducto === "REVENTA" && (

        <div className="mb-6 form-field">

          <label className="block mb-2">
            Costo Unitario
          </label>

          <input
            type="number"
            value={costoUnitario}
            onChange={(e) =>
              setCostoUnitario(
                e.target.value
              )
            }
            className="input"
            placeholder="0"
          />

        </div>

      )}

      <div className="mb-6 form-field">

        <label className="block mb-2">
          Stock Inicial
        </label>

        <input
          type="number"
          value={stockInicial}
          onChange={(e) =>
            setStockInicial(
              e.target.value
            )
          }
          className="input"
          placeholder="0"
        />

      </div>

      <div className="mb-6 form-field">

        <label className="block mb-2">
          Stock Mínimo
        </label>

        <input
          type="number"
          value={stockMinimo}
          onChange={(e) =>
            setStockMinimo(
              e.target.value
            )
          }
          className="input"
          placeholder="0"
        />

      </div>

      <button
        onClick={guardar}
        className="btn-primary"
      >
        Registrar Producto
      </button>

    </div>

  );

}
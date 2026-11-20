"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VentasListado() {

  const [ventas, setVentas] = useState<any[]>([]);

  const [ventaSeleccionada, setVentaSeleccionada] =
    useState<any>(null);

  const [detalleVenta, setDetalleVenta] =
    useState<any[]>([]);

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const verDetalle = async (
    idVenta: string
  ) => {

    try {

      const response = await axios.get(
        `https://aminacontrol-api-729925860477.us-central1.run.app/ventas/${idVenta}`
      );

      setVentaSeleccionada(
        response.data.venta
      );

      setDetalleVenta(
        response.data.detalle
      );

      setMostrarModal(true);

    } catch (error) {

      console.error(
        "Error detalle venta:",
        error
      );

      alert(
        "Error al obtener detalle"
      );

    }

  };

  useEffect(() => {

    const cargarVentas = async () => {

      try {

        const usuario = JSON.parse(
          localStorage.getItem("usuario") || "{}"
        );

        const response = await axios.get(
          "https://aminacontrol-api-729925860477.us-central1.run.app/ventas",
          {
            params: {
              empresa_id: usuario.empresa_id
            }
          }
        );

        setVentas(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    cargarVentas();

  }, []);

  return (

    <div className="list-card mt-8">

      <h2 className="text-xl font-bold mb-6">
        Ventas Registradas
      </h2>

      <table className="w-full">

        <thead>

          <tr>

            <th className="p-3 text-left">
              Fecha
            </th>

            <th className="p-3 text-left">
              Productos
            </th>

            <th className="p-3 text-left">
              Medio Pago
            </th>

            <th className="p-3 text-left">
              Total
            </th>

            <th className="p-3 text-left">
              Detalle
            </th>

          </tr>

        </thead>

        <tbody>

          {ventas.map((venta) => (

            <tr
              key={venta.id_venta}
              className="hover:bg-slate-50"
            >

              <td className="p-3 whitespace-nowrap">

                {venta.fecha?.value ||
                  venta.fecha}

              </td>

              <td className="p-3">

                {venta.productos}

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

                  {venta.medio_pago === "transferencia"
                    ? "Transferencia"
                    : venta.medio_pago === "efectivo"
                    ? "Efectivo"
                    : venta.medio_pago === "tarjeta"
                    ? "Tarjeta"
                    : venta.medio_pago}

                </span>

              </td>

              <td className="p-3 font-semibold">

                $

                {Number(
                  venta.total?.value ||
                  venta.total ||
                  0
                ).toLocaleString()}

              </td>

              <td className="p-3">

                <button
                  type="button"
                  onClick={() =>
                    verDetalle(
                      venta.id_venta
                    )
                  }
                  className="btn-view"
                >
                  Ver
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {mostrarModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div
            className="
            bg-white
            p-6
            rounded-2xl
            shadow-lg
            w-[700px]
            max-h-[80vh]
            overflow-auto
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              Detalle Venta
            </h2>

            <div className="mb-6 space-y-2">

              <p>
                <strong>ID:</strong>{" "}
                {ventaSeleccionada?.id_venta}
              </p>

              <p>
                <strong>Fecha:</strong>{" "}
                {ventaSeleccionada?.fecha?.value ||
                  ventaSeleccionada?.fecha}
              </p>

              <p>
                <strong>Medio Pago:</strong>{" "}
                {ventaSeleccionada?.medio_pago}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                $
                {Number(
                  ventaSeleccionada?.total?.value ||
                  ventaSeleccionada?.total ||
                  0
                ).toLocaleString()}
              </p>

            </div>

            <table className="w-full">

              <thead>

                <tr>

                  <th className="p-3 text-left">
                    Producto
                  </th>

                  <th className="p-3 text-left">
                    Cantidad
                  </th>

                  <th className="p-3 text-left">
                    Precio Unitario
                  </th>

                </tr>

              </thead>

              <tbody>

                {detalleVenta.map(
                  (item, index) => (

                    <tr key={index}>

                      <td className="p-3">
                        {item.nombre}
                      </td>

                      <td className="p-3">
                        {item.cantidad}
                      </td>

                      <td className="p-3">

                        $
                        {Number(
                          item.precio_unitario ||
                          0
                        ).toLocaleString("es-CL")}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            <div className="mt-6">

              <button
                type="button"
                onClick={() =>
                  setMostrarModal(false)
                }
                className="btn-delete"
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}
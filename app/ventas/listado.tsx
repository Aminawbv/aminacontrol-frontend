"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function VentasListado() {

  const [ventas, setVentas] = useState<any[]>([]);

  const [ventaSeleccionada, setVentaSeleccionada] = useState<any>(null);

  const [detalleVenta, setDetalleVenta] = useState<any[]>([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const verDetalle = async (idVenta: string) => {

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

      alert("Error al obtener detalle");

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

    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4">
        Ventas Registradas
      </h2>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100 text-black">

            <th className="border p-2">
              Fecha
            </th>

            <th className="border p-2">
              Productos
            </th>

            <th className="border p-2">
              Medio Pago
            </th>

            <th className="border p-2">
              Total
            </th>

            <th className="border p-2">
              Detalle
            </th>

          </tr>

        </thead>

        <tbody>

          {ventas.map((venta) => (

            <tr key={venta.id_venta}>

              <td className="border p-2">
                {venta.fecha?.value ||
                  venta.fecha}
              </td>

              <td className="border p-2">
                {venta.productos}
              </td>

              <td className="border p-2">
                {venta.medio_pago}
              </td>

              <td className="border p-2">
                $
                {Number(
                  venta.total?.value ||
                  venta.total ||
                  0
                ).toLocaleString()}
              </td>

              <td className="border p-2">

                <button
                  type="button"
                  onClick={() =>
                    verDetalle(
                      venta.id_venta
                    )
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
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

          <div className="bg-white p-6 rounded w-[700px] max-h-[80vh] overflow-auto">

            <h2 className="text-2xl font-bold mb-4 text-black">
              Detalle Venta
            </h2>

            <div className="mb-4 text-black">

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

            <table className="w-full border text-black">

              <thead>

                <tr className="bg-slate-100">

                  <th className="border p-2">
                    Producto
                  </th>

                  <th className="border p-2">
                    Cantidad
                  </th>

                  <th className="border p-2">
                    Precio Unitario
                  </th>

                </tr>

              </thead>

              <tbody>

                {detalleVenta.map(
                  (item, index) => (

                    <tr key={index}>

                      <td className="border p-2">
                        {item.nombre}
                      </td>

                      <td className="border p-2">
                        {item.cantidad}
                      </td>

                      <td className="border p-2">
                        $
                        {Number(
                          item.precio_unitario?.value ||
                          item.precio_unitario ||
                          0
                        ).toLocaleString()}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            <div className="mt-4">

              <button
                type="button"
                onClick={() =>
                  setMostrarModal(false)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
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
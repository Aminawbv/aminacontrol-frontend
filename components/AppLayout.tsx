"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  Building2,
  Users,
  LayoutDashboard,
  Truck,
  Package,
  Boxes,
  ShoppingCart,
  Receipt,
  ClipboardList,
  BookOpen,
  Factory,
  BarChart3
} from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    router.replace("/login");

  };

  if (pathname === "/login") {
    return <>{children}</>;
  }

const itemClass = (path: string) =>
  pathname === path
    ? "flex items-center gap-3 bg-[#D9FFFB] border border-[#A7F7EF] px-4 py-3 rounded-xl"
    : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100";

const iconClass = (path: string) =>
  pathname === path
    ? "text-[#12B7A6] stroke-[2.5]"
    : "text-slate-400";

const textClass = (path: string) =>
  pathname === path
    ? "text-[#12B7A6] font-semibold"
    : "text-slate-600";

  return (

    <div className="flex min-h-screen bg-[#F6F7F9]">

      <aside
        className="
        w-64
        bg-white
        border-r
        border-gray-200
        p-5
        flex
        flex-col
        "
      >

<div
  className="
  flex
  items-center
  gap-0
  mb-10
  pl-1
  "
>

<Image
  src="/favicon.ico"
  alt="Amina"
  width={56}
  height={56}
/>

  <span
    className="
    text-3xl
    font-bold
    text-[#12B7A6]
    leading-none
    "
  >
    Amina
  </span>

</div>

        <nav className="flex-1 space-y-1">

          <Link
            href="/dashboard"
            className={itemClass("/dashboard")}
          >
            <LayoutDashboard
              size={22}
              className={iconClass("/dashboard")}
            />
            <span className={textClass("/dashboard")}>
  Dashboard
</span>
          </Link>

          <Link
            href="/empresas"
            className={itemClass("/empresas")}
          >
            <Building2
              size={22}
              className={iconClass("/empresas")}
            />
            <span className={textClass("/empresas")}>
  Empresas
</span>
          </Link>

          <Link
            href="/usuarios"
            className={itemClass("/usuarios")}
          >
            <Users
              size={22}
              className={iconClass("/usuarios")}
            />
            <span className={textClass("/usuarios")}>
  Usuarios
</span>
          </Link>

          <Link
            href="/clientes"
            className={itemClass("/clientes")}
          >
            <Users
              size={22}
              className={iconClass("/clientes")}
            />
            <span className={textClass("/clientes")}>
  Clientes
</span>
          </Link>

          <Link
            href="/proveedores"
            className={itemClass("/proveedores")}
          >
            <Truck
              size={22}
              className={iconClass("/proveedores")}
            />
            <span className={textClass("/proveedores")}>
  Proveedores
</span>
          </Link>

          <Link
            href="/productos"
            className={itemClass("/productos")}
          >
            <Package
              size={22}
              className={iconClass("/productos")}
            />
            <span className={textClass("/productos")}>
  Productos
</span>
          </Link>

          <Link
            href="/insumos"
            className={itemClass("/insumos")}
          >
            <Boxes
              size={22}
              className={iconClass("/insumos")}
            />
            <span className={textClass("/insumos")}>
  Insumos
</span>
          </Link>

          <Link
            href="/compras"
            className={itemClass("/compras")}
          >
            <ShoppingCart
              size={22}
              className={iconClass("/compras")}
            />
            <span className={textClass("/compras")}>
  Compras
</span>
          </Link>

          <Link
            href="/ventas"
            className={itemClass("/ventas")}
          >
            <Receipt
              size={22}
              className={iconClass("/ventas")}
            />
            <span className={textClass("/ventas")}>
  Ventas
</span>
          </Link>

          <Link
            href="/inventario"
            className={itemClass("/inventario")}
          >
            <ClipboardList
              size={22}
              className={iconClass("/inventario")}
            />
            <span className={textClass("/inventario")}>
  Inventario
</span>
          </Link>

          <Link
            href="/recetas"
            className={itemClass("/recetas")}
          >
            <BookOpen
              size={22}
              className={iconClass("/recetas")}
            />
            <span className={textClass("/recetas")}>
  Recetas
</span>
          </Link>

          <Link
            href="/produccion"
            className={itemClass("/produccion")}
          >
            <Factory
              size={22}
              className={iconClass("/produccion")}
            />
            <span className={textClass("/produccion")}>
  Producción
</span>
          </Link>

          <Link
            href="/rentabilidad"
            className={itemClass("/rentabilidad")}
          >
            <BarChart3
              size={22}
              className={iconClass("/rentabilidad")}
            />
            <span className={textClass("/rentabilidad")}>
  Rentabilidad
</span>
          </Link>

        </nav>

        <button
          onClick={logout}
          className="
          mt-6
          w-full
          bg-[#5DC1B9]
          hover:bg-[#4DAAA3]
          text-white
          font-medium
          rounded-xl
          py-3
          "
        >
          Cerrar sesión
        </button>

      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>

  );

}
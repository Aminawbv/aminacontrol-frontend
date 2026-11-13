"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-slate-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-6">
          Amina
        </h1>

        <nav className="space-y-4">
<Link
  href="/empresas"
  className={
    pathname === "/empresas"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }
>
  🏢 Empresas
</Link>
<Link
  href="/usuarios"
  className={
    pathname === "/usuarios"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }
>
  👤 Usuarios
</Link>
          <Link href="/dashboard" className={
    pathname === "/dashboard"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            🏠 Dashboard
          </Link>

          <Link href="/clientes" className={
    pathname === "/clientes"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            👥 Clientes
          </Link>

          <Link href="/proveedores" className={
    pathname === "/proveedores"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            🚚 Proveedores
          </Link>

<Link
  href="/productos"
  className={
    pathname === "/productos"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }
>
  📦 Productos
</Link>


                    <Link
  href="/insumos"
  className={
    pathname === "/insumos"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }
>
  📦 Insumos
</Link>

          
          <Link
  href="/compras"
  className={
    pathname === "/compras"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }
>
  🛒 Compras
</Link>

          <Link href="/ventas" className={
    pathname === "/ventas"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            💰 Ventas
          </Link>

          <Link href="/inventario" className={
    pathname === "/inventario"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            📋 Inventario
          </Link>

          <Link href="/recetas" className={
    pathname === "/recetas"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            📖 Recetas
          </Link>

          <Link href="/produccion" className={
    pathname === "/produccion"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }>
            🏭 Producción
          </Link>

<Link
  href="/rentabilidad"
  className={
    pathname === "/rentabilidad"
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "px-3 py-2"
  }
>
  💰 Rentabilidad
</Link>


        </nav>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>

      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}
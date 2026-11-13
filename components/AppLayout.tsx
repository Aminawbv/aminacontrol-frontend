"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }
>
  🏢 Empresas
</Link>
<Link
  href="/usuarios"
  className={
    pathname === "/usuarios"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }
>
  👤 Usuarios
</Link>
          <Link href="/dashboard" className={
    pathname === "/dashboard"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            🏠 Dashboard
          </Link>

          <Link href="/clientes" className={
    pathname === "/clientes"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            👥 Clientes
          </Link>

          <Link href="/proveedores" className={
    pathname === "/proveedores"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            🚚 Proveedores
          </Link>

<Link
  href="/productos"
  className={
    pathname === "/productos"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }
>
  📦 Productos
</Link>


                    <Link
  href="/insumos"
  className={
    pathname === "/insumos"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }
>
  📦 Insumos
</Link>

          
          <Link
  href="/compras"
  className={
    pathname === "/compras"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }
>
  🛒 Compras
</Link>

          <Link href="/ventas" className={
    pathname === "/ventas"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            💰 Ventas
          </Link>

          <Link href="/inventario" className={
    pathname === "/inventario"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            📋 Inventario
          </Link>

          <Link href="/recetas" className={
    pathname === "/recetas"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            📖 Recetas
          </Link>

          <Link href="/produccion" className={
    pathname === "/produccion"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
  }>
            🏭 Producción
          </Link>

<Link
  href="/rentabilidad"
  className={
    pathname === "/rentabilidad"
  ? "block bg-blue-600 text-white px-3 py-2 rounded"
  : "block px-3 py-2 hover:bg-slate-800 rounded"
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
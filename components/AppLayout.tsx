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
  className="block hover:text-blue-400"
>
  🏢 Empresas
</Link>
<Link
  href="/usuarios"
  className="block hover:text-blue-400"
>
  👤 Usuarios
</Link>
          <Link href="/dashboard" className="block hover:text-blue-400">
            🏠 Dashboard
          </Link>

          <Link href="/clientes" className="block hover:text-blue-400">
            👥 Clientes
          </Link>

          <Link href="/proveedores" className="block hover:text-blue-400">
            🚚 Proveedores
          </Link>

          <Link href="/insumos" className="block hover:text-blue-400">
            📦 Insumos
          </Link>

          <Link href="/compras" className="block hover:text-blue-400">
            🛒 Compras
          </Link>

          <Link href="/ventas" className="block hover:text-blue-400">
            💰 Ventas
          </Link>

          <Link href="/inventario" className="block hover:text-blue-400">
            📋 Inventario
          </Link>

          <Link href="/recetas" className="block hover:text-blue-400">
            📖 Recetas
          </Link>

          <Link href="/produccion" className="block hover:text-blue-400">
            🏭 Producción
          </Link>

          <Link href="/rentabilidad">
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
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/services", label: "Услуги" },
    { to: "/steps", label: "Этапы работы" },
    { to: "/contacts", label: "Контакты" },
  ];

  const linkClass =
    "text-zinc-700 hover:text-blue-600 transition font-medium";

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 hover:text-zinc-700 transition"
        >
          ПТО / ППР
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={linkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-2xl text-zinc-700 focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeMenu}
          />

          <div
            className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-zinc-800">
                Меню
              </span>
              <button
                onClick={closeMenu}
                className="text-2xl text-zinc-700"
                aria-label="Закрыть меню"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-base">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

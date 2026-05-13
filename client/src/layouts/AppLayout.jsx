import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiActivity, FiBarChart2, FiClock, FiGrid, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/history", label: "History", icon: FiClock },
  { to: "/analytics", label: "Analytics", icon: FiBarChart2 },
  { to: "/profile", label: "Profile", icon: FiUser }
];

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[264px_1fr]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(20rem,86vw)] flex-col border-r border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:translate-x-0 lg:p-5 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 text-lg font-black text-slate-950">
            TA
          </div>
          <div>
            <p className="text-lg font-bold">TextAlchemy</p>
            <p className="text-xs text-slate-400">AI text studio</p>
          </div>
        </div>

        <nav className="mt-9 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-300/15"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-5">
          <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {open && <button className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}

      <main className="min-w-0 px-3 py-4 sm:px-6 lg:px-8 lg:py-7">
        <header className="sticky top-0 z-20 -mx-3 mb-5 flex items-center justify-between border-b border-white/10 bg-slate-950/72 px-3 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden">
          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.08]"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <FiMenu />
          </button>
          <div className="flex items-center gap-2 font-bold">
            <FiActivity className="text-cyan-300" />
            TextAlchemy
          </div>
        </header>

        <motion.div className="mx-auto w-full max-w-7xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AppLayout;

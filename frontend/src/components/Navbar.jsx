import { Link, useLocation } from "react-router-dom";
import { Sparkles, History, Info, Home } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/generate", label: "Generate", icon: Sparkles },
  { to: "/history", label: "History", icon: History },
  { to: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="page-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold gradient-text">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="hidden sm:inline">WCGAN-GP</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-purple-600/20 text-purple-300"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
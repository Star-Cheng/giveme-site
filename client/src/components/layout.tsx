import { useState, useEffect, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/products", label: "产品" },
  { path: "/technology", label: "技术" },
  { path: "/solutions", label: "方案" },
  { path: "/about", label: "关于" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header — Unitree style: clean, logo text left, nav right */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Brand — Arial Bold Italic, like the SVG reference */}
          <Link to="/" className="shrink-0 select-none" aria-label="Ultra Rock 首页">
            <span
              className="text-xl sm:text-2xl font-bold italic tracking-tight text-[#0f172a]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Ultra Rock
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7 text-[13px]">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive ? "text-[#0f172a] font-medium" : "text-[#64748b] hover:text-[#0f172a]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="text-[13px] px-5 py-2 rounded-full border border-[#e2e8f0] text-[#0f172a] hover:border-[#0f172a] transition-colors font-medium"
            >
              联系
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-[#0f172a]"
            aria-label="菜单"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-2xl font-medium transition-all duration-300 ${
                  isActive ? "text-[#7c3aed]" : "text-[#0f172a]"
                } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`
              }
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 px-8 py-3 rounded-full border-2 border-[#0f172a] text-[#0f172a] font-medium"
          >
            联系
          </Link>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      {/* Footer — Unitree style: clean grid of links */}
      <footer className="bg-[#f8fafc] mt-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <span
                className="text-lg font-bold italic tracking-tight text-[#0f172a]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Ultra Rock
              </span>
              <p className="text-xs text-[#64748b] mt-2">疾石科技</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#0f172a] mb-4">产品</p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li>RockSolid R-1</li>
                <li>FluxBeam F-1</li>
                <li>UltraLight U-1</li>
                <li>RockCore 石核</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-[#0f172a] mb-4">方案</p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li>半导体</li>
                <li>医疗器械</li>
                <li>航空航天</li>
                <li>科研定制</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-[#0f172a] mb-4">联系</p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li><a href="mailto:fccgccn@gmail.com" className="hover:text-[#0f172a] transition-colors">fccgccn@gmail.com</a></li>
                <li><Link to="/contact" className="hover:text-[#0f172a] transition-colors">商务咨询 →</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 pt-8 border-t border-[#e2e8f0] flex justify-between text-xs text-[#94a3b8]">
            <span>© {new Date().getFullYear()} Ultra Rock 疾石科技</span>
            <span>Ultra Speed. Rock Solid.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

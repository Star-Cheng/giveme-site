import { useState, useEffect, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "首页" },
  { path: "/products", label: "产品" },
  { path: "/technology", label: "技术" },
  { path: "/solutions", label: "方案" },
  { path: "/about", label: "关于" },
  { path: "/news", label: "动态" },
  { path: "/careers", label: "招聘" },
  { path: "/contact", label: "联系" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container-custom flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-serif text-lg sm:text-xl font-medium tracking-wide hover:text-brand transition-colors shrink-0"
          >
            <span className="block leading-tight">智石激光</span>
            <span className="block text-[10px] sm:text-xs font-sans font-normal tracking-widest text-muted-foreground uppercase">
              ZeStone Laser
            </span>
          </Link>

          <ul className="hidden lg:flex flex-wrap items-center justify-end gap-x-4 gap-y-1 xl:gap-x-6 text-[13px] tracking-wide">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `link-underline transition-colors ${
                      isActive
                        ? "text-brand font-medium"
                        : "text-muted-foreground hover:text-foreground font-light"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 hover:bg-border-light rounded-lg transition-colors"
            aria-label="切换菜单"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-16 px-6 overflow-y-auto">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `font-serif text-2xl sm:text-3xl font-medium transition-all duration-300 ${
                  isActive ? "text-brand" : "text-foreground"
                } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`
              }
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border-light py-16 mt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-xl font-medium mb-3">智石激光</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">ZeStone Laser</p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
                以 AI 技术打造高精度智能激光器。开放、创新、自由、精益求精——不做工具人，做领域的开创者。
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wider uppercase">导航</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wider uppercase">联系</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li>
                  <a href="mailto:bd@zestone-laser.com" className="hover:text-brand transition-colors">
                    bd@zestone-laser.com
                  </a>
                  <span className="block text-xs mt-0.5 opacity-80">商务与技术销售（示例）</span>
                </li>
                <li>
                  <a href="tel:+864008008800" className="hover:text-brand transition-colors">
                    +86 400-800-8800
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brand transition-colors">
                    表单与合作入口 →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-light">
              © {new Date().getFullYear()} 智石激光 ZeStone Laser. 保留所有权利。
            </p>
            <p className="text-xs text-muted-foreground font-light">
              光子与算法，同频于产线
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

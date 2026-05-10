import { useState, useEffect, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const navKeys = ["products", "technology", "solutions", "about"] as const;

export function Layout({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md py-3 ${
          isScrolled ? "border-b border-slate-100 shadow-sm" : ""
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Brand — Arial Bold Italic, like the SVG reference */}
          <Link to="/" className="shrink-0 select-none" aria-label={t("layout.logo.ariaLabel")}>
            <span
              className="text-xl sm:text-2xl font-bold italic tracking-tight text-[#0f172a]"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            >
              Ultra Rock
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-7 text-[13px]">
              {navKeys.map((k) => (
                <li key={k}>
                  <NavLink
                    to={`/${k}`}
                    end={k === "products" ? false : undefined}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive ? "text-[#0f172a] font-medium" : "text-[#64748b] hover:text-[#0f172a]"
                      }`
                    }
                  >
                    {t(`nav.${k}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="text-[13px] px-5 py-2 rounded-full border border-[#e2e8f0] text-[#0f172a] hover:border-[#0f172a] transition-colors font-medium"
            >
              {t("nav.contact")}
            </Link>
            <button
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="text-[11px] px-3 py-1.5 rounded-full border border-[#185abd] text-[#185abd] font-medium hover:bg-[#185abd] hover:text-white transition-colors ml-2"
            >
              {t("lang.switch")}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-[#0f172a]"
            aria-label={t("layout.menu.ariaLabel")}
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
          {navKeys.map((k, index) => (
            <NavLink
              key={k}
              to={`/${k}`}
              className={({ isActive }) =>
                `text-2xl font-medium transition-all duration-300 ${
                  isActive ? "text-[#185abd]" : "text-[#0f172a]"
                } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`
              }
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {t(`nav.${k}`)}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 px-8 py-3 rounded-full border-2 border-[#0f172a] text-[#0f172a] font-medium"
          >
            {t("nav.contact")}
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
              <p className="text-xs text-[#64748b] mt-2">{t("footer.brand.cn")}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#0f172a] mb-4">{t("footer.products")}</p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li>{t("footer.product.1")}</li>
                <li>{t("footer.product.2")}</li>
                <li>{t("footer.product.3")}</li>
                <li>{t("footer.product.4")}</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-[#0f172a] mb-4">{t("footer.solutions")}</p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li>{t("footer.solution.1")}</li>
                <li>{t("footer.solution.2")}</li>
                <li>{t("footer.solution.3")}</li>
                <li>{t("footer.solution.4")}</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-[#0f172a] mb-4">{t("footer.contact")}</p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li><a href="mailto:ur@ultrarock.net" className="hover:text-[#0f172a] transition-colors">{t("footer.contact.email")}</a></li>
                <li><Link to="/contact" className="hover:text-[#0f172a] transition-colors">{t("footer.contact.inquiry")}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 pt-8 border-t border-[#e2e8f0] flex justify-between text-xs text-[#94a3b8]">
            <span>{t("footer.copyright", { year: String(new Date().getFullYear()) })}</span>
            <span>{t("footer.slogan")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

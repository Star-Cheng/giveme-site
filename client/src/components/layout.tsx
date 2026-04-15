import { useState, useEffect, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "首页" },
  { path: "/about", label: "关于我" },
  { path: "/portfolio", label: "作品展示" },
  { path: "/contact", label: "联系方式" },
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
      {/* 导航栏 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-xl font-medium tracking-wide hover:text-brand transition-colors"
          >
            陈思远
          </Link>

          {/* 桌面导航 */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `text-sm font-light tracking-wide link-underline transition-colors ${
                      isActive
                        ? "text-brand"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 hover:bg-border-light rounded-lg transition-colors"
            aria-label="切换菜单"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>
      </header>

      {/* 移动端菜单 */}
      <div
        className={`fixed inset-0 z-40 bg-background md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `font-serif text-3xl font-medium transition-all duration-300 ${
                  isActive ? "text-brand" : "text-foreground"
                } ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`
              }
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 主内容 */}
      <main className="flex-1">{children}</main>

      {/* 页脚 */}
      <footer className="border-t border-border-light py-16 mt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* 品牌 */}
            <div>
              <h3 className="font-serif text-xl font-medium mb-4">陈思远</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                专注品牌设计与数字体验的创意设计师，用设计讲述故事，用细节成就品质。
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wider uppercase">
                快速链接
              </h4>
              <ul className="space-y-3">
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

            {/* 联系方式 */}
            <div>
              <h4 className="text-sm font-medium mb-4 tracking-wider uppercase">
                联系方式
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:siyuan.chen@studio.com"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors font-light"
                  >
                    siyuan.chen@studio.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+8613912345678"
                    className="text-sm text-muted-foreground hover:text-brand transition-colors font-light"
                  >
                    +86 139 1234 5678
                  </a>
                </li>
                <li className="pt-2">
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-brand transition-colors"
                      aria-label="Dribbble"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.5a10.195 10.195 0 0 1 2.188 6.25c-.344-.625-.703-1.234-1.063-1.828a7.46 7.46 0 0 1-1.953 1.578c-1.156-1.281-2.672-2.25-4.5-2.578.797-1.109 1.406-2.375 1.766-3.734a7.482 7.482 0 0 1 3.562.312zm-3.25-.656c-.422 1.156-1.016 2.203-1.734 3.094-1.641-.375-3.234-.313-4.609.047-.234.063-.453.141-.672.219a12.546 12.546 0 0 1 3.234-2.484 6.54 6.54 0 0 1 3.781-.876zM5.5 7.875a6.47 6.47 0 0 0-.5 2.578c.938.063 1.906.281 2.828.656-.328 1.375-.703 2.719-1.125 3.906a6.47 6.47 0 0 0-2.5-.875c.078-.859.469-1.656 1.031-2.297a6.545 6.545 0 0 1 .266-3.969zM5.969 17c.281.016.563.016.844 0 .047-1.266.172-2.5.375-3.688.203-1.188.5-2.328.891-3.406-.734-.297-1.5-.453-2.281-.453-.5 0-.984.078-1.453.219.406 1.422 1.125 2.766 2.063 3.938-.125.875-.281 1.75-.469 2.609.188-.031.359-.125.53-.219zm2.156-7.125c.938.859 1.703 1.891 2.266 3.063a20.22 20.22 0 0 0-4.406 1.281 10.32 10.32 0 0 1-.469-2.625 6.48 6.48 0 0 1 2.609-1.719zm-3.125 2.781a10.27 10.27 0 0 1-.094-2.156c1.172-.078 2.266-.016 3.297.187-1.031.922-1.891 2.016-2.547 3.25a15.42 15.42 0 0 0-1.406-.563 6.543 6.543 0 0 1 .75-.719zm2.016 1.5a6.557 6.557 0 0 1 4.875-2.125c-.328.969-.719 1.906-1.156 2.797-1.703.469-3.359.672-4.859.656a6.56 6.56 0 0 1 1.14-1.328z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-brand transition-colors"
                      aria-label="Behance"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.9c.54 0 .97-.13 1.29-.41.32-.28.48-.67.48-1.18 0-.3-.05-.55-.16-.75-.11-.2-.26-.36-.44-.47-.19-.11-.4-.18-.64-.23-.24-.05-.49-.07-.74-.07H3.12v3.12h3.42v.01zm.17 5.39c.27 0 .52-.03.76-.1.24-.06.46-.17.65-.31.19-.15.34-.35.44-.6.1-.25.16-.56.16-.93 0-.72-.21-1.24-.63-1.55-.42-.31-1-.47-1.73-.47H3.12v3.96h3.6v.01zm10.803.1c.41.39.93.59 1.56.59.46 0 .88-.12 1.25-.35.37-.24.65-.47.84-.71h2.14c-.37.93-.94 1.64-1.71 2.13-.77.49-1.7.74-2.79.74-.85 0-1.62-.14-2.31-.42-.69-.28-1.29-.68-1.77-1.19-.49-.51-.87-1.13-1.13-1.86-.27-.73-.4-1.54-.4-2.43 0-.84.13-1.62.4-2.34.27-.73.64-1.36 1.13-1.88.49-.52 1.07-.93 1.75-1.22.68-.29 1.43-.43 2.24-.43.88 0 1.67.17 2.37.51.7.34 1.28.8 1.74 1.38.46.58.79 1.24.99 1.98.2.74.27 1.52.22 2.32h-6.44c.04.63.23 1.11.55 1.43.33.32.77.48 1.32.48.4 0 .72-.08.98-.26.26-.17.47-.45.64-.83h2.17c-.15.68-.44 1.28-.89 1.78l.01.01zm2.79-5.12c-.03-.56-.15-.98-.37-1.28-.22-.29-.53-.44-.92-.44-.42 0-.75.15-.98.44-.23.29-.37.72-.4 1.28h2.67zm-7.03-5.39h5.01v1.26h-5.01V4.8z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-brand transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="mt-12 pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-light">
              © 2024 陈思远. 保留所有权利.
            </p>
            <p className="text-xs text-muted-foreground font-light">
              用心设计，用细节说话
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

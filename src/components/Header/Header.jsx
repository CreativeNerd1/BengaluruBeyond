import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "./Header.css";

const Header = () => {
  const { siteInfo, navLinks: apiNavLinks, loading } = useSiteData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Transform API nav links to component format
  const navLinks = apiNavLinks.map(link => ({
    name: link.label || link.name,
    path: link.path || link.link,
    icon: link.icon,
    dropdown: link.children?.length > 0 ? link.children.map(child => ({
      name: child.label || child.name,
      path: child.path || child.link,
      icon: child.icon || '📍',
    })) : null,
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleHashLinkClick = (path) => {
    const hash = path.includes("#") ? path.slice(path.indexOf("#") + 1) : "";
    handleLinkClick();

    if (!hash) {
      navigate(path || "/");
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/#${hash}`);
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        const routeFallback = {
          about: "/about",
          contact: "/contact",
          privacy: "/privacy-policy",
          terms: "/terms",
        };

        if (routeFallback[hash]) {
          navigate(routeFallback[hash]);
        }
      }, 120);
      return;
    }

    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const routeFallback = {
      about: "/about",
      contact: "/contact",
      privacy: "/privacy-policy",
      terms: "/terms",
    };

    if (routeFallback[hash]) {
      navigate(routeFallback[hash]);
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <span className="logo-icon">🚖</span>
          <span className="logo-text">{siteInfo.name}</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
        </button>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li 
                key={link.name} 
                className={`nav-item ${link.dropdown ? "has-dropdown" : ""}`}
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <>
                    <button 
                      className="nav-link dropdown-trigger"
                      onClick={() => toggleDropdown(link.name)}
                      aria-expanded={activeDropdown === link.name}
                    >
                      {link.name}
                      <span className={`dropdown-arrow ${activeDropdown === link.name ? "open" : ""}`}>▼</span>
                    </button>
                    <ul className={`dropdown-menu ${activeDropdown === link.name ? "show" : ""}`}>
                      {link.dropdown.map((item) => (
                        <li key={item.name}>
                          <Link 
                            to={item.path} 
                            className="dropdown-link"
                            onClick={handleLinkClick}
                          >
                            <span className="dropdown-icon">{item.icon}</span>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  link.path?.includes("#") ? (
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => handleHashLinkClick(link.path)}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </li>
            ))}
          </ul>
          <a href={`tel:${siteInfo.phone}`} className="header-cta">
            <span className="cta-icon">📞</span>
            Call Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

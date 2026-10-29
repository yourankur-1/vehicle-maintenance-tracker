
import { useEffect, useRef, useState } from "react";

function Header({ theme, onToggleTheme, user, onLogout }) {
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedUser, setSavedUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("vc-user")) || null;
    } catch {
      return null;
    }
  });

  const menuRef = useRef(null);
  const currentUser = user || savedUser;
  const initial =
    currentUser?.name?.trim()?.charAt(0)?.toUpperCase() || "V";

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = ".account-toolbar { display: none !important; }";
    document.head.appendChild(style);

    return () => style.remove();
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {
    setMenuOpen(false);

    if (typeof onLogout === "function") {
      onLogout();
    } else {
      localStorage.removeItem("vc-user");
      setSavedUser(null);
      window.location.reload();
    }
  }

  return (
    <header className="top-header">
      <div className="breadcrumb">
        <span>VehicleCare</span>
        <span className="breadcrumb-separator">/</span>
        <strong>Overview</strong>
      </div>

      <div className="header-actions">
        <span className="profile-label">Vehicle Manager</span>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          title={`Switch to ${isDark ? "light" : "dark"} theme`}
        >
          <span>{isDark ? "☀️" : "🌙"}</span>
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <div className="profile-menu-wrap" ref={menuRef}>
          <button
            type="button"
            className="profile-avatar"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Account menu"
            aria-expanded={menuOpen}
            title="Account"
          >
            {initial}
          </button>

          {menuOpen && (
            <div className="profile-menu">
              <div className="profile-menu-user">
                <div className="profile-menu-avatar">{initial}</div>

                <div className="profile-menu-details">
                  <strong>
                    {currentUser?.name || "Vehicle Manager"}
                  </strong>
                  <span>{currentUser?.email || ""}</span>
                </div>
              </div>

              <div className="profile-menu-divider" />

              <button
                type="button"
                className="profile-menu-item"
                onClick={handleLogout}
              >
                <span>↪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

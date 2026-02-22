import { useState, useEffect } from "react";
import { authAPI } from "../services/api";

interface User {
  name: string;
  email: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);
  
  const handleLogout = () => {
    console.log("logout");
    
    window.location.replace("/login");
    authAPI.logout();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <>
      <header className="hdr-root">
        <div className="hdr-inner">
          {/* Logo */}
          <div className="hdr-logo">
            <span className="hdr-logo-dot" />
            Work Log (PLR Chambers (MoRTH))
          </div>

          {/* Right side */}
          <div className="hdr-right" style={{ zIndex: 100 }}>
            {(initials!=="??")&&<button
              className="hdr-avatar-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="User menu"
            >
              {initials}
            </button>}

            {menuOpen && (
              <>
                <div
                  className="hdr-backdrop"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="hdr-dropdown">
                  {user && (
                    <div className="hdr-user-info">
                      <div className="hdr-user-name">{user.name}</div>
                      <div className="hdr-user-email">{user.email}</div>
                    </div>
                  )}
                  
                </div>
              </>
            )}
            {(initials!=="??")&&<button className="hdr-logout-btn" onClick={handleLogout}>
                    <svg
                      className="hdr-logout-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Log out
                  </button>}
          </div>
        </div>
      </header>
    </>
  );
}

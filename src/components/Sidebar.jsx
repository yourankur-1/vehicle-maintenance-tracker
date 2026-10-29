
function Sidebar({ activePage, onPageChange }) {
  const menuItems = [
    { icon: "▦", label: "Dashboard" },
    { icon: "🚘", label: "My Vehicles" },
    { icon: "🔧", label: "Service Records" },
    { icon: "◷", label: "Reminders" },
    { icon: "₹", label: "Expenses" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">V</div>
        <div>
          <h2>VehicleCare</h2>
          <p>MAINTENANCE HUB</p>
        </div>
      </div>

      <p className="menu-label">WORKSPACE</p>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onPageChange(item.label)}
            className={`menu-item ${
              activePage === item.label ? "active" : ""
            }`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.label}</span>
            {activePage === item.label && (
              <span className="active-dot" />
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <strong>Maintenance tip</strong>
          <p>Keep your vehicle service records updated.</p>
        </div>
        <p className="sidebar-version">VehicleCare v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;

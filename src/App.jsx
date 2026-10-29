
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";

const initialVehicles = [
  { id: 1, name: "Maruti Swift", number: "UP 62 AB 1234", type: "Car", km: 18500 },
  { id: 2, name: "Honda Activa", number: "UP 62 CD 5678", type: "Scooter", km: 8200 },
];

function readSaved(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function submit(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const accounts = readSaved("vc-accounts", []);

    if (mode === "register") {
      if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (accounts.some(a => a.email === cleanEmail)) {
        alert("This email is already registered. Please log in.");
        setMode("login");
        return;
      }

      const account = {
        name: name.trim(),
        email: cleanEmail,
        password,
      };

      localStorage.setItem(
        "vc-accounts",
        JSON.stringify([...accounts, account])
      );

      alert("Registration successful. Please log in.");
      setMode("login");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const account = accounts.find(
      a => a.email === cleanEmail && a.password === password
    );

    if (!account) {
      alert("Invalid email or password. Please register first if you are a new user.");
      return;
    }

    onLogin({ name: account.name, email: account.email });
  }

  return (
    <div className="auth-page">
      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />

      <div className="auth-brand">
        <div className="auth-brand-icon">V</div>
        <div>
          <h2>VehicleCare</h2>
          <p>SMART MAINTENANCE HUB</p>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-illustration">🚘</div>
          <p className="auth-tag">YOUR VEHICLE, OUR PRIORITY</p>
          <h2>Every journey<br />starts with care.</h2>
          <p className="auth-visual-description">
            Keep your vehicles organized, track service records
            and manage maintenance expenses in one place.
          </p>
          <div className="auth-benefits">
            <span>✓ Vehicle management</span>
            <span>✓ Service history</span>
            <span>✓ Expense tracking</span>
          </div>
        </div>

        <div className="auth-form-area">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "selected" : ""}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={mode === "register" ? "selected" : ""}
              onClick={() => setMode("register")}
            >
              Create Account
            </button>
          </div>

          <div className="auth-heading">
            <h1>{mode === "login" ? "Welcome back!" : "Get started"}</h1>
            <p>
              {mode === "login"
                ? "Sign in to manage your vehicle maintenance."
                : "Create your account to get started."}
            </p>
          </div>

          <form className="auth-form" onSubmit={submit}>
            {mode === "register" && (
              <label>
                Full name
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Password
              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {mode === "register" && (
                <small>Use at least 6 characters.</small>
              )}
            </label>

            {mode === "register" && (
              <label>
                Confirm password
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                />
              </label>
            )}

            <button className="auth-submit" type="submit">
              {mode === "login" ? "Sign In to Dashboard →" : "Create My Account →"}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "login" ? "New to VehicleCare?" : "Already have an account?"}
            {" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>

          <p className="auth-demo-note">
            Frontend demonstration · Data saved in this browser
          </p>
        </div>
      </div>

      <p className="auth-footer">
        VehicleCare · Smart vehicle maintenance made simple
      </p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => readSaved("vc-user", null));
  const [theme, setTheme] = useState(
    () => localStorage.getItem("vehicle-theme") || "light"
  );
  const [activePage, setActivePage] = useState("Dashboard");
  const [vehicles, setVehicles] = useState(() =>
    readSaved("vc-vehicles", initialVehicles)
  );
  const [services, setServices] = useState(() =>
    readSaved("vc-services", [])
  );

  const [vehicleForm, setVehicleForm] = useState({
    name: "", number: "", type: "Car", km: "",
  });
  const [serviceForm, setServiceForm] = useState({
    vehicle: "", type: "General Service", date: "", cost: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vehicle-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("vc-vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem("vc-services", JSON.stringify(services));
  }, [services]);

  function loginUser(account) {
    localStorage.setItem("vc-user", JSON.stringify(account));
    setUser(account);
  }

  function logout() {
    localStorage.removeItem("vc-user");
    setUser(null);
    setActivePage("Dashboard");
    setSearch("");
    cancelVehicleEdit();
  }

  function saveVehicle(e) {
    e.preventDefault();

    const name = vehicleForm.name.trim();
    const number = vehicleForm.number.trim().toUpperCase();

    if (!name || !number) {
      alert("Vehicle name and number are required.");
      return;
    }

    if (vehicles.some(v =>
      v.number.toLowerCase() === number.toLowerCase() &&
      v.id !== editingId
    )) {
      alert("This vehicle number already exists.");
      return;
    }

    const data = {
      ...vehicleForm,
      name,
      number,
      km: Number(vehicleForm.km) || 0,
    };

    if (editingId !== null) {
      setVehicles(old => old.map(v =>
        v.id === editingId ? { ...v, ...data } : v
      ));
    } else {
      setVehicles(old => [...old, { ...data, id: Date.now() }]);
    }

    cancelVehicleEdit();
  }

  function editVehicle(v) {
    setEditingId(v.id);
    setVehicleForm({
      name: v.name,
      number: v.number,
      type: v.type,
      km: String(v.km),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelVehicleEdit() {
    setEditingId(null);
    setVehicleForm({ name: "", number: "", type: "Car", km: "" });
  }

  function deleteVehicle(id) {
    if (!window.confirm("Delete this vehicle? Its service records will remain.")) return;
    setVehicles(old => old.filter(v => v.id !== id));
  }

  function saveService(e) {
    e.preventDefault();

    if (!serviceForm.vehicle || !serviceForm.date || serviceForm.cost === "") {
      alert("Please fill in all service details.");
      return;
    }

    setServices(old => [...old, {
      ...serviceForm,
      id: Date.now(),
      cost: Number(serviceForm.cost),
    }]);

    setServiceForm({
      vehicle: "", type: "General Service", date: "", cost: "",
    });
  }

  function deleteService(id) {
    if (window.confirm("Delete this service record?")) {
      setServices(old => old.filter(s => s.id !== id));
    }
  }

  const totalExpenses = services.reduce(
    (sum, s) => sum + Number(s.cost || 0), 0
  );
  const today = new Date().toISOString().slice(0, 10);
  const sortedServices = [...services].sort(
    (a, b) => a.date.localeCompare(b.date)
  );
  const upcoming = sortedServices.filter(s => s.date >= today);
  const overdue = sortedServices.filter(s => s.date < today);

  const filteredVehicles = vehicles.filter(v =>
    `${v.name} ${v.number} ${v.type}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredServices = services.filter(s =>
    `${s.vehicle} ${s.type} ${s.date}`.toLowerCase().includes(search.toLowerCase())
  );

  const money = value => `₹${Number(value).toLocaleString("en-IN")}`;

  if (!user) {
    return <AuthPage onLogin={loginUser} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onPageChange={page => {
          setActivePage(page);
          setSearch("");
          cancelVehicleEdit();
        }}
      />

      <main className="main-content">
        <Header
          theme={theme}
          onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
        />

        <div className="account-toolbar">
          <span>Signed in as <strong>{user.name}</strong></span>
          <button type="button" className="logout-button" onClick={logout}>
            ↪ Logout
          </button>
        </div>

        <section className="welcome-section">
          <p className="eyebrow">VEHICLE MANAGEMENT</p>
          <h1>{activePage}</h1>
          <p className="subtitle">
            {activePage === "Dashboard"
              ? "Manage your vehicles and track maintenance in one place."
              : `Manage your ${activePage.toLowerCase()} in one place.`}
          </p>
        </section>

        {activePage === "Dashboard" && (
          <>
            <section className="stats-grid">
              <Stat title="Total Vehicles" value={vehicles.length} icon="🚘" />
              <Stat title="Service Records" value={services.length} icon="🔧" />
              <Stat title="Upcoming Services" value={upcoming.length} icon="◷" />
              <Stat title="Total Expenses" value={money(totalExpenses)} icon="₹" />
            </section>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-heading">
                  <div><h3>My Vehicles</h3><p>Registered vehicles</p></div>
                  <button className="primary-button" onClick={() => setActivePage("My Vehicles")}>+ Add Vehicle</button>
                </div>
                {vehicles.length === 0 ? <Empty text="No vehicles added yet." /> :
                  vehicles.slice(0, 5).map(v => (
                    <div className="activity-row" key={v.id}>
                      <span className="activity-icon blue">🚘</span>
                      <div className="activity-details"><strong>{v.name}</strong><p>{v.number} · {v.km} km</p></div>
                      <button className="edit-button" onClick={() => { editVehicle(v); setActivePage("My Vehicles"); }}>Edit</button>
                    </div>
                  ))}
              </div>

              <div className="panel">
                <div className="panel-heading"><div><h3>Recent Services</h3><p>Latest records</p></div></div>
                {services.length === 0 ? <Empty text="Add a service record to get started." /> :
                  [...services].reverse().slice(0, 5).map(s => (
                    <div className="activity-row" key={s.id}>
                      <span className="activity-icon green">✓</span>
                      <div className="activity-details"><strong>{s.type}</strong><p>{s.vehicle} · {s.date}</p></div>
                      <strong className="amount">{money(s.cost)}</strong>
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}

        {activePage === "My Vehicles" && (
          <section className="panel page-panel">
            <div className="panel-heading">
              <div>
                <h3>{editingId !== null ? "Edit Vehicle" : "Add a Vehicle"}</h3>
                <p>Enter your vehicle details.</p>
              </div>
            </div>

            <form className="form-grid" onSubmit={saveVehicle}>
              <label>Vehicle name
                <input required value={vehicleForm.name} onChange={e => setVehicleForm({ ...vehicleForm, name: e.target.value })} placeholder="e.g. Maruti Swift" />
              </label>
              <label>Vehicle number
                <input required value={vehicleForm.number} onChange={e => setVehicleForm({ ...vehicleForm, number: e.target.value })} placeholder="e.g. UP 62 AB 1234" />
              </label>
              <label>Vehicle type
                <select value={vehicleForm.type} onChange={e => setVehicleForm({ ...vehicleForm, type: e.target.value })}>
                  <option>Car</option><option>Bike</option><option>Scooter</option><option>Other</option>
                </select>
              </label>
              <label>Current kilometres
                <input type="number" min="0" value={vehicleForm.km} onChange={e => setVehicleForm({ ...vehicleForm, km: e.target.value })} placeholder="e.g. 18500" />
              </label>
              <div className="form-buttons">
                <button className="primary-button" type="submit">{editingId !== null ? "Update Vehicle" : "Add Vehicle"}</button>
                {editingId !== null && <button className="secondary-button" type="button" onClick={cancelVehicleEdit}>Cancel</button>}
              </div>
            </form>

            <div className="panel-heading">
              <div><h3>Registered Vehicles ({vehicles.length})</h3></div>
            </div>
            <SearchBox value={search} onChange={setSearch} placeholder="Search by name, number or type..." />

            <div className="table-wrap">
              <table>
                <thead><tr><th>Vehicle</th><th>Number</th><th>Type</th><th>Odometer</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredVehicles.map(v => (
                    <tr key={v.id}>
                      <td>{v.name}</td><td>{v.number}</td><td>{v.type}</td><td>{v.km.toLocaleString("en-IN")} km</td>
                      <td><div className="row-actions">
                        <button className="edit-button" onClick={() => editVehicle(v)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteVehicle(v.id)}>Delete</button>
                      </div></td>
                    </tr>
                  ))}
                  {filteredVehicles.length === 0 && <tr><td colSpan="5">No matching vehicles.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage === "Service Records" && (
          <section className="panel page-panel">
            <div className="panel-heading"><div><h3>Add Service Record</h3><p>Record maintenance and service costs.</p></div></div>
            {vehicles.length === 0 ? <Empty text="Add a vehicle first in My Vehicles." /> : (
              <form className="form-grid" onSubmit={saveService}>
                <label>Vehicle
                  <select required value={serviceForm.vehicle} onChange={e => setServiceForm({ ...serviceForm, vehicle: e.target.value })}>
                    <option value="">Select vehicle</option>
                    {vehicles.map(v => <option key={v.id} value={v.name}>{v.name} ({v.number})</option>)}
                  </select>
                </label>
                <label>Service type
                  <select value={serviceForm.type} onChange={e => setServiceForm({ ...serviceForm, type: e.target.value })}>
                    <option>General Service</option><option>Oil Change</option><option>Repair</option><option>Tyre Replacement</option><option>Brake Inspection</option><option>Insurance</option><option>Other</option>
                  </select>
                </label>
                <label>Service date
                  <input type="date" required value={serviceForm.date} onChange={e => setServiceForm({ ...serviceForm, date: e.target.value })} />
                </label>
                <label>Cost (₹)
                  <input type="number" min="0" required value={serviceForm.cost} onChange={e => setServiceForm({ ...serviceForm, cost: e.target.value })} placeholder="e.g. 1500" />
                </label>
                <div className="form-buttons"><button className="primary-button" type="submit">Save Service</button></div>
              </form>
            )}

            <div className="panel-heading"><div><h3>Service History ({services.length})</h3></div></div>
            <SearchBox value={search} onChange={setSearch} placeholder="Search by vehicle, service or date..." />
            <div className="table-wrap">
              <table>
                <thead><tr><th>Vehicle</th><th>Service</th><th>Date</th><th>Cost</th><th>Action</th></tr></thead>
                <tbody>
                  {filteredServices.map(s => (
                    <tr key={s.id}>
                      <td>{s.vehicle}</td><td>{s.type}</td><td>{s.date}</td><td>{money(s.cost)}</td>
                      <td><button className="delete-button" onClick={() => deleteService(s.id)}>Delete</button></td>
                    </tr>
                  ))}
                  {filteredServices.length === 0 && <tr><td colSpan="5">No matching service records.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage === "Reminders" && (
          <section className="panel page-panel">
            <div className="panel-heading">
              <div><h3>Service Reminders</h3><p>Service dates from your saved records.</p></div>
              <button className="primary-button" onClick={() => setActivePage("Service Records")}>+ Add Service</button>
            </div>
            <section className="stats-grid reminder-stats">
              <Stat title="Upcoming" value={upcoming.length} icon="◷" />
              <Stat title="Past Dates" value={overdue.length} icon="!" />
            </section>
            {sortedServices.map(s => {
              const isOverdue = s.date < today;
              return <div className="activity-row" key={s.id}>
                <span className={`activity-icon ${isOverdue ? "orange" : "green"}`}>{isOverdue ? "!" : "◷"}</span>
                <div className="activity-details"><strong>{s.type} · {s.vehicle}</strong><p>{s.date}</p></div>
                <span className={`status ${isOverdue ? "pending" : "planned"}`}>{isOverdue ? "Past date" : "Upcoming"}</span>
              </div>;
            })}
            {services.length === 0 && <Empty text="No service dates available. Add a service record first." />}
            <p className="info-note">Reminders are based on saved service dates. This frontend does not send phone notifications.</p>
          </section>
        )}

        {activePage === "Expenses" && (
          <section className="panel page-panel">
            <div className="expense-summary">
              <p>Total recorded service expenses</p>
              <h2>{money(totalExpenses)}</h2>
              <span>{services.length} service record(s)</span>
            </div>
            <div className="panel-heading section-heading-gap"><div><h3>Expense Breakdown</h3><p>Costs from saved service records.</p></div></div>
            <SearchBox value={search} onChange={setSearch} placeholder="Search expenses by vehicle or type..." />
            <div className="table-wrap">
              <table>
                <thead><tr><th>Vehicle</th><th>Expense</th><th>Date</th><th>Amount</th></tr></thead>
                <tbody>
                  {filteredServices.map(s => <tr key={s.id}><td>{s.vehicle}</td><td>{s.type}</td><td>{s.date}</td><td>{money(s.cost)}</td></tr>)}
                  {filteredServices.length === 0 && <tr><td colSpan="4">No matching expenses.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <footer className="footer">VehicleCare · Smart vehicle maintenance made simple</footer>
      </main>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return <div className="stat-card">
    <div className="stat-top"><span>{title}</span><span className="stat-icon blue">{icon}</span></div>
    <h2>{value}</h2>
    <p>Calculated from saved data</p>
  </div>;
}

function SearchBox({ value, onChange, placeholder }) {
  return <input className="search-input" type="search" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />;
}

function Empty({ text }) {
  return <p className="empty-state">{text}</p>;
}

export default App;

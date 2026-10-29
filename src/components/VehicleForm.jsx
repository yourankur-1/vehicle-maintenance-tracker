
import { useState } from "react";

const initialForm = {
  name: "",
  number: "",
  type: ""
};

export default function VehicleForm({ onAddVehicle }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const vehicle = {
      name: form.name.trim(),
      number: form.number.trim().toUpperCase(),
      type: form.type
    };

    if (!vehicle.name || !vehicle.number || !vehicle.type) {
      alert("Please fill in all vehicle details.");
      return;
    }

    if (onAddVehicle(vehicle)) {
      setForm(initialForm);
    }
  }

  return (
    <section className="panel">
      <h2>Add Vehicle</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="vehicleName">Vehicle Name / Model</label>
            <input
              id="vehicleName"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Honda Shine"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vehicleNumber">Vehicle Number</label>
            <input
              id="vehicleNumber"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="e.g. UP 44 AB 1234"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select
              id="vehicleType"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Scooter">Scooter</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <button type="submit">+ Add Vehicle</button>
      </form>
    </section>
  );
}

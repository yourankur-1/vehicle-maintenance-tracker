
import { useState } from "react";

const initialForm = {
  vehicleId: "",
  type: "",
  date: new Date().toLocaleDateString("en-CA"),
  cost: "",
  notes: ""
};

export default function ServiceForm({ vehicles, onAddService }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cost = Number(form.cost);

    if (!vehicles.some((vehicle) => vehicle.id === form.vehicleId)) {
      alert("Please add and select a vehicle first.");
      return;
    }

    if (
      !form.type ||
      !form.date ||
      form.cost.trim() === "" ||
      !Number.isFinite(cost) ||
      cost < 0
    ) {
      alert("Please enter valid service details.");
      return;
    }

    onAddService({
      vehicleId: form.vehicleId,
      type: form.type,
      date: form.date,
      cost,
      notes: form.notes.trim()
    });

    setForm({
      ...initialForm,
      date: new Date().toLocaleDateString("en-CA")
    });
  }

  return (
    <section className="panel">
      <h2>Add Service Record</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="serviceVehicle">Select Vehicle</label>
            <select
              id="serviceVehicle"
              name="vehicleId"
              value={form.vehicleId}
              onChange={handleChange}
              required
              disabled={vehicles.length === 0}
            >
              <option value="">Select a vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.number})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Service Type</label>
            <select
              id="serviceType"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select service</option>
              <option value="Oil Change">Oil Change</option>
              <option value="General Service">General Service</option>
              <option value="Repair">Repair</option>
              <option value="Tyre Change">Tyre Change</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="serviceDate">Service Date</label>
            <input
              id="serviceDate"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="serviceCost">Service Cost (₹)</label>
            <input
              id="serviceCost"
              name="cost"
              type="number"
              min="0"
              step="0.01"
              value={form.cost}
              onChange={handleChange}
              placeholder="e.g. 800"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="serviceNotes">Notes (Optional)</label>
            <input
              id="serviceNotes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Engine oil changed"
            />
          </div>
        </div>

        <button type="submit" disabled={vehicles.length === 0}>
          + Add Service
        </button>

        {vehicles.length === 0 && (
          <p className="form-hint">
            Add a vehicle before recording a service.
          </p>
        )}
      </form>
    </section>
  );
}

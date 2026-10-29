
export default function VehicleList({ vehicles, onDeleteVehicle }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>My Vehicles</h2>
        <span className="count">{vehicles.length} vehicles</span>
      </div>

      {vehicles.length === 0 ? (
        <p className="empty-message">
          No vehicles added yet. Add your first vehicle above.
        </p>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <article className="vehicle-card" key={vehicle.id}>
              <div className="vehicle-top">
                <div>
                  <h3>{vehicle.name}</h3>
                  <span className="vehicle-number">
                    {vehicle.number}
                  </span>
                </div>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDeleteVehicle(vehicle.id)}
                >
                  Delete
                </button>
              </div>

              <p className="vehicle-type">
                Vehicle Type: {vehicle.type}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

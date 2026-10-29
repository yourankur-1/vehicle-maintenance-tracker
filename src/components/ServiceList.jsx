
function formatCurrency(amount) {
  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  });
}

function formatDate(date) {
  if (!date) return "—";

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function ServiceList({
  vehicles,
  services,
  onDeleteService
}) {
  const sortedServices = [...services].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Service History</h2>
        <span className="count">{services.length} records</span>
      </div>

      {services.length === 0 ? (
        <p className="empty-message">
          No service records yet. Add your first service above.
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedServices.map((service) => {
                const vehicle = vehicles.find(
                  (item) => item.id === service.vehicleId
                );

                return (
                  <tr key={service.id}>
                    <td>
                      {vehicle
                        ? `${vehicle.name} (${vehicle.number})`
                        : "Vehicle unavailable"}
                    </td>
                    <td>{service.type}</td>
                    <td>{formatDate(service.date)}</td>
                    <td>{formatCurrency(service.cost)}</td>
                    <td>{service.notes || "—"}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => onDeleteService(service.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

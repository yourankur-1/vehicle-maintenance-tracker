
function formatCurrency(amount) {
  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  });
}

export default function Stats({ vehicles, services }) {
  const totalExpenses = services.reduce(
    (sum, service) => sum + Number(service.cost || 0),
    0
  );

  const items = [
    { title: "Total Vehicles", value: vehicles.length },
    { title: "Service Records", value: services.length },
    { title: "Total Expenses", value: formatCurrency(totalExpenses) }
  ];

  return (
    <section className="stats">
      {items.map((item) => (
        <article className="stat-card" key={item.title}>
          <p>{item.title}</p>
          <h2>{item.value}</h2>
        </article>
      ))}
    </section>
  );
}

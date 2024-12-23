interface Order {
  tables: {}
}

export function OrdersViewer({ tables }): React.FC {
  return (
    <div className="orders-viewer">
      <h2>Orders</h2>
      <div className="orders">
        {tables.map((table) => (
          <div className="table" key={table.id}>
            <ul>
              {table.orders.map((order) => (
                <li key={order.id}>
                  <span>{order.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

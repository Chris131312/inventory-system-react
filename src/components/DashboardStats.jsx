function DashboardStats({ products }) {
  const totalProducts = products.length;

  const totalValue = products.reduce((acc, product) => {
    return acc + product.price * product.stock;
  }, 0);

  const lowStockCount = products.filter((product) => product.stock < 5).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shodow-sm border boder-slate-200 flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            📦
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-slate-800">{totalProducts}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center-gap">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
            💰
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">Inventory Value</p>
            <p className="text-2xl font-bold text-slate-800">
                ${totalValue.toLocaleString()}
            </p>
        </div>
      </div>
    </div>
  );
}

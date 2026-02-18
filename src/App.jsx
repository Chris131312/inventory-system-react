import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Gaming Laptop", price: 1500, category: "Tech", stock: 5 },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 25,
      category: "Accessories",
      stock: 12,
    },
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="p-8 max-w-7xl mx-auto">
        <ProductForm addProduct={handleAddProduct} />

        <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-8">
          📦 Current Inventory
        </h2>

        <ProductList products={products} />
      </main>
    </div>
  );
}

export default App;

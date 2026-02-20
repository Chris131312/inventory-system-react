import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("inventory_products");
    if (savedProducts) {
      return JSON.parse(savedProducts);
    } else {
      return [
        {
          id: 1,
          name: "Gaming Laptop",
          price: 1500,
          category: "Tech",
          stock: 5,
        },
        {
          id: 2,
          name: "Wireless Mouse",
          price: 25,
          category: "Accessories",
          stock: 12,
        },
      ];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("inventory_products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (idToDelete) => {
    const newProducts = products.filter((product) => product.id !== idToDelete);
    setProducts(newProducts);
  };

  const handleUpdateStock = (id, newStock) => {
    if (newStock < 0) return;

    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, stock: newStock };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="p-8 max-w-7xl mx-auto">
        <ProductForm addProduct={handleAddProduct} />

        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <input
            type="text"
            placeholder="Search products by name..."
            className="w-full p-3 rounded bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-8">
          Current Inventory
        </h2>

        <ProductList
          products={filteredProducts}
          deleteProduct={handleDeleteProduct}
          updateStock={handleUpdateStock}
        />
      </main>
    </div>
  );
}

export default App;

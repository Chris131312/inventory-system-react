import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
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

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    localStorage.setItem("inventory_products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    toast.success(`${newProduct.name} added to inventory`);
  };

  const handleDeleteProduct = (idToDelete) => {
    const productToDelete = products.find((p) => p.id === idToDelete);
    const newProducts = products.filter((product) => product.id !== idToDelete);
    setProducts(newProducts);

    if (productToDelete) {
      toast.error(`${productToDelete.name} removed from sustem.`);
    } else {
      toast.error("Product removed from system.");
    }
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
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <Toaster richColors position="bottom-right`" />
      <Header />

      <main className="p-8 max-w-7xl mx-auto">
        <ProductForm addProduct={handleAddProduct} />

        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products by name..."
            className="flex-1 p-3 rounded bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-3 rounded bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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

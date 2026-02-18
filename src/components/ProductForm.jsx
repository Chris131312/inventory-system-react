import { useState } from "react";

function ProductForm({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) return;

    const newProduct = {
      id: Date.now(),
      name: name,
      price: Number(price),
      category: "General",
      stock: 10,
    };

    addProduct(newProduct);
    setName("");
    setPrice("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Product</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded w-32"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default ProductForm;

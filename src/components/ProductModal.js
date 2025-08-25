import React, { useEffect, useState } from "react";

const ProductModal = ({ product, onSave, isEditMode, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  // Prefill form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        tags: product.tags ? product.tags.join(", ") : "",
      });
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleClose = () => {
    document.getElementById("ProductModal").close();
    setErrors({});
    onClose();
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      tags: "",
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Enter a valid price";
    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = "Stock cannot be negative";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
    };

    if (product) {
      const isSame =
        product.name === finalData.name &&
        product.category === finalData.category &&
        product.price === finalData.price &&
        product.stock === finalData.stock &&
        product.description === finalData.description &&
        JSON.stringify(product.tags || []) === JSON.stringify(finalData.tags);

      if (isSame) {
        setErrors({ form: "No changes detected" });
        return;
      }
    }

    onSave(finalData);
    document.getElementById("ProductModal").close();
  };

  return (
    <dialog id="ProductModal" className="modal">
      <div className="modal-box max-w-lg rounded-2xl shadow-lg">
        <h3 className="font-bold text-xl mb-4 text-center">
          {product ? "✏️ Edit Product" : "➕ Add Product"}
        </h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className={`input input-bordered w-full ${
                errors.category ? "input-error" : ""
              }`}
              value={formData.category}
              onChange={handleChange}
            />
            {errors.category && (
              <p className="text-error text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className={`input input-bordered w-full ${
                errors.price ? "input-error" : ""
              }`}
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-error text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className={`input input-bordered w-full ${
                errors.stock ? "input-error" : ""
              }`}
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && (
              <p className="text-error text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="input input-bordered w-full"
            value={formData.tags}
            onChange={handleChange}
          />

          {errors.form && (
            <p className="text-error text-sm mt-1 text-center">{errors.form}</p>
          )}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {product ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ProductModal;

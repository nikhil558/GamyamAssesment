import { Package, Plus } from "lucide-react";
import React from "react";
import SearchProduct from "./SearchProduct";
import ProductsList from "./ProductsList";
import ProductPagination from "./ProductsPagination";
import ProductModal from "./ProductModal";
import productsData from "../utills/products.json";

const Products = () => {
  const [products, setProducts] = React.useState(productsData);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  const addProduct = () => {
    setSelectedProduct(null);
    document.getElementById("ProductModal").showModal();
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    document.getElementById("ProductModal").showModal();
  };

  const closeProductModal = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  const saveProduct = (product) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...product, id: p.id } : p
        )
      );
    } else {
      const newProduct = { ...product, id: Date.now().toString() };
      setProducts((prev) => [newProduct, ...prev]);
    }
    document.getElementById("ProductModal").close();
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm mx-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Products
        </h1>
        <button
          className="shadow-sm flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 text-sm"
          onClick={addProduct}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      <SearchProduct onSearch={setSearchQuery} />

      {searchQuery && (
        <div className="text-sm text-gray-500 my-2">
          Found {filteredProducts.length} products matching "{searchQuery}"
        </div>
      )}

      {currentProducts.length > 0 ? (
        <ProductsList products={currentProducts} onEdit={editProduct} />
      ) : (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? "No products found" : "No products yet"}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Get started by adding your first product"}
          </p>
          {!searchQuery && (
            <button className="shadow-sm flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 text-sm mx-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </button>
          )}
        </div>
      )}

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // reset to page 1 when size changes
        }}
      />
      <ProductModal
        product={selectedProduct}
        onSave={saveProduct}
        isEditMode={isEditMode}
        onClose={closeProductModal}
      />
    </div>
  );
};

export default Products;

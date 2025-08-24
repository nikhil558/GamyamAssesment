import React from "react";
import { Edit, IndianRupee, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/cartSlice";

const GridView = ({ products, onEdit }) => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  const handleAddToCart = (product) => {
    if (cart?.find((item) => item.id === product.id)) {
      dispatch(removeFromCart({ id: product.id }));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((eachProduct) => {
        const tags = Array.isArray(eachProduct.tags) ? eachProduct.tags : [];
        const maxToShow = 5;
        const extra = Math.max(0, tags.length - maxToShow);
        const cartClass = cart?.find((item) => item.id === eachProduct.id)
          ? "w-full"
          : "w-0 group-hover:w-full";

        return (
          <div
            key={eachProduct.id}
            className=" bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden mt-4"
          >
            <div className="p-5 flex flex-col h-full">
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                  {eachProduct.name}
                </h3>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  {eachProduct.category}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-gray-900">
                      {eachProduct.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Stock: {eachProduct.stock}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      eachProduct.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {eachProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {eachProduct.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {eachProduct.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.slice(0, maxToShow).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                  {extra > 0 && (
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                      +{extra} more
                    </span>
                  )}
                  {tags.length === 0 && (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
                  aria-label="Edit product"
                  onClick={() => onEdit(eachProduct)}
                  disabled={!onEdit}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  className="relative px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg overflow-hidden group transition-all duration-300"
                  aria-label="View product"
                  onClick={() => handleAddToCart(eachProduct)}
                >
                  <span
                    className={`absolute inset-0 bg-yellow-300 transition-all duration-300 ease-out ${cartClass}`}
                  ></span>

                  <span className="relative flex items-center justify-center gap-2 text-gray-700 group-hover:text-gray-900">
                    <ShoppingCart className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;

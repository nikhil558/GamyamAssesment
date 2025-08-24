import React from "react";
import { Edit, IndianRupee, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/cartSlice";

const TableView = ({ products, onEdit }) => {
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
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {products.map((eachProduct) => {
            const tags = Array.isArray(eachProduct.tags)
              ? eachProduct.tags
              : [];
            const maxToShow = 3;
            const extra = Math.max(0, tags.length - maxToShow);
            const cartClass = cart?.find((item) => item.id === eachProduct.id)
              ? "w-full"
              : "w-0 group-hover:w-full";

            return (
              <tr key={eachProduct.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">
                  <div className="font-medium">{eachProduct.name}</div>
                  {eachProduct.description && (
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {eachProduct.description}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 text-sm">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {eachProduct.category}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4 text-green-600" />
                    {eachProduct.price}
                  </div>
                </td>

                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded ${
                      eachProduct.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {eachProduct.stock > 0
                      ? `In Stock (${eachProduct.stock})`
                      : "Out of Stock"}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, maxToShow).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                    {extra > 0 && (
                      <span className="text-xs text-gray-500">
                        +{extra} more
                      </span>
                    )}
                    {tags.length === 0 && (
                      <span className="text-xs text-gray-400">No tags</span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 text-sm text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition"
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;

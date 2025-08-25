import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "./ProductsList";
import { clearCart } from "../Redux/cartSlice";
import { Eraser } from "lucide-react";

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  return (
    <dialog id="cart_items" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box !w-[90%] !max-w-[1200px] !top-1">
        <div className="flex mb-8">
          <h3 className="font-bold text-lg">Cart</h3>
          <button
            onClick={() => dispatch(clearCart())}
            className="group absolute end-0 mb-4 mr-4 inline-flex items-center px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base font-medium border rounded-lg text-red-600 border-red-600 hover:text-white hover:bg-red-600 transition-all duration-300"
          >
            <span className="absolute left-0 w-0 h-full bg-red-600 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center gap-1 sm:gap-2">
              <Eraser className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Clear</span>
            </span>
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="py-4">Your cart is empty.</p>
        ) : (
          <ProductsList products={cart} />
        )}

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Cart;

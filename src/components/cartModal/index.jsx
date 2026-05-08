import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

export default function CartDrawer({ onClose }) {
  const { cart, increaseQty, decreaseQty, fetchCart } = useCart();



  // 🔹 Total Price
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <div className="fixed inset-0 flex justify-end z-50">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-[400px] bg-white h-full shadow-xl flex flex-col">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center mt-10 text-gray-500">
              <h2 className="text-xl font-semibold">
                Your Cart is Empty 🛒
              </h2>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border-b pb-4 mb-4"
              >
                <img
                  src={item.selectedColor?.image || item.img}
                  className="w-20 h-20 object-contain rounded-lg border"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.title}
                  </h2>

                  {/* Rating (static for now) */}
                  <p className="flex items-center gap-1 text-yellow-500 text-sm">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStarHalfStroke />
                  </p>

                  <p className="font-semibold mt-1">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => decreaseQty(item)}
                      className="px-2 border rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      type="button"
                      onClick={() => increaseQty(item)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Total */}
          {cart.length > 0 && (
            <p className="mt-6 font-bold text-xl text-center">
              Total: ₹{total}
            </p>
          )}
        </div>

        {/* Bottom Button */}
        {cart.length > 0 && (
          <div className="p-6 border-t">
            <button
              type="button"
              className="w-full bg-green-700 text-white py-3 rounded-xl text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import getStripe from "../lib/getStripe";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Váš Košík</span>
          <span className="cart-num-items">
            ({totalQuantities} vec{Number(totalQuantities) > 1 ? "i" : ""})
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Váš košík je prázdny</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Vrátiť sa na stránku
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id} className="product">
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                  style={{ objectFit: "cover" }}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>€{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Spolu:</h3>
              <h3>€{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                ZAPLATIŤ S KARTOU
              </button>
              <button type="button" className="btn" onClick={handleCheckout}>
                INÝ SPôSOB PLATBY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
import CartItem from "./CartItem";
import { CartItemType } from "../App";
import { FC } from "react";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <div className="cart">
      <div className="title">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        {cartItems.length
          ? cartItems.map((item) => (
              <CartItem
                key={item.id}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                item={item}
              />
            ))
          : cartItems.length === 0 &&
            "Your cart is looking a little empty. Add some items and come back"}
      </div>
    </div>
  );
};

export default Cart;

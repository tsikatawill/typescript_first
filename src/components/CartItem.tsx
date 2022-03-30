import { FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <div className="cart-item">
      <h3 className="font-bold">{item.title}</h3>
      <div className="price flex justify-between">
        <p className="unit-price">
          Unit price: {"$"}
          {item.price}
        </p>
        <p className="unit-price">
          Total price: {"$"}
          {item.price}
        </p>
      </div>
      <div className="settings">
        <button className="decrement p-5 bg-slate-100 hover:bg-slate-200 rounded-md">
          <FaMinus />
        </button>
        <button className="increment p-5 bg-slate-100 hover:bg-slate-200 rounded-md">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

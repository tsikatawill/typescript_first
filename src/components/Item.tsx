import { FC } from "react";
import { FaCartPlus } from "react-icons/fa";
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <div className="item-card max-w-sm dark:bg-slate-900 dark:text-white bg-slate-200 shadow-md shadow-slate-500 border-2 rounded-lg flex flex-col overflow-hidden">
      <div className="card-header bg-white p-2">
        <img
          src={item.image}
          alt={item.title}
          className="mx-auto max-h-[250px]"
        />
      </div>
      <div className="card-body  p-5">
        <h3 className="font-bold text-xl">{item.title}</h3>
        <p className="">{item.description}</p>
        <p className="mt-5 font-semibold">
          {"$"}
          {item.price}
        </p>
      </div>
      <div className="cta mt-auto p-5">
        <button
          className="w-full p-2 bg-green-700 flex items-center justify-center gap-2 color white text-white rounded-md"
          onClick={() => {
            handleAddToCart(item);
          }}
        >
          Add to cart <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default Item;

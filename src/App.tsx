import { useEffect, useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import Cart from "./components/Cart";
import Item from "./components/Item";

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amounr: number;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<string>("");

  const getProducts = async (): Promise<CartItemType[] | void> => {
    setLoading(true);
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.status > 199 && response.status < 400) {
      const data = await response.json();
      setProducts(data);
      setisError("");
      setLoading(false);
    } else {
      setLoading(false);
      setisError("Unable to fetch resource");
      throw Error("Unable to fetch url");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const getTotalItems = (items: CartItemType[]): number => {
    return items.reduce((accu: number, item) => accu + item.amounr, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isAlreadyInCart = prev.find((item) => item.id === clickedItem.id);

      if (isAlreadyInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? {
                ...item,
                amount: item.amounr + 1,
              }
            : item
        );
      }
      return [...prev, { ...clickedItem, amounr: 1 }];
    });
  };
  const handleRemoveFromCart = () => {};

  return (
    <div className="App">
      <header className="bg-slate-800">
        <div className="container grid place-content-center">
          <h1 className="text-blue-300 text-3xl font-bold cursor-pointer">
            TYPESCRIPT
            <small className="font-semibold"> with Some Swedish Dude</small>
          </h1>
        </div>
      </header>
      {loading ? (
        <div className="loading mx-auto w-fit flex flex-col justify-center items-center gap-5 h-52">
          <PuffLoader color="blue" />

          <p>Getting resource</p>
        </div>
      ) : isError ? (
        <div className="loading mx-auto w-fit flex flex-col justify-center items-center gap-5 h-52">
          <PuffLoader color="red" />
          <p>{isError}</p>
        </div>
      ) : (
        <section className="products relative">
          <div
            className={`${
              cartOpen && "top-1"
            } cart-toggle fixed -right-1 z-50 rounded-l-md h-fit hover:bg-slate-200 bg-white p-2 w-fit text-xl`}
            onClick={() => {
              setCartOpen(!cartOpen);
            }}
          >
            {cartOpen ? <FaTimes /> : <FaShoppingCart />}
            <small className="rounded-full p-1 text-xs grid place-content-center h-[2ch] w-fit bg-orange-500 text-white top-0 -left-2 absolute">
              {getTotalItems(cartItems)}
            </small>
          </div>
          <div
            className={`cart-drawer ${
              cartOpen === false && "closed"
            } fixed bg-slate-400 w-fit max-w-[80vw] md:max-w-[80vw] h-screen overflow-scroll top-0 p-5 right-0 pr-8`}
          >
            <Cart
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          </div>
          <div className="container flex flex-wrap gap-5 justify-center">
            {products &&
              products.map((item) => (
                <Item item={item} handleAddToCart={handleAddToCart} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default App;

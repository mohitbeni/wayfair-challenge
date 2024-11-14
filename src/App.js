import { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import "./styles.css";
import useGetProducts from "./useGetProducts";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isLoading, error, filteredProducts, setFilteredProducts } =
    useGetProducts("https://fakestoreapi.com/products");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  const [viewCart, setViewCart] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [cartIds, setCartIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const toggleModal = (product) => {
    setModalDetails(product);
    setModalOpen(!isModalOpen);
  };
  const toggleViewCart = (product) => {
    setViewCart(!viewCart);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredItems = products.filter(
      (item) => item.title.toLowerCase().indexOf(e.target.value) !== -1
    );
    setFilteredProducts(filteredItems);
  };

  const inCartItems = () => {
    const items = products
      .filter((product) => cartIds?.includes(product.id))
      .map((item) => {
        return { ...item, count: 1 };
      });
    setCartItems(items);
  };

  const handleAddToCart = (e, id) => {
    e.stopPropagation();
    let items;
    if (cartIds?.includes(id)) {
      items = cartIds.filter((item) => id !== item);
    } else {
      items = [...cartIds, id];
    }
    setCartIds(items);
    // console.log(cartIds);
    inCartItems();
  };

  useEffect(() => {
    inCartItems();
    getTotalCartPrice();
  }, [cartIds, setCartItems]);

  const increaseItemCount = (item) => {
    const updatedCartItems = cartItems.map((product) => {
      if (product.id === item.id) {
        // Return a new object with an incremented count
        return { ...product, count: product.count + 1 };
      }
      return product;
    });

    // Update the cartItems state with the new array
    setCartItems(updatedCartItems);
  };
  const decrementItemCount = (item) => {
    const updatedCartItems = cartItems.map((product) => {
      if (product.id === item.id) {
        if (product.count - 1 == 0) {
          let items = cartIds.filter((idx) => idx !== item.id);
          setCartIds(items);
          return;
        }
        // Return a new object with an incremented count
        return { ...product, count: product.count - 1 };
      }
      return product;
    });

    // Update the cartItems state with the new array
    setCartItems(updatedCartItems);
  };

  const getTotalCartPrice = () => {
    let sum = 0;
    cartItems?.forEach((item) => {
      sum += item?.count * item?.price;
    });

    return sum.toFixed(2);
  };

  return (
    <div className="outer-container" onClick={() => setViewCart(!viewCart)}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="App">
          {error && <h1>Ooops! Error occured😢</h1>}
          {viewCart && (
            <Sidebar
              cartItems={cartItems}
              increaseItemCount={increaseItemCount}
              decrementItemCount={decrementItemCount}
              getTotalCartPrice={getTotalCartPrice}
              setIsCheckoutClicked={setIsCheckoutClicked}
              isCheckoutClicked={isCheckoutClicked}
              setCartIds={setCartIds}
            />
          )}
          <div className="header">
            <button
              className="button-27 header-button"
              onClick={toggleViewCart}
              // onBlur={() => setViewCart(false)}
            >
              View Cart
            </button>
            <h1>Product List</h1>
          </div>
          <div
            className="container"
            style={{ margin: `${viewCart ? "0 0 0 80px" : "0 10px 0 10px"}` }}
          >
            <div className="input">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search Product"
                onChange={handleChange}
                className="input-search"
              />
              <span className="result-count">{`Matches ${filteredProducts.length}`}</span>
            </div>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="card"
                  onClick={() => toggleModal(product)}
                >
                  <div className="title-section">
                    <img src={product.image} alt={`image_${index}`} />
                    <span className="title">{product.title}</span>
                  </div>
                  <span>{product.description}</span>
                  <div className="card-footer">
                    <strong className="price">{`$${product.price}`}</strong>
                    <button
                      className="button-27"
                      onClick={(e) => handleAddToCart(e, product.id)}
                    >
                      {cartIds?.includes(product.id) ? "Remove" : "Add"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No Products to display</div>
            )}
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
              <p>{`Category: ${modalDetails.category}`}</p>
              <h2>{modalDetails.title}</h2>
              <p>{modalDetails.description}</p>
            </Modal>
            <Modal
              isOpen={isCheckoutClicked}
              onClose={() => setIsCheckoutClicked(!isCheckoutClicked)}
            >
              <h2>
                Congratulations!!! Your order will be delivered to you soon.
              </h2>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

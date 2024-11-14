const Sidebar = ({
  cartItems,
  increaseItemCount,
  decrementItemCount,
  getTotalCartPrice,
  setIsCheckoutClicked,
  isCheckoutClicked,
  setCartIds,
}) => (
  <div className="sidebar-overlay" onClick={(e) => e.stopPropagation()}>
    <div className="sidebar">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => {
          return (
            <div key={cartItem?.id} className="sidebar-item">
              <div className="sidebar-section sidebar-img">
                <img src={cartItem?.image} alt={`image_${cartItem?.id}`} />
                <span className="title" style={{ fontSize: "12px" }}>
                  {cartItem?.title}
                </span>
              </div>
              <div
                className="title-section"
                style={{ justifyContent: "space-between" }}
              >
                <div className="cart-btns">
                  <button onClick={() => increaseItemCount(cartItem)}>+</button>
                  {cartItem?.count}
                  <button onClick={() => decrementItemCount(cartItem)}>
                    -
                  </button>
                </div>
                <span>{cartItem?.count * cartItem?.price}</span>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h2>No Items to display</h2>
          <p>Please add items in cart</p>
        </div>
      )}
      <div className="total-price">
        <span>Total: </span>
        <span>`${getTotalCartPrice()}`</span>
      </div>
      {cartItems.length > 0 && (
        <button
          className="button-27"
          style={{ width: "100%", marginTop: "20px" }}
          onClick={() => {
            setIsCheckoutClicked(!isCheckoutClicked);
            setCartIds([]);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  </div>
);

export default Sidebar;

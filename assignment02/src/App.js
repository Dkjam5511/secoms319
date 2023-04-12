const listItems = items.map((el) => (
  // PRODUCT
  <div class="row border-top border-bottom" key={el.id}>
    <div class="row main align-items-center">
      <div class="col-2">
        <img class="img-fluid" src={el.image} />
      </div>
      <div class="col">
        <div class="row text-muted">{el.title}</div>
        <div class="row">{el.category}</div>
      </div>
      <div class="col">
        <button
          type="button"
          variant="light"
          onClick={() => removeFromCart(el)}
        >
          {" "}
          -{" "}
        </button>{" "}
        <button type="button" variant="light" onClick={() => addToCart(el)}>
          {" "}
          +{" "}
        </button>
      </div>
      <div class="col">
        ${el.price} <span class="close">&#10005;</span>
        {howManyofThis(el.id)}
      </div>
    </div>
  </div>
));

function howManyofThis(id) {
  let hmot = cart.filter((cartItem) => cartItem.id === id);
  return hmot;
}

function App() {
  return (
    <div>
      STORE SE/ComS319
      <div class="card">
        <div class="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>319 Shopping Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
              </div>
            </div>
            <div>{listItems}</div>
          </div>
          <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal">${cartTotal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

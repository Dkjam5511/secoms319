import React, { useState, useEffect } from "react";
import items from "./products.json";

const Shop = () => {
  const [list, setList] = useState(items);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCatalog, setShowCatalog] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  function handleCheckoutButton() {
    setShowCatalog(false);
    setShowCart(true);
    setShowConfirm(false);
  }

  function handleSubmitButton() {
    let val = validate();
    console.log(val);
    if (val) {
      setShowCatalog(false);
      setShowCart(false);
      setShowConfirm(true);
    }
  }

  function handleReturnButton() {
    setShowCatalog(true);
    setShowCart(false);
    setShowConfirm(false);
  }

  const listItems = list.map((el) => (
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

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={30} />
      {el.title}${el.price}
    </div>
  ));

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = list.filter((eachItem) => {
      if (e.target.value == "") return list;
      return eachItem.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setList(results);
  };

  function handleClear() {
    setQuery("");
    setList(items);
  }

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const form = document.getElementById("checkout-form");
  const inputCard = document.querySelector("#inputCard");
  const alertTrigger = document.getElementById("submit-btn");
  const summaryCard = document.querySelector(".card");
  const summaryList = document.querySelector(".card > ul");

  console.log(summaryList);

  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      ` <div>${message}</div>`,
      ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function validate() {
    let val = true;
    let email = document.getElementById("inputEmail4");
    let name = document.getElementById("inputName");
    let card = document.getElementById("inputCard");
    if (
      !email.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      email.setAttribute("class", "form-control is-invalid");
      val = false;
    } else {
      email.setAttribute("class", "form-control is-valid");
      //order.email = email.value
      setEmail(email.value);
    }
    if (name.value.length == 0) {
      name.setAttribute("class", "form-control is-invalid");
      val = false;
    } else {
      name.setAttribute("class", "form-control is-valid");
      //order.name = name.value
      setName(name.value);
    }
    if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
      card.setAttribute("class", "form-control is-invalid");
      val = false;
    } else {
      card.setAttribute("class", "form-control is-valid");
      //order.card = card.value
      setCard(card.value);
    }
    return val;
  }
  return (
    <div>
      <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>Drew and Ethans Fruit Shop!</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
                <div class="float-end">
                  <p class="mb-0 me-5 d-flex align-items-center">
                    <span class="small text-muted me-2">Subtotal:</span>
                    <span class="lead fw-normal">
                      ${Math.round(cartTotal * 100) / 100}
                    </span>
                    <span class="small text-muted me-2">Tax:</span>
                    <span class="lead fw-normal">
                      ${Math.round(cartTotal * 0.07 * 100) / 100}
                    </span>
                    <span class="small text-muted me-2">Total:</span>
                    <span class="lead fw-normal">
                      ${Math.round(cartTotal * 107) / 100}
                    </span>
                  </p>
                  {showCatalog && (
                    <button
                      type="button"
                      onClick={() => handleCheckoutButton()}
                    >
                      Proceed to Checkout
                    </button>
                  )}
                  {showCart && (
                    <button type="button" onClick={() => handleReturnButton()}>
                      Return
                    </button>
                  )}
                </div>
              </div>
            </div>
            {showCatalog && (
              <div>
                <div className="py-10">
                  <input
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search"
                  />
                  <button type="button" onClick={handleClear}>
                    Clear Search
                  </button>
                </div>
                {listItems}
              </div>
            )}
            {showCart && (
              <div>
                <h2>Your Cart</h2>
                {cartItems}
                <div class="row">
                  <div class="col-2"></div>
                  <div class="col-8">
                    <h1>Enter Payment Information</h1>
                    <div id="liveAlertPlaceholder"></div>
                    <form class="row g-3" id="checkout-form">
                      <div class="col-md-6">
                        <label for="inputName" class="form-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputName"
                        />
                        <div class="valid-feedback">Looks good!</div>
                        <div class="invalid-feedback">
                          Must be like, "John Doe"
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="inputEmail4"
                        />
                        <div class="valid-feedback">Looks good!</div>
                        <div class="invalid-feedback">
                          Must be like, "abc@xyz.efg"
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="inputCard" class="form-label">
                          Card
                        </label>
                        <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">
                            <i class="bi-credit-card-fill"></i>
                          </span>
                          <input
                            type="text"
                            id="inputCard"
                            class="form-control"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                          <div class="valid-feedback">Looks good!</div>
                          <div class="invalid-feedback">
                            Must be like, "7777-7777-7777-7777"
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="inputAddress" class="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputAddress"
                          placeholder="1234 Main St"
                        />
                      </div>
                      <div class="col-12">
                        <label for="inputAddress2" class="form-label">
                          Address 2
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputAddress2"
                          placeholder="Apartment, studio, or floor"
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="inputCity" class="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputCity"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputState" class="form-label">
                          State
                        </label>
                        <select id="inputState" class="form-select">
                          <option selected>Iowa</option>
                          <option selected>Nebraska</option>
                          <option selected>Florida</option>
                          <option selected>Idaho</option>
                          <option selected>Montana</option>
                          <option selected>Choose...</option>
                        </select>
                      </div>
                      <div class="col-md-2">
                        <label for="inputZip" class="form-label">
                          Zip
                        </label>
                        <input type="text" class="form-control" id="inputZip" />
                      </div>
                      <div class="col-12">
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => handleSubmitButton()}
                        >
                          {" "}
                          <i class="bi-bag-check"></i> Order
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="col-2"></div>
                </div>
              </div>
            )}
            {showConfirm && (
              <div class="card" style={{ width: 18 + "rem" }}>
                <div class="card-body">
                  <h5 class="card-title">Thank you for your order!</h5>
                  <p class="card-text">
                    <u>Order Summary</u>
                  </p>
                  {cartItems}
                  <br />
                  {name}
                  <br />
                  {email}
                  <br />
                  {card}
                  <br />
                </div>
                <ul class="list-group list-group-flush"></ul>
                <a
                  href=""
                  onclick="location.reload()"
                  class="btn btn-secondary"
                >
                  {" "}
                  <i class="bi-arrow-left-circle"></i>
                  Return
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

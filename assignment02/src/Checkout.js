let items = [
  {
    id: 1,
    title: "Apple",
    price: 1.5,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "Fruit",
    image: "./images/apple.png",
    rating: { rate: 4.5, count: 530 },
  },
  {
    id: 2,
    title: "Avocado",
    price: 7,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "Fruit",
    image: "./images/avocado.png",
    rating: { rate: 4.9, count: 259 },
  },
  {
    id: 3,
    title: "Banana",
    price: 3,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "Fruit",
    image: "./images/banana.png",
    rating: { rate: 4.4, count: 240 },
  },
  {
    id: 4,
    title: "Grape",
    price: 1.1,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "Fruit",
    image: "./images/grape.png",
    rating: { rate: 4.0, count: 890 },
  },
  {
    id: 5,
    title: "Peach",
    price: 3,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "Fruit",
    image: "./images/peach.png",
    rating: { rate: 3.6, count: 200 },
  },
  {
    id: 6,
    title: "Pineapple",
    price: 9,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "Fruit",
    image: "./images/pineapple.png",
    rating: { rate: 4.9, count: 150 },
  },
];

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
      {/*SHOPPING CART ITEMS*/}
      STORE SE/ComS319
      <div class="card">
        <div class="row">
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
      {/* PAYMENT INFORMATION FORM */}
      <div class="container">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <h1>Javascript Form Validation</h1>
            <div id="liveAlertPlaceholder"></div>
            <form class="row g-3" id="checkout-form">
              <div class="col-md-6">
                <label for="inputName" class="form-label">
                  Full Name
                </label>
                <input type="text" class="form-control" id="inputName" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Must be like, "John Doe"</div>
              </div>
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Email
                </label>
                <input type="email" class="form-control" id="inputEmail4" />
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Must be like, "abc@xyz.efg"</div>
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
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="col-md-4">
                <label for="inputState" class="form-label">
                  State
                </label>
                <select id="inputState" class="form-select">
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-success">
                  {" "}
                  <i class="bi-bag-check"></i> Order
                </button>
              </div>
            </form>
            <div class="card collapse" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Order summary</h5>
                <p class="card-text">Here is a summary of your order.</p>
              </div>
              <ul class="list-group list-group-flush"></ul>
              <a href="" onclick="location.reload()" class="btn btn-secondary">
                {" "}
                <i class="bi-arrow-left-circle"></i>
                Return
              </a>
            </div>
            <footer class="bd-footer py-4 py-md-5 mt-5 bg-light">
              <div class="container py-4 py-md-5 px-4 px-md-3">
                <div class="row">
                  <div class="col-lg-12 mb-3">
                    <b>SE/Com-S 319</b> Javascript form validation.
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    </div>
  );
}

//PAYMENT FORM VALIDATION
let validate = function () {
  val = true;
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
    order.email = email.value;
  }
  if (name.value.length == 0) {
    name.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    name.setAttribute("class", "form-control is-valid");
    order.name = name.value;
  }
  if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
    card.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    card.setAttribute("class", "form-control is-valid");
    order.card = card.value;
  }
  if (val) {
    form.classList.add("collapse");
    for (const [key, value] of Object.entries(order)) {
      summaryList.innerHTML +=
        '<li class="list-group-item"> <b>' +
        `${key}` +
        ": </b>" +
        `${value}` +
        "</li>";
    }
    summaryCard.classList.remove("collapse");
    alertPlaceholder.innerHTML = "";
    alert(
      '<i class="bi-cart-check-fill"></i> You have made an order!',
      "success"
    );
  }
  return val;
};

export default App;

import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked3, setChecked3] = useState(false);

  const [viewer4, setViewer4] = useState(false);

  const [viewProducts, setViewProducts] = useState(false);
  const [viewAddProduct, setViewAddProduct] = useState(false);
  const [viewUpdateProduct, setViewUpdateProduct] = useState(false);
  const [viewDeleteProduct, setViewDeleteProduct] = useState(false);
  const [viewAuthor, setViewAuthor] = useState(false);

  const [addNewPrice, setAddNewPrice] = useState({
    _id: 0,
    price: 0.0,
  })

  function handlePriceChange(evt) {
    const value = evt.target.value;
    setAddNewPrice({ ...addNewPrice, _id: index + 1, price: value });
  }

  function showReadView() {
    setViewProducts(!viewProducts);
  }

  function showUpdateView() {
    setViewUpdateProduct(!viewUpdateProduct);
  }

  function showCreateView() {
    setViewAddProduct(!viewAddProduct);
  }

  function showDeleteView() {
    setViewDeleteProduct(!viewDeleteProduct);
  }

  function showAuthorView() {
    setViewAuthor(!viewAuthor);
  }

  useEffect(() => {
    getAllProducts();
    }, []);

  useEffect(() => {
    getAllProducts();
    }, [checked4]);

  function getAllProducts() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setProduct(data);
    });
    setViewer1(!viewer1);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={30} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: {el.price} <br />
    Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
      setViewer2(!viewer2);
    } else {
    console.log("Wrong number of Product id.");
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
    const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
      ...addNewProduct,
      rating: { rate: temp, count: value },
      });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post a new product completed");
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: deleteid }),
    })
    .then((response) => response.json())
    .then((data) => {
    console.log("Delete a product completed : ", deleteid);
    console.log(data);
    if (data) {
    //const keys = Object.keys(data);
    const value = Object.values(data);
    alert(value);
    }
    });
    setChecked4(!checked4);
    }

    function handleOnUpdate(e) {
      e.preventDefault();
      console.log(e.target.value);
      fetch("http://localhost:4000/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewPrice),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Put a new price completed");
          console.log(data);
          if (data) {
            //const keys = Object.keys(data);
            const value = Object.values(data);
            alert(value);
          }
        });
    }

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={30} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: {el.price} <br />
    Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  return (
    <div>
      <h1>Catalog of Products</h1>
      <button onClick={() => showCreateView()}>Create</button>
      <button onClick={() => showReadView()}>Read</button>
      <button onClick={() => showUpdateView()}>Update</button>
      <button onClick={() => showDeleteView()}>Delete</button>
      <button onClick={() => showAuthorView()}>Authors</button>

      {viewProducts && <div>
        <h3>Show all available Products:</h3>
        <button onClick={() => getAllProducts()}>Show All Products</button>
        <hr></hr>
        {viewer1 && <div>Products {showAllItems}</div>}
      </div>}
      {viewProducts && <div><h3>Show one Product by Id:</h3>
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
        {viewer2 && <div>Product: {showOneItem}</div>}
      </div>}
      {viewAddProduct && <div>
        <h3>Add a new product :</h3>
        <form action="">
          <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
          <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
          <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
          <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
          <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
          <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
          <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
          <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
        </form>
      </div>}

      {viewUpdateProduct && <div>
        <h3>Update a products's price</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked3}
          onChange={(e) => setChecked3(!checked3)} />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <input type="number" placeholder="new price?" name="newPrice" value={addNewPrice.price} onChange={handlePriceChange} />
        <button type="submit" onClick={handleOnUpdate}>Update</button>
        {checked3 && (
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
      </div>}

      {viewDeleteProduct && <div>
        <h3>Delete one product:</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
          onChange={(e) => setChecked4(!checked4)} />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
        {checked4 && (
          <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate :{product[index].rating.rate} and Count:
            {product[index].rating.count} <br />
          </div>
        )}
      </div>}

      {viewAuthor && <div>
        <h3>Student Information</h3>
        <p>SE/COM S 319</p>
        <p>4/30/2023</p>
        <p>Abraham Aldaco</p>

        <h4>Drew Kinneer</h4>
        <p>Email: dkinneer@iastate.edu</p>
        <h4>Ethan Kinneer</h4>
        <p>Email: ekinneer@iastate.edu</p>
      </div>}
    </div>
  );
}

export default App;

import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [Stock, setStock] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneStock, setOneStock] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked3, setChecked3] = useState(false);

  const [viewer4, setViewer4] = useState(false);

  const [viewStocks, setViewStocks] = useState(false);
  const [viewAddStock, setViewAddStock] = useState(false);
  const [viewUpdateStock, setViewUpdateStock] = useState(false);
  const [viewDeleteStock, setViewDeleteStock] = useState(false);
  const [viewAuthor, setViewAuthor] = useState(false);

  const [addNewFavorite, setAddNewFavorite] = useState({
    _id: 0,
    favorite: 0,
  })

  function handleFavoriteChange(evt) {
    const value = evt.target.value;
    setAddNewFavorite({ ...addNewFavorite, _id: index + 1, favorite: value });
  }

  function showReadView() {
    setViewStocks(!viewStocks);
  }

  function showUpdateView() {
    setViewUpdateStock(!viewUpdateStock);
  }

  function showCreateView() {
    setViewAddStock(!viewAddStock);
  }

  function showDeleteView() {
    setViewDeleteStock(!viewDeleteStock);
  }

  function showAuthorView() {
    setViewAuthor(!viewAuthor);
  }

  useEffect(() => {
    getAllStocks();
    }, []);

  useEffect(() => {
    getAllStocks();
    }, [checked4]);

  function getAllStocks() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Stocks :");
      console.log(data);
      setStock(data);
    });
    setViewer1(!viewer1);
  }

  const showAllItems = Stock.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={30} /> <br />
    Name: {el.name} <br />
    Favorite: {el.favorite.toString()} <br />
    Data: {el.data[6]} <br />
    </div>
  ));

  function getOneStock(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one Stock :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneStock(dataArr);
      });
      setViewer2(!viewer2);
    } else {
    console.log("Wrong number of Stock id.");
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewStock({ ...addNewStock, _id: value });
    } else if (evt.target.name === "name") {
      setAddNewStock({ ...addNewStock, name: value });
    } else if (evt.target.name === "favorite") {
      setAddNewStock({ ...addNewStock, favorite: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewStock({ ...addNewStock, image: temp });
    } else if (evt.target.name === "data") {
      setAddNewStock({ ...addNewStock, data: value });
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewStock),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post a new Stock completed");
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
  }

  function getOneByOneStockNext() {
    if (Stock.length > 0) {
      if (index === Stock.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (Stock.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneStockPrev() {
    if (Stock.length > 0) {
      if (index === 0) setIndex(Stock.length - 1);
      else setIndex(index - 1);
      if (Stock.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneStock(deleteid) {
    console.log("Stock to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: deleteid }),
    })
    .then((response) => response.json())
    .then((data) => {
    console.log("Delete a Stock completed : ", deleteid);
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
        body: JSON.stringify(addNewFavorite),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Put a new Data completed");
          console.log(data);
          if (data) {
            //const keys = Object.keys(data);
            const value = Object.values(data);
            alert(value);
          }
        });
    }

  const showOneItem = oneStock.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Name: {el.name} <br />
      Favorite: {el.favorite} <br />
      Data: {el.data[6]} <br />
    </div>
  ));

  const [addNewStock, setAddNewStock] = useState({
    _id: 0,
    name: "",
    favorite: false,
    image: "http://127.0.0.1:4000/images/",
    data: [0,0,0,0,0,0,0],
  });

  return (
    <div>
      <h1>Catalog of Stocks</h1>
      <button onClick={() => showCreateView()}>Create</button>
      <button onClick={() => showReadView()}>Read</button>
      <button onClick={() => showUpdateView()}>Update</button>
      <button onClick={() => showDeleteView()}>Delete</button>
      <button onClick={() => showAuthorView()}>Authors</button>

      {viewStocks && <div>
        <h3>Show all available Stocks:</h3>
        <button onClick={() => getAllStocks()}>Show All Stocks</button>
        <hr></hr>
        {viewer1 && <div>Stocks {showAllItems}</div>}
      </div>}
      {viewStocks && <div><h3>Show one Stock by Id:</h3>
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneStock(e.target.value)} />
        {viewer2 && <div>Stock: {showOneItem}</div>}
      </div>}
      {viewAddStock && <div>
        <h3>Add a new Stock :</h3>
        <form action="">
          <input type="number" placeholder="id?" name="_id" value={addNewStock._id} onChange={handleChange} />
          <input type="text" placeholder="name?" name="name" value={addNewStock.name} onChange={handleChange} />
          <input type="boolean" placeholder="favorite?" name="favorite" value={addNewStock.favorite} onChange={handleChange} />
          <input type="text" placeholder="image?" name="image" value={addNewStock.image} onChange={handleChange} />
          <input type="text" placeholder="data?" name="data" value={addNewStock.data} onChange={handleChange} />
          <button type="submit" onClick={handleOnSubmit}>
            submit
          </button>
        </form>
      </div>}

      {viewUpdateStock && <div>
        <h3>Update a Stocks's Favorite</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked3}
          onChange={(e) => setChecked3(!checked3)} />
        <button onClick={() => getOneByOneStockPrev()}>Prev</button>
        <button onClick={() => getOneByOneStockNext()}>Next</button>
        <input type="boolean" placeholder="favorite?" name="favorite" value={addNewFavorite.favorite} onChange={handleFavoriteChange} />
        <button type="submit" onClick={handleOnUpdate}>Update</button>
        {checked3 && (
          <div key={Stock[index]._id}>
            <img src={Stock[index].image} width={30} /> <br />
            Id:{Stock[index]._id} <br />
            Name: {Stock[index].name} <br />
            Favorite: {Stock[index].favorite.toString()} <br />
            Data: {Stock[index].data} <br />
          </div>
        )}
      </div>}

      {viewDeleteStock && <div>
        <h3>Delete one Stock:</h3>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
          onChange={(e) => setChecked4(!checked4)} />
        <button onClick={() => getOneByOneStockPrev()}>Prev</button>
        <button onClick={() => getOneByOneStockNext()}>Next</button>
        <button onClick={() => deleteOneStock(Stock[index]._id)}>Delete</button>
        {checked4 && (
          <div key={Stock[index]._id}>
            <img src={Stock[index].image} width={30} /> <br />
            Id:{Stock[index]._id} <br />
            Name: {Stock[index].name} <br />
            Favorite: {Stock[index].favorite.toString()}<br />
            Data: {Stock[index].data}<br />
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

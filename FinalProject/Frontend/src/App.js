import "./App.css";
import Chart from "chart.js/auto";
import { useState, useEffect, useRef } from "react";

function App() {
  const [Stock, setStock] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneStock, setOneStock] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [checked3, setChecked3] = useState(false);

  const [viewer4, setViewer4] = useState(false);

  const [viewAddStock, setViewAddStock] = useState(false);
  const [viewUpdateStock, setViewUpdateStock] = useState(false);
  const [viewDeleteStock, setViewDeleteStock] = useState(false);
  const [viewDashboard, setDashboardView] = useState(false);
  const [viewHome, setHomeView] = useState(true);
  const [viewAbout, setAboutView] = useState(false);

  const chartRef = useRef(null);
  const myChart = useRef(null);

  const [chartData, setChartData] = useState([50, 50, 60, 40, 50, 60, 50]);

  const [addNewFavorite, setAddNewFavorite] = useState({
    _id: 0,
    favorite: 0,
  });

  function handleFavoriteChange(evt) {
    const value = evt.target.value;
    setAddNewFavorite({ ...addNewFavorite, _id: index + 1, favorite: value });
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

  function showDashboardView() {
    setDashboardView(true);
    setHomeView(false);
    setAboutView(false);
  }

  function showHomeView() {
    setDashboardView(false);
    setHomeView(true);
    setAboutView(false);
  }

  function showAboutView() {
    setDashboardView(false);
    setHomeView(false);
    setAboutView(true);
  }

  useEffect(() => {
    getAllStocks();
  }, []);

  useEffect(() => {
    getAllStocks();
  }, [checked4]);

  useEffect(() => {
    if (myChart.current) {
      myChart.current.data.datasets[0].data = chartData;
      myChart.current.update();
    }
  }, [chartData]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          datasets: [
            {
              data: chartData,
              lineTension: 0,
              backgroundColor: "transparent",
              borderColor: "#007bff",
              borderWidth: 4,
              pointBackgroundColor: "#007bff",
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
        },
      });
      myChart.current = chart;
    }
  }, [chartRef, chartData]);

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

  var favoriteStocks = Stock.filter(function (stock) {
    return stock.favorite;
  });

  const showFavoritedStocks = favoriteStocks.map((el) => (
    <div class="col-3" key={el._id}>
      <img src={el.image} width={30} /> <br />
      {el.name} <br />${el.data[6]} <br />
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
    data: [0, 0, 0, 0, 0, 0, 0],
  });

  const showAllStocks = Stock.map((el) => (
    <div key={el._id}>
      <tbody>
        <tr onClick={() => setChartData(el.data)}>
          <td>{el.name}</td>
          <td id="image1">
            <img src={el.image} width={30} />
          </td>
          <td id="price1">{el.data[6]}</td>
        </tr>
      </tbody>
    </div>
  ));

  return (
    <div>
      <nav class="navbar bg-primary" data-bs-theme="dark">
        <div class="container">
          <a class="navbar-brand text-white" href="./">
            StockStream
          </a>
          <a
            class="nav-link text-white active"
            aria-current="page"
            onClick={() => showHomeView()}
          >
            Home
          </a>
          <a class="nav-link text-white" onClick={() => showDashboardView()}>
            Stock Dashboard
          </a>
          <a class="nav-link text-white" onClick={() => showAboutView()}>
            About Us
          </a>
        </div>
      </nav>
      {viewHome && (
        <div>
          <div class="container">
            <h1>Favorite Stocks</h1>
            <div class="row">{showFavoritedStocks}</div>
          </div>
          <h1>Catalog of Stocks</h1>
          <button onClick={() => showCreateView()} class="download2">
            Create
          </button>
          <button onClick={() => showUpdateView()} class="download2">
            Update
          </button>
          <button onClick={() => showDeleteView()} class="download2">
            Delete
          </button>
          {viewAddStock && (
            <div>
              <h3>Add a new Stock :</h3>
              <form action="">
                <input
                  type="number"
                  placeholder="id?"
                  name="_id"
                  value={addNewStock._id}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="name?"
                  name="name"
                  value={addNewStock.name}
                  onChange={handleChange}
                />
                <input
                  type="boolean"
                  placeholder="favorite?"
                  name="favorite"
                  value={addNewStock.favorite}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="image?"
                  name="image"
                  value={addNewStock.image}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="data?"
                  name="data"
                  value={addNewStock.data}
                  onChange={handleChange}
                />
                <button type="submit" onClick={handleOnSubmit}>
                  submit
                </button>
              </form>
            </div>
          )}

          {viewUpdateStock && (
            <div>
              <h3>Update a Stocks's Favorite</h3>
              <input
                type="checkbox"
                id="acceptdelete"
                name="acceptdelete"
                checked={checked3}
                onChange={(e) => setChecked3(!checked3)}
              />
              <button onClick={() => getOneByOneStockPrev()}>Prev</button>
              <button onClick={() => getOneByOneStockNext()}>Next</button>
              <input
                type="boolean"
                placeholder="favorite?"
                name="favorite"
                value={addNewFavorite.favorite}
                onChange={handleFavoriteChange}
              />
              <button type="submit" onClick={handleOnUpdate}>
                Update
              </button>
              {checked3 && (
                <div key={Stock[index]._id}>
                  <img src={Stock[index].image} width={30} /> <br />
                  Id:{Stock[index]._id} <br />
                  Name: {Stock[index].name} <br />
                  Favorite: {Stock[index].favorite.toString()} <br />
                  Data: {Stock[index].data} <br />
                </div>
              )}
            </div>
          )}

          {viewDeleteStock && (
            <div>
              <h3>Delete one Stock:</h3>
              <input
                type="checkbox"
                id="acceptdelete"
                name="acceptdelete"
                checked={checked4}
                onChange={(e) => setChecked4(!checked4)}
              />
              <button onClick={() => getOneByOneStockPrev()}>Prev</button>
              <button onClick={() => getOneByOneStockNext()}>Next</button>
              <button onClick={() => deleteOneStock(Stock[index]._id)}>
                Delete
              </button>
              {checked4 && (
                <div key={Stock[index]._id}>
                  <img src={Stock[index].image} width={30} /> <br />
                  Id:{Stock[index]._id} <br />
                  Name: {Stock[index].name} <br />
                  Favorite: {Stock[index].favorite.toString()}
                  <br />
                  Data: {Stock[index].data}
                  <br />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {viewDashboard && (
        <div>
          <h1>Stock Dashboard</h1>
          <div className="d-flex">
            <canvas class="my-4 w-100" ref={chartRef} />
          </div>
          <h2>All Stocks (Click a stock to see its price history!)</h2>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>{showAllStocks}</tbody>
            </table>
          </div>
        </div>
      )}
      {viewAbout && (
        <div>
          <h1 class="text-center">
            SE/ComS319 Construction of User Interfaces, Spring 2023
          </h1>
          <h3 class="text-center">March 12, 2023</h3>
          <div class="row bg-light" style={{ padding: "20px" }}>
            <div class="col-3">
              <img
                src="./Frontend/public/ethan.jpg"
                style={{ width: "50%", borderRadius: "25%" }}
              />
            </div>
            <div class="col-3">
              <h2>Ethan Kinneer</h2>
              <ul>
                <li>NetID: ekinneer@iastate.edu</li>
                <li>Senior in MIS and Computer Science</li>
                <li>Loves playing basketball and skiing</li>
                <li>Currently learning THREE.js</li>
                <li>GOAT at ALL video games</li>
              </ul>
            </div>
            <div class="col-3">
              <img
                src="./myotherimages/Drew_Kinneer.jpg"
                style={{ width: "50%", borderRadius: "25%" }}
              />
            </div>
            <div class="col-3">
              <h2>Drew Kinneer</h2>
              <ul>
                <li>NetID: dkinneer@iastate.edu</li>
                <li>Sophmore in software engineering</li>
                <li>Watches the NBA frequently</li>
                <li>Avid robitics developer</li>
                <li>GOAT at Super Smash Bros Melee</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

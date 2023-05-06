const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stock = require("./dataSchema.js");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
  const query = {};
  const allStocks = await Stock.find(query);
  console.log(allStocks);
  resp.send(allStocks);
});

app.get("/:id", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneStock = await Stock.findOne(query);
  console.log(oneStock);
  resp.send(oneStock);
});

app.post("/insert", async (req, res) => {
  console.log(req.body);
  const s_id = req.body._id;
  const sname = req.body.name;
  const sfavorite = req.body.favorite;
  const simage = req.body.image;
  const sdata = req.body.data;
  const formData = new Stock({
    _id: s_id,
    name: sname,
    favorite: sfavorite,
    image: simage,
    data: sdata,
  });
  try {
    // await formData.save();
    await Stock.create(formData);
    const messageResponse = { message: `Stock ${s_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new Stock:" + err);
  }
});

app.put("/update", async (req, res) => {
  console.log("Update :", req.body);
  try {
    await Stock.findOneAndUpdate(
      { _id: req.body._id },
      { favorite: req.body.favorite }
    );
    const messageResponse = {
      message: `Stock ${req.body._id} updated correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while updating :" + s_id + " " + err);
  }
});

app.delete("/delete", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Stock.deleteOne(query);
    const messageResponse = {
      message: `Stock ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + s_id + " " + err);
  }
});

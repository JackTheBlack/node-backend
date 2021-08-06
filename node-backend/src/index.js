var mysql = require("mysql");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const path = require("path");

const user = "jack";
const password = "1234";
const dbName = "api_db";
const uri = `mongodb+srv://jack:${password}@cluster0.z70zv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const app = express();

////////////////midlewere////////////////////////
app.use(express.json());
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conexion exitosa"))
  .catch((e) => console.log(e));

app.use(morgan("dev"));
/*var conetion = mysql.createConnection({
  host: "localhost",
  database: "api_db",
  user: "root",
  password: "",
});

conetion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("succesful connection");
  }
});*/

var json = [
  {
    id: 1,
    name: "dante",
    dni: 666,
  },
];
/////////////// ROUTES////////////////////////
app.get("/api", async (req, res) => {
  const userdb = await User.find({}).exec();
  console.log(userdb);

  res.send(userdb);
});

app.post("/api", async (req, res) => {
  console.log(req.body);
  const { name, dni } = req.body;
  const newUser = new User({
    name,
    dni,
  });
  await newUser.save();

  res.send("post request recived");
});

app.put("/api/:id", async (req, res) => {
  const updates = req.body;

  try {
    await User.findByIdAndUpdate(req.params.id, updates);
    console.log(req.params.id);
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/api/:id", async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.send(req.params.id + " eliminado");
});

app.get("/api/:id", async (req, res) => {
  await User.findById(req.params.id);
  res.send(req.body);
});

app.get("/about", (req, res) => {
  res.json(json[0].name);
});

app.get("/test", (req, res) => {
  res.send("<h1>Olaaaaa</h1>");
});

/////////////static files///////////////////

app.use(express.static(path.join(__dirname, "public")));

/////// server/////////////////
app.listen(5000, () => {
  console.log("server on port 5000");
});

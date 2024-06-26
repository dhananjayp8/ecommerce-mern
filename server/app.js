require("dotenv").config();

const express = require("express");

const app = express();
require("./db/connection");
const cors = require("cors");

const PORT = 4009;

app.use(cors());
app.use(express.json());

//admin routes
const adminAuthRouter = require("./routes/admin/adminAuthRoutes");
app.use("/adminauth/api", adminAuthRouter);
app.get("/", (req, res) => {
  res.status(200).json("server start");
});

const productsroutes = require("./routes/products/productsroutes");
app.use("/product/api", productsroutes);

app.listen(PORT, () => {
  console.log(`Server start at ${PORT}`);
});

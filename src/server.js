const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const errorHandler = require("./middlewares/errorMiddleware");

//allowed all remote to acces backend
app.use(
  cors({
    origin: "*",
  })
);

//for handling json body data from front-end
app.use(express.json());

//for handling json body urlencoded data from front-end
app.use(express.urlencoded({ extended: false }));

//database connection
connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "everything is  working  fine 🚀" });
});
//all the routes for serve
app.use("/api/", require("./routes/userRoute"));
app.use("/api/", require("./routes/barcodeRoute"));

const PORT = process.env.PORT || 3000;

//handling errors

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.. `);
});

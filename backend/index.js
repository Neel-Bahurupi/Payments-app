const express = require("express");
const cors = require("cors");
const app = express();
const rootRouter = require("./routes/index");

app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);

rootRouter.get("/data", function (req, res) {
  res.json({ data: "adadasdasd" });
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

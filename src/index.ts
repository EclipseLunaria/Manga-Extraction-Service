import router from "./routes/routes";
import express from "express";
import process from "process";
import commonRouter from "./routes/shared";
const app = express();
const port = process.env.PORT || 6967;
app.use("/extract/", router);
app.use("/common/", commonRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

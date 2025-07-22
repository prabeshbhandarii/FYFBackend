import express from "express";
import UserRouter from "./routers/UserRouter.js"
import CategoryRouter from "./routers/CategoryRouter.js";
import EventRouter from "./routers/EventRouter.js"
import EnrollRouter from "./routers/EnrollRouter.js";
import { limiter } from "./middlewares/RateLimiter.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())

app.use(limiter)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", UserRouter)

app.use("/category", CategoryRouter)

app.use("/event", EventRouter)

app.use("/enroll", EnrollRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

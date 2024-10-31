import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config";

import timelineRoute from "./routes/timeline.route";

const app: Express = express();
const port = process.env.SERVER_PORT;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1/timeline", timelineRoute);

app.get("/healthcheck", (_: Request, res: Response) => {
  const now = new Date();
  res.json({
    success: true,
    timestamp: now.toISOString(),
    uptime: process.uptime(),
  });
});

// app.use((_: Request, res: Response) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

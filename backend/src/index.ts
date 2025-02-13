import express, { Express, Request, Response } from "express";

import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", (req: Request, res: Response) => {
  res.json({ message: " 👋 Hello World" });
});

app.use("/health", (req: Request, res: Response) => {
  res.json({ message: "Server is up and running 🤖" });
});

export default app;

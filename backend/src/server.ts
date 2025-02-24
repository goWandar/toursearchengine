import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import subscribersRoutes from "./routes/subscribers.routes";
import adminRoutes from "./routes/admin.routes";

import logger from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
//app.use(
//    cors({
//        origin: [
//            `http://localhost:${port}`,
//            "https://kulturexploratest.onrender.com",
//        ],
//    })
//);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://your-frontend.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(express.json());

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SyntaxError && "body" in error) {
        logger.error(
            "\x1b[31m[Server] Invalid JSON received:\x1b[0m",
            error.message
        );
        res.status(400).json({ error: "Invalid JSON format" });
        return;
    }
    next();
});

// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", subscribersRoutes);

app.use((req, res) => {
    logger.error(` Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

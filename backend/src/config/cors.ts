import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
    origin: ["http://localhost:5173", "https://kulturexploratest.netlify.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsConfig;

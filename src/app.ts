import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import morgan from "morgan";
import "reflect-metadata";
import fileUpload from "express-fileupload";
import { modelList } from "./utils/modelList";
import AdminRoute from "./modules/admin/routes/admin.routes"
import AuthRouter from "./modules/auth/route/auth.routes"
import AdminEntryRoute from "./modules/admin/routes/admin_to_entry.routes"



const app = express();

app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:5173",
        ],
      })
);

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false }))

app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
);


// Initialize Models
modelList;

app.use("/api", AdminRoute);
app.use("/api", AuthRouter);
app.use("/api", AdminEntryRoute);


app.use(notFound);
app.use(errorHandler)

export default app;

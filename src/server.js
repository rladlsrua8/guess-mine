import { join } from "path";
import express from "express";
import SocketIO from "socket.io";
import morgan from "morgan";
import logger from "morgan";
import socketController from "./socketController";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = SocketIO.listen(server);

io.on("connection", socket => socketController(socket));

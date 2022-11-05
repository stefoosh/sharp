import express from "express";
import path from "path";
import cors from "cors";

import Log from "./util/logging";

const server = express();
const log = Log(path.basename(__filename));

const port = 9090;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/health", (req, res) => res.status(200).send("OK"));

server.listen(port, () => {
  log.info(`Server listening on port ${port}`);
});

process.on("unhandledRejection", (reason) => {
  log.error(`Unhandled Rejection at: ${reason.stack || reason}`);
});
process.on("uncaughtException", (err) => {
  log.error("Uncaught Exception ", err);
});

// export default server;

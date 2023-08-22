import express from "express";
import fs from 'fs';
import path from "path";
import cors from "cors";

import Log from "./util/logging";

const server = express();
const log = Log(path.basename(__filename));

const port = 9090;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const nhlScoresJsonStadiumsUrl = "/nhl/scores/json/Stadiums";
const nhlStadiumList = [
  {
  "StadiumID": 20,
  "Name": "Madison Square Garden",
  "City": "New York",
  "State": "NY",
  "Country": "USA",
  "GeoLat": 40.750556,
  "GeoLong": -73.993611,
  "Capacity": 18200
},
  {
    "StadiumID": 14,
    "Name": "Crypto.com Arena",
    "City": "Los Angeles",
    "State": "CA",
    "Country": "USA",
    "GeoLat": 34.043056,
    "GeoLong": -118.267222,
    "Capacity": 18997
  }
];

const mlbScoresJsonStadiumsUrl = "/mlb/scores/json/Stadiums";
const mlbStadiumList = [{"StadiumID": 99,"Active": true,"Name": "PETCO Park","City": "San Diego","State": "CA","Country": "USA","GeoLat": 32.7073,"GeoLong": -117.1566,"Altitude": 14,"HomePlateDirection": 180,"Type": "Outdoor", "Capacity": 60000}];
// const mlbStadiumList = [];

const soccerScoresJsonStadiumsUrl = "/soccer/scores/json/Venues"
const soccerStadiumList = JSON.parse(fs.readFileSync('/Users/stefoosh/src/sharp/src/soccerScoresJsonVenues.json'));
// console.log(soccerStadiumList);

const nhlGamesUrl = "/nhl/scores/json/Games/2023";
const nhlGamesList = JSON.parse(fs.readFileSync("/Users/stefoosh/src/sportsdata-synchronizer/responses/nhlSchedules.json"));
// console.log(nhlGamesList);
server.use(mlbScoresJsonStadiumsUrl, (req, res) => {
  log.debug(`${req.method} ${mlbScoresJsonStadiumsUrl}`);
  log.debug(`req.headers=${JSON.stringify(req.headers)}`);
  res.status(200)
    .contentType("application/json")
    .send(JSON.stringify(mlbStadiumList));
});

server.use(nhlScoresJsonStadiumsUrl, (req, res) => {
  log.debug(`${req.method} ${nhlScoresJsonStadiumsUrl}`);
  log.debug(`req.headers=${JSON.stringify(req.headers)}`);
  res.status(200)
    .contentType("application/json")
    .send(JSON.stringify(nhlStadiumList));
});

server.use(soccerScoresJsonStadiumsUrl, (req, res) => {
  log.debug(`${req.method} ${soccerScoresJsonStadiumsUrl}`);
  log.debug(`req.headers=${JSON.stringify(req.headers)}`);
  res.status(200)
    .contentType("application/json")
    .send(JSON.stringify(soccerStadiumList));
});

server.use(nhlGamesUrl, (req, res) => {
  log.debug(`${req.method} ${nhlGamesUrl}`);
  log.debug(`req.headers=${JSON.stringify(req.headers)}`);
  res.status(200)
    .contentType("application/json")
    .send(JSON.stringify(nhlGamesList));
});

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

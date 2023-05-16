import express from "express";
import esClient, { test } from "./elasticsearch/client.js";

const app = express();

const port = 3001;

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);

test();

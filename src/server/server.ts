import express from "express";
import client, { test } from "./elasticsearch/client.js";
import data from "./data_management/retrieve_and_ingest_data.js";

const app = express();

const port = 3001;

app.use("/ingest_data", data);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);

test();

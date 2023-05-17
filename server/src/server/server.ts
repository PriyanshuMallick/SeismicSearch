import express from "express";
import cors from "cors";

import envs from "../config/envs.js";
import data from "./data_management/retrieve_and_ingest_data.js";
import client, { connectToElasticsearch } from "./elasticsearch/client.js";

const app = express();

const PORT = process.env.SERVER_PORT || 3001;

app.use("/ingest_data", data);

app.use(cors());

app.get("/results", (req, res) => {
  const passedType = req.query.type;
  const passedMag = req.query.mag;
  const passedLocation = req.query.location;
  const passedDateRange = req.query.dateRange;
  const passedSortOption = req.query.sortOption;

  async function sendESRequest() {
    try {
      const body = await client.search({
        index: envs.elastic.index,
        body: {
          sort: [
            {
              mag: {
                order: passedSortOption,
              },
            },
          ],
          size: 300,
          query: {
            bool: {
              filter: [
                {
                  term: {
                    type: passedType,
                  },
                },
                {
                  range: {
                    mag: {
                      gte: passedMag,
                    },
                  },
                },
                {
                  match: {
                    place: passedLocation,
                  },
                },
                {
                  range: {
                    "@timestamp": {
                      gte: `now-${passedDateRange}d/d`,
                      lt: "now/d",
                    },
                  },
                },
              ],
            },
          },
        },
      });
      res.json(body.hits.hits);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  sendESRequest();
});

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);

connectToElasticsearch();

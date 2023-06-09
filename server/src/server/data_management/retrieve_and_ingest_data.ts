import express from "express";
import axios from "axios";
import client from "../elasticsearch/client.js";
import "log-timestamp";
import envs from "../../config/envs.js";

const router = express.Router();
const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`;

router.get(`/${envs.elastic.index}`, async function (req, res) {
  console.log("Loading Application...");
  res.json("Running Application...");

  async function indexData() {
    try {
      console.log("Retrieving data from the USGS API");

      const EARTHQUAKES = await axios.get(`${URL}`, {
        headers: {
          "Content-Type": ["application/json", "charset=utf-8"],
        },
      });

      console.log("Data retrieved!");

      let results = EARTHQUAKES.data.features;

      console.log("Indexing data...");

      results.map(async (results) => {
        let earthquakeObject = {
          place: results.properties.place,
          time: results.properties.time,
          tz: results.properties.tz,
          url: results.properties.url,
          detail: results.properties.detail,
          felt: results.properties.felt,
          cdi: results.properties.cdi,
          alert: results.properties.alert,
          status: results.properties.status,
          tsunami: results.properties.tsunami,
          sig: results.properties.sig,
          net: results.properties.net,
          code: results.properties.code,
          sources: results.properties.sources,
          nst: results.properties.nst,
          dmin: results.properties.dmin,
          rms: results.properties.rms,
          mag: results.properties.mag,
          magType: results.properties.magType,
          type: results.properties.type,
          longitude: results.geometry.coordinates[0],
          latitude: results.geometry.coordinates[1],
          depth: results.geometry.coordinates[2],
        };
        await client.index({
          index: envs.elastic.index,
          id: results.id,
          body: earthquakeObject,
          pipeline: envs.elastic.pipline,
        });
      });

      if (EARTHQUAKES.data.length) {
        indexData();
      } else {
        console.log("Data has been indexed successfully!");
      }
    } catch (err) {
      console.log(err);
    }

    console.log("Preparing for the next round of indexing...");
  }
  indexData();
});

export default router;

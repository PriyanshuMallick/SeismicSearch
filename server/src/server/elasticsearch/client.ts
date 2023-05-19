import { Client } from "@elastic/elasticsearch";
import esConfig from "../../config/envs.js";

const client = new Client({
  node: esConfig.elastic.host,
  auth: {
    apiKey: esConfig.elastic.apiKey,
  },
  caFingerprint: esConfig.elastic.ca,
  tls: {
    rejectUnauthorized: false,
  },
});

export function connectToElasticsearch() {
  client
    .ping()
    .then((res) => console.log("You are connected to ElasticSearch!"))
    .catch((error) =>
      console.error("ElasticSearch is not connected.\n" + error)
    );
}

export default client;

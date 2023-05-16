import { Client } from "@elastic/elasticsearch";
import esConfig from "../../config/envs.js";

const esClient = new Client({
  node: esConfig.elastic.host,
  auth: {
    username: esConfig.elastic.username,
    password: esConfig.elastic.password,
  },
  caFingerprint: esConfig.elastic.ca,
  tls: {
    rejectUnauthorized: false,
  },
});

export function test() {
  console.log("In client.js");
}

esClient
  .ping()
  .then((res) => console.log("You are connected to ElasticSearch!"))
  .catch((error) => console.error("ElasticSearch is not connected.\n" + error));

export default esClient;

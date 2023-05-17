import client from "./elasticsearch/client.js";
import esConfig from "../config/envs.js";

export default async function generateApiKeys(opts?) {
  const body = await client.security.createApiKey({
    body: {
      name: "seismic_search_app",
      role_descriptors: {
        earthquakes_example_writer: {
          cluster: ["monitor"],
          index: [
            {
              names: [esConfig.elastic.index],
              privileges: [
                "create_index",
                "write",
                "read",
                "manage",
                "create_doc",
              ],
            },
          ],
        },
      },
    },
  });
  return Buffer.from(`${body.id}:${body.api_key}`).toString("base64");
}

export function runMeToCreateAndLogApikey() {
  generateApiKeys()
    .then(console.log)
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

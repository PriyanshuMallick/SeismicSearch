import esClient from "./elasticsearch/client.js";
import esConfig from "../config/default.js";

export default async function generateApiKeys(opts?) {
  const body = await esClient.security.createApiKey({
    body: {
      name: "earthquake_app",
      role_descriptors: {
        earthquakes_example_writer: {
          cluster: ["monitor"],
          index: [
            {
              names: [esConfig.elastic.index],
              privileges: ["create_index", "write", "read", "manage"],
            },
          ],
        },
      },
    },
  });
  return Buffer.from(`${body.id}:${body.api_key}`).toString("base64");
}

// generateApiKeys()
//   .then(console.log)
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

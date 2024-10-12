import "dotenv/config";
import { CosmosClient } from "@azure/cosmos";
import { logger } from "./utils.js";

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;

const cosmosClient = new CosmosClient({
  endpoint,
  key,
});

async function deleteDatabases(prefix) {
  const { resources: databases } = await cosmosClient.databases
    .readAll()
    .fetchAll();
  for (const database of databases) {
    if (database.id.startsWith(prefix)) {
      await cosmosClient.database(database.id).delete();
      logger.info("Deleted: {Database}", { Database: database.id });
    }
  }
}

logger.info("Started");
await deleteDatabases("payments-test-");
logger.info("Finished");

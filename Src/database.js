import 'dotenv/config';
import { CosmosClient } from "@azure/cosmos";
import { logger } from './utils.js';

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseName = process.env.COSMOS_DATABASE;
const containerName = process.env.COSMOS_CONTAINER;
const partitionKeyPath = [process.env.COSMOS_PARTITION_KEY];


const cosmosClient = new CosmosClient({
    endpoint,
    key
});

const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
logger.info("{databaseId} database ready", { databaseId: database.id });

const { container } = await database.containers.createIfNotExists({
    id: containerName,
    partitionKey: {
        paths: partitionKeyPath
    }
});
logger.info("{containerId} container ready", { containerId: container.id });

export default container;
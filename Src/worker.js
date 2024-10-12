import 'dotenv/config';
import template from './template.js';
import { s4, logger } from './utils.js';
import container from './database.js';

const documentTemplate = template();

function createDocument(index, document) {

    const now = new Date();
    const nowIso = now.toISOString();

    document.id = "POC-" + index + "-" + s4();
    document.PartitionKey = "POC-" + index;
    document.GuidProperty = s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    document.BoolProperty = Math.random() >= 0.5;
    document.StringProperty = "POC-" + index + "-" + s4();
    document.IntProperty = Math.floor(Math.random() * 10000);
    document.DateOnlyProperty = nowIso.substring(0, 10);
    document.DecimalProperty = Math.random() * 10000;
    document.DictionaryProperty.a = "POC-" + index + "-" + s4();
    document.DictionaryProperty.b = "POC-" + index + "-" + s4();
    document.DictionaryProperty.c = "POC-" + index + "-" + s4();
    document.DictionaryProperty.d = "POC-" + index + "-" + s4();
    document.InnerItems[0].Id = s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    document.InnerItems[0].DateCreated = nowIso;
    document.InnerItems[0].TestFlag = Math.random() >= 0.5;

    return document;
}

let processed = 0;
async function runSet(start, set) {
    for (let index = start + 1; index <= start + set; index++) {
        const item = createDocument(index, documentTemplate);

        try {
            logger.info("Processing: {Id}", { Id: item.id });
            await container.items.upsert(item);
            processed++;
        } catch (error) {
            logger.error(error);
        }
    }

    const { resources } = await container.items.query("SELECT VALUE COUNT(1) FROM c WHERE IS_DEFINED(c.GuidProperty)", { maxItemCount: -1 }).fetchAll();

    const taskLogger = logger.child({ activity: `runSet(${start})` });
    taskLogger.info("Total: {Total} | Processed: {Processed} | ", { Total: resources[0], Processed: processed });
}

export default runSet;
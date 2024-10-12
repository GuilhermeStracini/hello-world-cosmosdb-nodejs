import { logger } from "./utils.js";
import runSet from "./worker.js";

const total = 1500000;
const set = 100;
const cycles = total / set;

logger.info("Started");
logger.info("Total cycles: {Cycles}", { Cycles: cycles });
for (let i = 0; i < cycles; i++) {
  setTimeout(async () => {
    const start = i * set;
    await runSet(start, set);
  }, 1000 * i);
  logger.info("Queued: {Queued}", { Queued: (i + 1) * set });
}
logger.info("Finished");

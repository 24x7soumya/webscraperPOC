/**
 * @file Entry pont of the application.
 * @author Soumya Bhattacharjee
 */

const { createLoggerInstance } = require('./utils/logger');
const { scraper } = require('./core/scraper');
const { toStore, fromStore } = require('./core/store');
const { render } = require('./core/renderer');
const { compareWithLastRun } = require('./core/compareWithLastRun');
const appLogger = createLoggerInstance("main");

(async function () {
    try{
        appLogger.info("Starting application");
        const url = process.argv[2] != 'L' ? (appLogger.info("Getting list of Gainers"), 'https://www.moneycontrol.com/stocks/marketstats/nsegainer/index.php') : (appLogger.info("Getting list of Losers"), 'https://www.moneycontrol.com/stocks/marketstats/nseloser/index.php');
        let data = await scraper(url);
        appLogger.info("Data received from url!");
        appLogger.info("Comparing former data with current data...");
        const final = compareWithLastRun(data, fromStore(), "Last Price", "Gain/Lost % since Last Run");
        appLogger.info("Processing done!");
        appLogger.info("Storing data to storage!");
        toStore(data);
        appLogger.info("Rendering final data!");
        render(final, 'Gain/Lost % since Last Run');
    } catch (err) {
        appLogger.error(`Application failed due to ${err}`);
    }
})();
/**
 * @module core/store
 * @desc Contains functions to interact with local store.
 */
const { createLoggerInstance } = require('../utils/logger');
const { LocalStorage } = require('node-localstorage');

const storageLogger = createLoggerInstance("store");
localStorage = new LocalStorage('./localStore');
storageLogger.info("Localstore created");

/**
 * Store data in localStore.
 * @param {object} data - Data to be stored in local store
 * @param {string} fieldToStore - Field name in data to store
 */
exports.toStore = function (data, fieldToStore) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        storageLogger.error("Unable to create local store! Terminating application!");
        process.exit();
    }
    if(!data) {
        storageLogger.warn("Data undefined! Storage failed");
        return false;
    }
    if (fieldToStore) {
        let history = {}
        Object.entries(data).forEach(([key, item]) => {
            history[key] = item[fieldToStore];
        });
        localStorage.setItem('Data', JSON.stringify(history));
    } else {
        localStorage.setItem('Data', JSON.stringify(data));
    }
    storageLogger.info("Data stored")
    return true;
};

/**
 * Retrieve data from localStore.
 * @returns {object} - Data from local store
 */
exports.fromStore = function () {
    if (typeof localStorage === "undefined" || localStorage === null) {
        storageLogger.error("Unable to create local store! Terminating application!");
        process.exit();
    }
    storageLogger.info("Retrieving data");
    return JSON.parse(localStorage.getItem('Data'));
};
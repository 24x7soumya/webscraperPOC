/**
 * @module core/compareWithLastRun
 * @desc Contains function to compare/process current data with local store data.
 */
 
const { createLoggerInstance } = require('../utils/logger');
const compareLogger = createLoggerInstance("compareWithLastRun");

/**
 * Compares the specified field value between current and stored data and stores result in a new column.
 * @param {object} current - New data
 * @param {object} prev - Stored/former data
 * @param {string} fieldToCompare - Attribute in data object that will be used for comparison
 * @param {string} resultFieldName - The name of the new field where result will be stored
 * @returns {object} - The resultant object with the added field added to the data received in current object.
 */
 exports.compareWithLastRun = function (current, prev, fieldToCompare, resultFieldName) {
    if(!current){
        compareLogger.warn("Data undefined! Comparison failed!");
        return {};
    }
    Object.entries(current).forEach(([key, value]) => {
        current[key][resultFieldName] = prev && prev[key] ?
            (current[key][fieldToCompare] - prev[key][fieldToCompare]) * 100 / prev[key][fieldToCompare]
            : "New Entrant";
    });
    compareLogger.info("Comparison suceeded! Returning processed data!")
    return current;
}
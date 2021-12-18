/**
 * @module core/renderer
 * @desc Contains functions to interact with local store.
 */
 
const { Table } = require('console-table-printer');
const { createLoggerInstance } = require('../utils/logger'); 

const colorCode = {
    positive: 'green',
    negative: 'red',
    default: 'magenta'
};
const rendererLogger = createLoggerInstance("renderer");

const table = new Table();

/**
 * Renders json data in tabular form in the console.
 * @param {object} data - Data to be rendered
 * @param {string} decidingAttribute - Attribute in data object that will be used to decide coloring
 * @param {number} decidingThreshold - The threshold value of the deciding attribute that will be used to decide the coloring
 */
exports.render = function (data, decidingAttribute, decidingThreshold = 0) {
    if(!data) {
        rendererLogger.warn("Data undefined! Render failed")
    }
    color = {};
    rendererLogger.info("Transforming data into table...")
    Object.entries(data).forEach(([key, item]) => {
        color.color = decidingAttribute && !isNaN(item[decidingAttribute]) && item[decidingAttribute]!=decidingThreshold ?
            item[decidingAttribute] > decidingThreshold ?
                colorCode.positive : colorCode.negative
            : colorCode.default;
        table.addRow({ Company: key, ...item }, color);
    });
    rendererLogger.info("Processing Complete! Rendering table!")
    table.printTable();
}
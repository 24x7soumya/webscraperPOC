/**
 * @module core/scraper
 * @desc Contains functions to scrape required data from url.
 */

const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { createLoggerInstance } = require('../utils/logger');


const scraperLogger = createLoggerInstance("Scraper");

/**
 * Srape data from url.
 * @param {string} url -URL to request data
 * @returns {object} - Scraped data
 */
exports.scraper = async function (url) {
    try {
        const browser = await puppeteer.launch({ headless: false });

        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForSelector('#data_table_ajax_loading');
        let content = await page.content();
        await browser.close();

        const dom = new JSDOM(content);
        let rows = Array.from(dom.window.document.querySelectorAll(".bsr_table table tr"));
        let data = rows
            .filter(row => row.querySelector('td span h3 a'))
            .map(row => {
                return {
                    company: row.querySelector('td span h3 a').textContent.replace(',', ''),
                    High: parseFloat(row.querySelector('td:nth-child(2)').textContent.replace(',', '')),
                    Low: parseFloat(row.querySelector('td:nth-child(3)').textContent.replace(',', '')),
                    'Last Price': parseFloat(row.querySelector('td:nth-child(4)').textContent.replace(',', '')),
                    'Previous Close': parseFloat(row.querySelector('td:nth-child(5)').textContent.replace(',', '')),
                    Change: parseFloat(row.querySelector('td:nth-child(6)').textContent.replace(',', '').replace(',', '')),
                    'Gain %': parseFloat(row.querySelector('td:nth-child(7)').textContent.replace(',', ''))
                }
            })
            .reduce((acc, { company, ...x }) => { acc[company] = x; return acc }, {});

        return data;
    } catch(err){
        scraperLogger.error(`Scraper failed to execute due to ${err}`);
        process.exit();
    }
};
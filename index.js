const puppeteer = require('puppeteer');
const fs = require('fs');
const url = require('url');
const path = require('path');

(async () => {
    const arguments = process.argv.splice(2);
    const u = url.parse(arguments[0])
    id = u.path.replace(/^\/|\/$/gm, '').replace(/\//gm, '_')
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(u.href);
    await page.waitForSelector('title');
    const html = await page.content();
    fs.writeFile(id + '.html', html, _ => console.log(id + '.html saved'));

    await browser.close();
})();
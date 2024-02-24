const jsdom = require('jsdom');
const puppeteer = require('puppeteer');


const URL = "https://community.case.edu/brewcwru/rsvp_boot?id=2254804";
const CASE_ID = "wsm32";
const CASE_PASSWORD = "#vq!r5PmbhE8&Wg%TASJzDZK";

const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://login.case.edu',
    'Referer': 'https://login.case.edu/cas/login',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Cookie': 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en',
};

const data = {
    'username': CASE_ID,
    'password': CASE_PASSWORD,
    '_eventId': 'submit',
    'submit.x': (Math.floor(Math.random() * 44) + 1).toString(),
    'submit.y': (Math.floor(Math.random() * 44) + 1).toString(),
};

async function getpageauth() {
    browser = await puppeteer.launch({headless: false});

    page = await browser.newPage();
    await page.setExtraHTTPHeaders(headers);

    await page.goto("https://login.case.edu/cas/login");
    await page.type('#username', CASE_ID);
    await page.type('#password', CASE_PASSWORD);
    await page.click('input[name="submit"]');

    await page.goto("https://www.campusgroups.com/shibboleth/login?idp=cwru");
    await page.waitForSelector('[id="button-menu-mobile"]');
    await page.goto(URL);
    const content = await page.content();

    console.log(content);

    await browser.close();
    return content;
}

getpageauth();

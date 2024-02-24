const jsdom = require('jsdom');
const puppeteer = require('puppeteer');


const URL = "https://community.case.edu/brewcwru/rsvp_boot?id=2254804";
const CASE_ID = "wsm32";
const CASE_PASSWORD = "#vq!r5PmbhE8&Wg%TASJzDZK";


export async function getAuthHeaders(caseId, casePassword) {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page.goto("https://login.case.edu/cas/login");
    await page.type('#username', caseId);
    await page.type('#password', casePassword);
    await page.click('input[name="submit"]');

    await page.goto("https://www.campusgroups.com/shibboleth/login?idp=cwru");
    await page.waitForSelector('[id="button-menu-mobile"]');
    await page.goto(URL);

    const cookies = await page.cookies();
    const headers = {
        'Cookie': cookies.map(ck => `${ck.name}=${ck.value}`).join('; ')
    };
    await browser.close();

    return headers;
}

export async function getEventInfo(eventId, headers) {
    const eventText = await fetch(`https://community.case.edu/brewcwru/rsvp_boot?id=${eventId}`, {
        "headers": headers,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    }).then(response => response.text());
    const dom = new jsdom.JSDOM(eventText);
    const data = dom.window.document.querySelector("#page-cont > script:nth-child(4)").innerHTML

    return data;
}

async function main() {
    const authHeaders = await getAuthHeaders(CASE_ID, CASE_PASSWORD);

    console.log(
       await getEventInfo(2254804, authHeaders)
    );
}

main();
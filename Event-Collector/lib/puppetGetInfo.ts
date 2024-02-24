const jsdom = require("jsdom");
const puppeteer = require("puppeteer");

export interface PuppeteerEvent {
    "@context": string;
    "@type": string;
    name: string;
    startDate: string;
    endDate: string;
    location: {
        "@type": string;
        name: string;
        address: string;
    };
    image: string;
    description: string;
}

const URL = "https://community.case.edu/brewcwru/rsvp_boot?id=2254804";

export async function getAuthHeaders(caseId: string, casePassword: string) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://login.case.edu/cas/login");
    await page.type("#username", caseId);
    await page.type("#password", casePassword);
    await page.click('input[name="submit"]');

    await page.goto("https://www.campusgroups.com/shibboleth/login?idp=cwru");
    await page.waitForSelector('[id="button-menu-mobile"]');
    await page.goto(URL);

    const cookies = await page.cookies();
    const headers = {
        Cookie: cookies.map((ck) => `${ck.name}=${ck.value}`).join("; "),
    };
    await browser.close();

    return headers;
}

export async function getEventInfo(eventId, headers): Promise<PuppeteerEvent> {
    const eventText = await fetch(`https://community.case.edu/brewcwru/rsvp_boot?id=${eventId}`, {
        headers: headers,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
    }).then((response) => response.text());
    const dom = new jsdom.JSDOM(eventText);
    const data = dom.window.document.querySelector("#page-cont > script:nth-child(4)").innerHTML;

    return JSON.parse(data);
}

import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";
import he from "he";

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
    image: string[];
    description: string;
}

const URL = "https://community.case.edu/rsvp_boot?id=2254804";

function cleanJsonString(inputString: string): string {
    // Define a regular expression pattern to match valid JSON characters
    const validJsonPattern: RegExp = /[^a-zA-Z0-9_:"',\{\}\[\]\.\- ]/g;

    // Remove any characters that do not match the pattern
    const cleanedString: string = inputString.replace(validJsonPattern, "");

    return cleanedString;
}

export async function getAuthHeaders(caseId: string, casePassword: string) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
        ignoreDefaultArgs: ["--disable-extensions"],
    });
    const page = await browser.newPage();

    await page.goto("https://login.case.edu/cas/login");
    await page.type("#username", caseId);
    await page.type("#password", casePassword);
    await page.click('input[name="submit"]');

    await page.goto("https://www.campusgroups.com/shibboleth/login?idp=cwru");
    await page.waitForSelector('[id="button-menu-mobile"]', { timeout: 100000 });
    await page.goto(URL);

    const cookies = await page.cookies();
    const headers = {
        Cookie: cookies.map((ck) => `${ck.name}=${ck.value}`).join("; "),
    };
    await browser.close();

    return headers;
}

export async function getEventInfo(eventId: string, headers): Promise<PuppeteerEvent | null> {
    const fetchEvent = async () =>
        fetch(`https://community.case.edu/rsvp_boot?id=${eventId}`, {
            headers: headers,
            body: null,
            method: "GET",
        }).then((response) => response.text());

    let eventText = await fetchEvent();
    for (const _ of Array(2).keys()) {
        const dom = new JSDOM(eventText);
        const element = dom.window.document.querySelector("#page-cont > script:nth-child(4)");

        if (element) {
            const innerHTML = cleanJsonString(he.decode(element.innerHTML));
            const data = JSON.parse(innerHTML);
            data.description = he.decode(data.description);
            console.debug(`Fetched event id ${eventId}`);
            return data;
        }
    }
    console.debug(`Failed to fetch event id ${eventId}, retrying`);
    eventText = await fetchEvent();

    console.error(`Failed to fetch event id ${eventId}`);
    return null;
}

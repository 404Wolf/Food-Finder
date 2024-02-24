// // import { analyzer } from "@/utils/events";
// import OpenAI from "openai";

// const openai = new OpenAI();


// export const analyzer = {
//     analyze: async () => {
//         const completion = await openai.chat.completions.create({
//             messages: [{ role: "system", content: "You are a helpful assistant." }],
//             model: "gpt-3.5-turbo",
//         });

//         console.log(completion.choices[0]);

//         return {
//             success: true,
//             data: completion.choices[0].message.content,
//         };
//     },
// };

import { JSDOM } from "jsdom";

// Given an id for a case event (e.g. 2251998)
async function fetchImageSrcForId(id: string): Promise<string | null> {
    const url = `https://community.case.edu/rsvp?id=${id}`;

    const html = await fetch(url).then(x => x.text());
    const dom = new JSDOM(html);

    const card = dom.window.document.querySelector(".rsvp__event-card");
    if (card === null) return null;

    const img = card.querySelector("img");
    if (img === null) return null;

    return img.src;
}

export const GET = async (): Promise<Response> => {
    // const test = await analyzer.analyze();

    // return Response.json({ success: true, data: test });

    return Response.json({
        img: await fetchImageSrcForId("2251998")
    });
}

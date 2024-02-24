// import { analyzer } from "@/utils/events";
import OpenAI from "openai";

const openai = new OpenAI();


export const analyzer = {
    analyze: async () => {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0]);

        return {
            success: true,
            data: completion.choices[0].message.content,
        };
    },
};

export const GET = async (): Promise<Response> => {
    const test = await analyzer.analyze();

    return Response.json({ success: true, data: test });
}

const API_KEY=process.env.GEMINI_API_KEY

import { GoogleGenerativeAI } from "@google/generative-ai";

const prompt = "Write a story about a magic backpack.";

const genAI = new GoogleGenerativeAI("AIzaSyDvYo0lKyZPgO-4Yt6ucEbPqAR8VmlNML8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function TestAI() {
    const prompt = "Say Hi to user";
    const result = await model.generateContent(prompt);

    return result.response.text();
}

export async function GenerateAFormQuestions({ EventName, EventType, TargetAudience, TargetAudienceDescription }: { EventName: string, EventType: string, TargetAudience: string, TargetAudienceDescription: string }) {
    const prompt = `Event Name: ${EventName}\nEvent Type: ${EventType}\nTarget Audience: ${TargetAudience}\nTarget Audience Description: ${TargetAudienceDescription}\n Generate 6 questions for a form (just the questions) that will be letter used to collect information from the audience. 
    So that we can use those information for ice breaker for the event
    Questions = {'generatedQuestion': string}
    Return: Array<Recipe>`;
    const result = await model.generateContent(prompt);


    return result.response.text();
}

export async function TestAI2( ) {
    const options = {
        method: 'POST',
        headers: {
          'X-Org-Id': '',
          Authorization: 'sk-tune-z72H3DRVHhJ7cZUyYbpoAaufNkZkwlz09oO',
          'Content-Type': 'application/json'
        },
        body: '{"prompt":"Say HI","model":"<string>","max_tokens":123,"temperature":123,"top_p":123,"n":123,"stream":true,"stop":["<string>"],"presence_penalty":123,"frequency_penalty":123,"logit_bias":{},"echo":true}'
      };
      
      fetch('https://proxy.tune.app/text/completions', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
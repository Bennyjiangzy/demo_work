import * as fs from 'fs'
import fetch from 'node-fetch'
import { Request, Response } from 'express';
let translateAPIurl: string | null = null;
let translateAPIkey: string | null = null;

///<summary>
/// read the api settings
///</summary>
fs.readFile('./appsettings.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const settings = JSON.parse(data);
      translateAPIurl = settings.translateAPI.url;
      translateAPIkey = settings.translateAPI.key;
      console.log(translateAPIurl);
      console.log(translateAPIkey);
    } catch (error) {
      console.error(error);
    }
});

///<summary>
/// extract the parameters from request call and send a POST request to real translate api
///</summary>
///<return>
/// return the translated text 
///</return>

export async function posttexttotranslate(req: Request, res: Response) {
  try {
    console.log("trans get: " + req.body.text);
    const requestBody = req.body;
    const translate = await fetch(translateAPIurl!, {
        method: "POST",
        body: JSON.stringify({
        q: requestBody.text,
        source: requestBody.source,
        target: requestBody.target,
        format: "text",
        api_key: translateAPIkey
        }),
        headers: { "Content-Type": "application/json" }
    });
    if (!translate.ok) {
        throw new Error("Translation request failed");
    }

    const text = await translate.json();
    console.log("trans send: ", text);
    res.status(200).send(text);
    } catch (error) {
        console.error("An error occurred during translation:", error);
        res.status(500).send({ error: "Translation failed" });
    }
}

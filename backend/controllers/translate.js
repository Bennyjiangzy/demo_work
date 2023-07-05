import fs from 'fs';
import fetch from 'node-fetch';

var translateAPIurl = null;
var translateAPIkey= null;

fs.readFile('./appsettings.json', 'utf8', (err, data) =>
{
    if (err) {
        console.error(err);
        return;
    }
    try {
        const settings = JSON.parse(data);
        translateAPIurl = settings.translateAPI.url;
        translateAPIkey = settings.translateAPI.key;

    } catch (error)
    {
        console.error(error);
    }
})

export async function posttexttotranslate(req,res)
{
    try {
        console.log("request get: " + req.body.text);
        const requestBody = req.body;
        const translate = await fetch(translateAPIurl, {
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
        console.log("response get", text);
        res.status(200).send(text);
      } catch (error) {
        console.error("An error occurred during translation:", error);
        res.status(500).send({ error: "Translation failed" });
      }
}
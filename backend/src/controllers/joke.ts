import * as fs from 'fs'
import fetch from 'node-fetch'
import { Request, Response } from 'express';
let jokeAPIurl: string | null = null;

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
      jokeAPIurl = settings.jokeAPI.url;
      console.log(jokeAPIurl);
    } catch (error) {
      console.error(error);
    }
});

///<summary>
/// extract the parameters from request call and send a get request to real joke api
///</summary>
///<return>
/// return the joke
///</return>
export async function getjoke(req: Request, res: Response) {
    console.log("joke req get");
    const data = req.body;
    const categories = Object.values(data.categories).join(",");
    const params = [
        `blacklistFlags=${Object.values(data.blacklistFlags).join(",")}`,
        `lang=${data.lang}`,
    ];
    const url = `${jokeAPIurl!}/joke/${categories}?${params.join("&")}`;
    console.log(url);

    try {
        const response = await fetch(url);
        const jokeData = await response.json();
        console.log("joke res send");
        res.status(200).send(jokeData);
    } catch (error) {
        console.error(error);
        res.status(401).send("error");
    }
    
}

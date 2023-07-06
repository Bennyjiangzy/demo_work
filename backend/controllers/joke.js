import fs from 'fs';
import fetch from 'node-fetch'
var jokeAPIurl= "https://v2.jokeapi.dev";

// fs.readFile('./appsettings.json', 'utf8', (err, data) =>
// {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     try {
//         const settings = JSON.parse(data);
//         jokeAPIurl       = settings.jokeAPI.url;

//     } catch (error)
//     {
//         console.error(error);
//     }
// })


export async function getjoke(req,res)
{
    const data = req.body
    const categories = Object.values(data.categories).join(",");

    const params = [
        `blacklistFlags=${Object.values(data.blacklistFlags).join(",")}`,
        `lang=${data.lang}`,
    ];;
    const url = `${jokeAPIurl}/joke/${categories}?${params.join("&")}`;
    console.log(url)
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((error) => {
        console.error(error);
        res.status(401).send("error");
    });
    // res.status(200).send("asd")
}
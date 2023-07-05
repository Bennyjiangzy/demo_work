import fs from 'fs';
import fetch from 'node-fetch'
var dogAPIurl= null;

fs.readFile('./appsettings.json', 'utf8', (err, data) =>
{
    if (err) {
        console.error(err);
        return;
    }
    try {
        const settings = JSON.parse(data);
        dogAPIurl       = settings.dogAPI.url;

    } catch (error)
    {
        console.error(error);
    }
})

var fakedatabaseList={};
var index=0;

export async function getdogimage(req,res)
{
    console.log("one img get")
    const translate = await fetch(dogAPIurl, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
    });
    var pic = await translate.json();
    res.status(200).send(JSON.stringify(pic));

}

export async function savedogimage(req,res)
{
    const imglink = req.body.imglink;
    const current_index = index;
    fakedatabaseList[current_index] = imglink;
    index+=1
    res.status(200).send(fakedatabaseList[current_index]);

}

export async function deletedogimage(req,res)
{
    const imgid = req.query.imgid
    if(fakedatabaseList[imgid]==undefined)
    {
        res.status(404).send("The img undefind");
    }else{
        delete fakedatabaseList[imgid]
        res.status(200).send(fakedatabaseList);
    }
}

export async function getalldogimage(req,res)
{
    res.status(200).send(fakedatabaseList);
}
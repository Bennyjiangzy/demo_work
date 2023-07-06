import fs from 'fs';
import fetch from 'node-fetch'
var dogAPIurl= null;

///<summary>
/// read the api settings
///</summary>
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

/// fake database here should be a database link and execute the CURD in function below
var fakedatabaseList={};
var index=0;

///<summary>
/// extract the information form request and send a get reuqest to the real dog api
///</summary>
///<return>
/// return a random dog img src
///</return>
export async function getdogimage(req,res)
{
    
    try {
    console.log("imageget get")
    const translate = await fetch(dogAPIurl, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
    });
    var pic = await translate.json();
    console.log("imageget send")
    res.status(200).send(JSON.stringify(pic));
    }catch(err)
    {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }

}

///<summary>
/// extract the information form request and save the image src to the fake database
///</summary>
///<return>
/// return the saved imge src 
///</return>
export async function savedogimage(req,res)
{
    try {
    console.log("imgesave get")
    const imglink = req.body.imglink;
    const current_index = index;
    fakedatabaseList[current_index] = imglink;
    index+=1
    console.log("imgesave send")
    res.status(200).send(fakedatabaseList[current_index]);
    } catch{
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });         
    }

}

///<summary>
/// extract the information form request and delete the matched img in fake database
///</summary>
///<return>
/// return the deleted img 
///</return>
export async function deletedogimage(req,res)
{
    try {
    console.log("imgdelete get")
    const imgid = req.body.imgid
    if(fakedatabaseList[imgid]==undefined)
    {
        console.log("img not found")
        res.status(401).send("The img undefind");
    }else{
        console.log("imgdelete send")
        delete fakedatabaseList[imgid]
        res.status(200).send(fakedatabaseList);
    }
    } catch(err){
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });   
    }
}

///<summary>
/// return the current dogimage list in fake database
///</summary>
export async function getalldogimage(req,res)
{
    try{
    console.log("imgall get")
    var pics = JSON.stringify(fakedatabaseList)
    console.log("imgall send")
    res.status(200).send(JSON.parse(pics));
    } catch(err)
    {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });   
    }
}
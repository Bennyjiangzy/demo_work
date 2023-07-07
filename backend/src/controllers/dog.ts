import * as fs from 'fs'
import fetch from 'node-fetch'
import { Request, Response } from 'express';
let dogAPIurl: string | null = null;

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
      dogAPIurl = settings.dogAPI.url;
      console.log(dogAPIurl);
    } catch (error) {
      console.error(error);
    }
});

/// fake database here should be a database link and execute the CURD in function below
interface FakedatabaseList {
    [key: number]: string;
  }
  
let fakedatabaseList: FakedatabaseList = {};
let index: number = 0;

///<summary>
/// extract the information form request and send a get reuqest to the real dog api
///</summary>
///<return>
/// return a random dog img src
///</return>
export async function getdogimage(req: Request, res: Response): Promise<void> {
    try {
        console.log("imageget get");
        const translate = await fetch(dogAPIurl!, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const pic = await translate.json();
        console.log("imageget send");
        res.status(200).send(JSON.stringify(pic));
    } catch (error) {
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
export async function savedogimage(req: Request, res: Response): Promise<void> {
    try {
        console.log("imgesave get");
        const imglink: string = req.body.imglink;
        const current_index: number = index;
        fakedatabaseList[current_index] = imglink;
        index += 1;
        console.log("imgesave send");
        res.status(200).send(fakedatabaseList[current_index]);
    } catch (error) {
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
export async function deletedogimage(req: Request, res: Response): Promise<void> {
    try {
        console.log("imgdelete get");
        const imgid: string = req.body.imgid;

        if (fakedatabaseList[Number(imgid)] === undefined) {
            console.log("img not found");
            res.status(401).send("The img undefined");
        } else {
            console.log("imgdelete send");
            delete fakedatabaseList[Number(imgid)];
            res.status(200).send(fakedatabaseList);
        }
    } catch (error) {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }
}

///<summary>
/// return the current dogimage list in fake database
///</summary>
export async function getalldogimage(_: any, res: Response): Promise<void> {
    try {
        console.log("imgall get");
        var pics = JSON.stringify(fakedatabaseList);
        console.log("imgall send");
        res.status(200).send(JSON.parse(pics));
    } catch (error) {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }
}
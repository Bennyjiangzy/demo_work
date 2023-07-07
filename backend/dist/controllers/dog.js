"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getalldogimage = exports.deletedogimage = exports.savedogimage = exports.getdogimage = void 0;
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
let dogAPIurl = null;
///<summary>
/// read the api settings
///</summary>
fs.readFile('./appsettings.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        const settings = JSON.parse(data);
        dogAPIurl = settings.dogAPI.url;
        console.log(dogAPIurl);
    }
    catch (error) {
        console.error(error);
    }
});
let fakedatabaseList = {};
let index = 0;
///<summary>
/// extract the information form request and send a get reuqest to the real dog api
///</summary>
///<return>
/// return a random dog img src
///</return>
async function getdogimage(req, res) {
    try {
        console.log("imageget get");
        const translate = await (0, node_fetch_1.default)(dogAPIurl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const pic = await translate.json();
        console.log("imageget send");
        res.status(200).send(JSON.stringify(pic));
    }
    catch (error) {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }
}
exports.getdogimage = getdogimage;
///<summary>
/// extract the information form request and save the image src to the fake database
///</summary>
///<return>
/// return the saved imge src 
///</return>
async function savedogimage(req, res) {
    try {
        console.log("imgesave get");
        const imglink = req.body.imglink;
        const current_index = index;
        fakedatabaseList[current_index] = imglink;
        index += 1;
        console.log("imgesave send");
        res.status(200).send(fakedatabaseList[current_index]);
    }
    catch (error) {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }
}
exports.savedogimage = savedogimage;
///<summary>
/// extract the information form request and delete the matched img in fake database
///</summary>
///<return>
/// return the deleted img 
///</return>
async function deletedogimage(req, res) {
    try {
        console.log("imgdelete get");
        const imgid = req.body.imgid;
        if (fakedatabaseList[Number(imgid)] === undefined) {
            console.log("img not found");
            res.status(401).send("The img undefined");
        }
        else {
            console.log("imgdelete send");
            delete fakedatabaseList[Number(imgid)];
            res.status(200).send(fakedatabaseList);
        }
    }
    catch (error) {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }
}
exports.deletedogimage = deletedogimage;
///<summary>
/// return the current dogimage list in fake database
///</summary>
async function getalldogimage(_, res) {
    try {
        console.log("imgall get");
        var pics = JSON.stringify(fakedatabaseList);
        console.log("imgall send");
        res.status(200).send(JSON.parse(pics));
    }
    catch (error) {
        console.error("An error occurred", error);
        res.status(401).send({ error: "something wrong" });
    }
}
exports.getalldogimage = getalldogimage;

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
exports.posttexttotranslate = void 0;
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
let translateAPIurl = null;
let translateAPIkey = null;
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
        translateAPIurl = settings.translateAPI.url;
        translateAPIkey = settings.translateAPI.key;
        console.log(translateAPIurl);
        console.log(translateAPIkey);
    }
    catch (error) {
        console.error(error);
    }
});
///<summary>
/// extract the parameters from request call and send a POST request to real translate api
///</summary>
///<return>
/// return the translated text 
///</return>
async function posttexttotranslate(req, res) {
    try {
        console.log("trans get: " + req.body.text);
        const requestBody = req.body;
        const translate = await (0, node_fetch_1.default)(translateAPIurl, {
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
    }
    catch (error) {
        console.error("An error occurred during translation:", error);
        res.status(500).send({ error: "Translation failed" });
    }
}
exports.posttexttotranslate = posttexttotranslate;

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
exports.getjoke = void 0;
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
let jokeAPIurl = null;
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
        jokeAPIurl = settings.jokeAPI.url;
        console.log(jokeAPIurl);
    }
    catch (error) {
        console.error(error);
    }
});
///<summary>
/// extract the parameters from request call and send a get request to real joke api
///</summary>
///<return>
/// return the joke
///</return>
async function getjoke(req, res) {
    console.log("joke req get");
    const data = req.body;
    const categories = Object.values(data.categories).join(",");
    const params = [
        `blacklistFlags=${Object.values(data.blacklistFlags).join(",")}`,
        `lang=${data.lang}`,
    ];
    const url = `${jokeAPIurl}/joke/${categories}?${params.join("&")}`;
    console.log(url);
    try {
        const response = await (0, node_fetch_1.default)(url);
        const jokeData = await response.json();
        console.log("joke res send");
        res.status(200).send(jokeData);
    }
    catch (error) {
        console.error(error);
        res.status(401).send("error");
    }
}
exports.getjoke = getjoke;

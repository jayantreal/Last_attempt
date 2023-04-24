const request = require("request");
const cheerio = require("cheerio");
const getalllinks = require("./alllinks");

request("https://github.com/topics",cb);

function cb(error, response,data){
    parseData(data);
}


function parseData(html){
    let ch = cheerio.load(html);

    let allATags = ch('.topic-box a');

    for(let i=0;i<allATags.length;i++){
    let topicLink = ch(allATags[i]).attr("href");
    let completelink = "https://github.com"+topicLink;
    //console.log(completelink);
    getalllinks(completelink);
    
    }
}
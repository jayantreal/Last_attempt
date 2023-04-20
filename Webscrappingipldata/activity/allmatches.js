const request = require("request");
const cheerio = require("cheerio");
const getmatch = require("./match");

function getallmatches(link){
    request(link , cb);
}

function cb(error, response,data){
    parseData(data);
}

function parseData(html){
    let ch = cheerio.load(html);
    let alltag = ch('a[class="sp-scr_lnk url"]');
    for(let i =0; i< alltag.length;i++){
        let atag = alltag[i+""];
        let link=ch(atag).attr("href");
        let completelink = "https://sports.ndtv.com"+link;
       // console.log(completelink);
        getmatch(completelink);
       // https://sports.ndtv.com/cricket/rr-vs-lsg-scorecard-live-cricket-score-ipl-2023-match-26-rrlko04192023222198
    }
}

module.exports=getallmatches;
const request = require("request");
const cheerio = require("cheerio");
//const getmatches = require("./allmatches");

request("https://sports.ndtv.com/cricket/results",cb);

function cb(error, response,data){
    parseData(data);
}


function parseData(html){
    let ch = cheerio.load(html);
    let atag = ch('flt-row,a');
    let link = atag['72']["attribs"]["href"];
    //console.log(link);
    getmatches(link);
}


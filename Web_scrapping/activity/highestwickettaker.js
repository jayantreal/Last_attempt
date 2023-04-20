const request = require("request");
const cheerio = require("cheerio");
const fs=require("fs");

request("https://sports.ndtv.com/cricket/gt-vs-rr-scorecard-live-cricket-score-ipl-2023-match-23-ahmrr04162023222195",cb);

let highestwickettaket={};

function cb(error, response,data){
    parseData(data);
}

function parseData(html){
    let highestwickettaketsofar=0;
    let nameofthepalayer;
    let economy;
    let wickets;

    let ch = cheerio.load(html);
    let bothbolwingtables=ch('ful_scr-tbl,tbody,tr #tbody_1_1110,tr[bowl_1]');
    let bothbolwingtables1=ch(bothbolwingtables['2']);
    let bothbolwingtables2=ch(bothbolwingtables['5']);
   // let alltrs =ch(bothbolwingtables1).find("tbody tr")+ch(bothbolwingtables2).find("tbody tr");
    let alltrs = bothbolwingtables1.find("tbody tr").toArray().concat(bothbolwingtables2.find("tbody tr").toArray());
    for(let i=0;i<alltrs.length;i++){
      let alltds=ch(alltrs[i]).find("td");
      let highestwickettaken = ch(alltds['4']).text();
      if(highestwickettaken > highestwickettaketsofar){
        highestwickettaketsofar=highestwickettaken;
        nameofthepalayer=ch(alltds['0']).text();
        economy = ch(alltds['5']).text();
        wickets = highestwickettaken;
      }
      
    }
    highestwickettaket.name = nameofthepalayer;
    highestwickettaket.wickets = wickets;
    highestwickettaket.economy = economy;

    console.log(highestwickettaket);
}

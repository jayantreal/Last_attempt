const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://sports.ndtv.com/cricket/pbks-vs-rcb-scorecard-live-cricket-score-ipl-2023-match-27-kpbc04202023222199",cb);

function cb(error, response,data){
    parseData(data);
}

function parseData(html){
    let ch = cheerio.load(html);
    let bothbolwingtables4=ch('ful_scr-cnt,table');
    let bothbolwingtables5=ch(bothbolwingtables4['0']);
    let bothbolwingtables6=ch(bothbolwingtables4['3']);
   let alltrs = bothbolwingtables5.find("tbody tr").toArray().concat(bothbolwingtables6.find("tbody tr").toArray());
   for(let i=0;i<alltrs.length;i++){
    let alltds=ch(alltrs[i]).find("td");
    if(alltds.length>1){
      let highestwickettaken = ch(alltds['0']).text();
      let batsmanname = highestwickettaken.trim().split(/\s+/).slice(0, 12).join(" ");
      let run= ch(alltds['1']).text().trim();
      let balls= ch(alltds['2']).text().trim();
      let fours= ch(alltds['3']).text().trim();
      let six= ch(alltds['4']).text().trim();
      let strikerate= ch(alltds['5']).text().trim();
     
      console.log(`Name: ${batsmanname} Run: ${run} Balls: ${balls} Fours: ${fours} Six: ${six} Strike Rate: ${strikerate}`);
    }
    i=i+1;
   }
    
}

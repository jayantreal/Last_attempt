const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//request("https://sports.ndtv.com/cricket/pbks-vs-rcb-scorecard-live-cricket-score-ipl-2023-match-27-kpbc04202023222199",cb);

let leaderboard = [];
let count = 0;




function getmatch(link) {
    // async task
    console.log("Sending Request !!! ");
    count++;
    // async function
    request(link, cb);
  }

function cb(error, response,data){
    console.log("Received Data !!! ");
  count--;

 parseData(data);
if(count == 0){
        console.table(leaderboard);
  }
}



function parseData(html){
    let ch = cheerio.load(html);
    let bothbolwingtables=ch('span[class="brd-nv_li current brd-nv_act" ]');
    let teamname = bothbolwingtables.text().split("vs").map(s => s.trim()); 
    console.log(teamname[0]);
   console.log(teamname[1].replace("Full Scorecard", ""));
    
    let bothbolwingtables4=ch('ful_scr-cnt,table');
    let bothbolwingtables5=ch(bothbolwingtables4['0']);
    let bothbolwingtables6=ch(bothbolwingtables4['3']);
   let alltrs = bothbolwingtables5.find("tbody tr").toArray().concat(bothbolwingtables6.find("tbody tr").toArray());
   for(let  i=0;i<alltrs.length;i++){
    
    
    let alltds=ch(alltrs[i]).find("td");
    if(alltds.length>1){
      let highestwickettaken = ch(alltds['0']).text();
      let batsmanName = highestwickettaken.trim().split(/\s+/).slice(0, 12).join(" ");
      let runs = ch(alltds['1']).text().trim();
      let balls= ch(alltds['2']).text().trim();
      let fours= ch(alltds['3']).text().trim();
      let sixes = ch(alltds['4']).text().trim();
      let strikeRate= ch(alltds['5']).text().trim();
     
     // console.log(`Name: ${batsmanname} Run: ${run} Balls: ${balls} Fours: ${fours} Six: ${six} Strike Rate: ${strikerate}`);
    processBatsman( batsmanName , runs , balls , fours , sixes , strikeRate);
    
    }
    i=i+1;
   }

   console.log("##########################################");

    
   function processLeaderboard(teamName, batsmanName, runs, balls, fours, sixes) {
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    if (leaderboard.length) {
      // leaderboard has atleast 1 object
      for (let i = 0; i < leaderboard.length; i++) {
        let obj = leaderboard[i];
        if (obj.Team == teamName && obj.Batsman == batsmanName) {
          obj.Runs += runs;
          obj.Balls += balls;
          obj.Fours += fours;
          obj.Sixes += sixes;
          return;
        }
      }
    }
    // leaderboard is empty
    let obj = {
      Team: teamName,
      Batsman: batsmanName,
      Runs: runs,
      Balls: balls,
      Fours: fours,
      Sixes: sixes,
    };
    leaderboard.push(obj);
  }
  
  // when working with json file
  // function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes ){
  //     let leaderboard = JSON.parse(fs.readFileSync("./leaderboard.json"));
  //     runs = Number(runs);
  //     balls = Number(balls);
  //     fours = Number(fours);
  //     sixes = Number(sixes);
  
  //     // false , null , undefined , 0 , ""
  //     if(leaderboard.length){
  //         // leaderboard has atleast 1 object
  //         for(let i=0 ; i<leaderboard.length ; i++){
  //             let obj = leaderboard[i];
  //             if(obj.Team == teamName && obj.Batsman == batsmanName){
  //                 obj.Runs += runs;
  //                 obj.Balls += balls;
  //                 obj.Fours += fours;
  //                 obj.Sixes += sixes;
  //                 fs.writeFileSync("./leaderboard.json" , JSON.stringify(leaderboard));
  //                 return;
  //             }
  //         }
  //     }
  //         // leaderboard is empty
  //         let obj = {
  //             Team : teamName ,
  //             Batsman : batsmanName ,
  //             Runs : runs ,
  //             Balls : balls ,
  //             Fours : fours ,
  //             Sixes : sixes
  //         }
  //         leaderboard.push(obj);
  //         fs.writeFileSync("./leaderboard.json" , JSON.stringify(leaderboard));
    

}
module.exports = getmatch;
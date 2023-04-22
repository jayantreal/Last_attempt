const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//request("https://sports.ndtv.com/cricket/pbks-vs-rcb-scorecard-live-cricket-score-ipl-2023-match-27-kpbc04202023222199",cb);


function getmatch(link){
    request(link , cb);
}


function cb(error, response,data){
    parseData(data);
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

    
   function checkTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}

function checkBatsmanFile(teamName , batsmanName){
    // "./IPL/Mumbai Indians/Rohit Sharma.json";
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    // "./IPL/Mumbai Indians/Rohit Sharma.json"
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    let stringifiedData = JSON.stringify(batsmanFile); // [object] => [ {}]
    fs.writeFileSync(batsmanPath , stringifiedData  );
}
function createTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}




function processBatsman(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let isTeam = checkTeamFolder(teamName);
    if(isTeam){
        let isBatsman = checkBatsmanFile(teamName , batsmanName);
        if(isBatsman){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}
    

}
module.exports = getmatch;
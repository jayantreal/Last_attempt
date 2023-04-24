const request = require("request");
const cheerio = require("cheerio");
const getlinks = require("./alltopics_and_links");

//request("https://github.com/topics/firebase",cb);

function getalllinks(link){
    request(link , cb);
}


function cb(error, response,data){
    parseData(data);
}


function parseData(html){
    let ch = cheerio.load(html);

    let allATags = ch('.tabnav-tabs a');

    for(let i=0;i<allATags.length;i++){
        let topicLink = ch(allATags[i]).attr("href");
        let completelink = "https://github.com"+topicLink;
        if (completelink.endsWith('/issues')) {
           // console.log(completelink);
            getlinks(completelink);
        }
       
        }
      //  console.log('#########');

    
}
module.exports=getalllinks;
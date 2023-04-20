const request = require("request");
const cheerio = require("cheerio");

request("https://groww.in/gold-rates/gold-rate-today-in-delhi",cb);

function cb(error, response,data){
    parseData(data);
}

function parseData(html){
    let ch = cheerio.load(html);
    let allcommentaries=ch('div[class="grp846ExplWrapper col l12 grp846Textjustify"],p');
    let allcommentaries1=ch(allcommentaries['3']).text();
    console.log(allcommentaries1);  
    
}
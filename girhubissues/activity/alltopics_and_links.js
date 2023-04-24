const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const XLSX = require("xlsx");

function getLinks(link) {
  request(link, cb);
}

function cb(error, response, data) {
  parseData(data);
}

function parseData(html) {
  let ch = cheerio.load(html);
  let allATags = ch(
    ".js-navigation-container.js-active-navigation-container .js-issue-row .flex-auto a.h4"
  );
  let issues = [];

  for (let i = 0; i < allATags.length; i++) {
    let issueName = ch(allATags[i + ""]).text().trim();
    let topicLink = ch(allATags[i + ""]).attr("href");
    let completeLink = "https://github.com" + topicLink;
    let issue = {
      issueName: issueName,
      completeLink: completeLink,
    };
    issues.push(issue);
  }

  console.log("#########");
  fs.writeFile("./issues.json", JSON.stringify(issues, null, 2), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Data saved to issues.json");
      convertToExcel();
    }
  });
}

function convertToExcel() {
    let jsonData = fs.readFileSync("issues.json", "utf-8");
  
    try {
      let issues = JSON.parse(jsonData);
  
      let header = ["Issue Name", "Complete Link"];
      let rows = [header];
  
      issues.forEach(function (issue) {
        let row = [issue.issueName, issue.completeLink];
        rows.push(row);
      });
  
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, "Issues");
      XLSX.writeFile(wb, "./issues.xlsx");
  
      console.log("Data saved to issues.xlsx");
    } catch (err) {
      console.log("Invalid JSON data in issues.json file");
    }
  }

module.exports = getLinks;

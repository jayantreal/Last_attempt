const puppeteer = require("puppeteer");
const id ="wixali6168@in2reach.com";
const password = "Mar@2020";
let challenges = require("./addchallengedata");

(async function(){
    let browseropenpromise =  await puppeteer.launch({
        headless : false,
        defaultViewport:null,
        args:["--start-maximized"]
    });
    let pages = await browseropenpromise.pages();
    let  tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id); 
    await tab.type("#input-2", password); 
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
   //await tab.click(".user-avatar-placeholder.d-flex.align-items-center.justify-content-center");

   await  tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]',{visible:true});
   await tab.click('div[data-analytics="NavBarProfileDropDown"]');
   await  tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});
   await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
   await  tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li");
   let bothtags = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
   let managetag= bothtags[1];
   await managetag.click();

   await  tab.waitForSelector(".btn.btn-green.backbone.pull-right",{visible:true});
   let createtags = await tab.$(".btn.btn-green.backbone.pull-right") ;
   let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href");  }  ,  createtags);
    createChallengeLink = 'https://www.hackerrank.com'+createChallengeLink;
    for(let i=0 ; i<challenges.length ; i++){
        addChallenge(challenges[i] , browser , createChallengeLink );
        await tab.waitForTimeout(3000);
    }
    //await addChallenge(challenges[0] , browser , createChallengeLink);
})();


async function addChallenge(browser , createChallengeLink , challenge){

let newtab = await browser.newPages();
newtab.goto(createChallengeLink);

    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    let newTab = await browser.newPage();
    await newTab.goto(createChallengeLink);
    await newTab.waitForSelector('#name' , {visible:true});
    await newTab.type('#name' , challengeName );
    await newTab.type('#preview' , description);
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement );
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();
    
}
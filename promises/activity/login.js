const puppeteer = require("puppeteer");
const id ="wixali6168@in2reach.com";
const password = "Mar@2020";

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
})();

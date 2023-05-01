const puppeteer = require("puppeteer");
const id ="wixali6168@in2reach.com";
const password = "Mar@2020";
let tab;

let browseropenpromise = puppeteer.launch({
    headless : false,
    defaultViewport:null,
    args:["--start-maximized"]
});

browseropenpromise.then(function(browser){
    console.log("browser open file");
    console.log(browser);
    let allpagepromise = browser.pages();
    return allpagepromise;
})
.then(function(pages){
     tab =pages[0];
    let pageopenpromises = tab.goto("https://www.hackerrank.com/auth/login");
    return pageopenpromises;
})
.then(function(){
    let idTypePromise = tab.type("#input-1", id); 
    return idTypePromise;
})
.then(function(){
    let pwTypePromise = tab.type("#input-2", password); 
    return pwTypePromise;
})
.then(function(){
    let loginPromise = tab.click(
        ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
      ); //navigation => page change
      return loginPromise;
})
.then(function(){
    console.log("logged in the website");
})
.catch(function(error){
    console.log(error);

})

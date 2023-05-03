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
 .then(function () {
    let waitAndClickPromise = tab.waitForSelector(".prep-kit-name:first-child");
    return waitAndClickPromise; //Promise<Pending>
   })
 .then(function(){
    let javachanlenge = tab.click(".prep-kit-name:first-child" ); 
      return javachanlenge;
 })  
// .then(function () {
//     let waitAndClickPromise = waitAndClick("prep-kit-name");
//     return waitAndClickPromise; //Promise<Pending>
//   })
.then(function () {
    let waitPromise = tab.waitForSelector(
      ".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled",
      { visible: true }
    );
    return waitPromise;
  })
  
  .then(function () {
    let allQuesATagsPromise = tab.$$(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled.ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled");
    return allQuesATagsPromise;
  })
.then(function(allQuesATags){
   //[ {} , {} , {} , {} ]  =>[ <a href="laksnfkjasf"/> , <a href="akjsbfua" /> , <a href="alshifia" /> , <a href="akjjsbfa" /> ];
    // pendingPromise = tab.Akjsfnakjbsf(aTag)  => aTag.getAttribute("href"); => value
    let allLinksPromise = [];

    for (let i = 0; i < allQuesATags.length; i++) {
      let aTag = allQuesATags[i];
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, aTag);
      allLinksPromise.push(linkPromise);
    }
    // allLinksPromise = [ Promise<link> , Promise<link> , Promise<link> , Promise<link> ];
    let sbkaPromise = Promise.all(allLinksPromise);
    // return Promise<Pending>
    return sbkaPromise; //Promise<Pending> => Promise<[link , link , link , link]>
})
.then(function ( allLinks) {
   
    let completeLinks = allLinks.map(function (link) {
        console.log(link);
        return "https://www.hackerrank.com" + link;

      });

      completeLinks = completeLinks.map(function (link) {
        return link.replace("isFullScreen=true", "isFullScreen=false");
      });
      
      let oneQuesSolvePromise = solveQuestion(completeLinks[0]);
      return oneQuesSolvePromise;
})
.then(function () {
    console.log("one Ques Solved Succesfully !!!!");
  })
.catch(function(error){
    console.log(error);

});

function waitAndClick(selector) {
    return new Promise(function (resolve, reject) {
      let waitPromise = tab.waitForSelector(selector, { visible: true });
      waitPromise
        .then(function () {
          let clickPromise = tab.click(selector);
          return clickPromise;
        })
        .then(function () {
          // wait and click succesfully done
          resolve();
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  function solveQuestion(qLink) {
    return new Promise(function (resolve, reject) {
        let gotoPromise = tab.goto(qLink);
        gotoPromise.then(function () {
            let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
            return waitAndClickPromise;
    }).then(function () {
        console.log("on the solution page")
    })
})
  }
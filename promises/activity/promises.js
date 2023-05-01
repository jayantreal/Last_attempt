const fs= require("fs");

let f1Kapromise =fs.promises.readFile("./file1.txt");
f1Kapromise.then(function(data){
    console.log(data+" ");
     let f2Kapromise =fs.promises.readFile("./file2.txt");
     //return f2Kapromise;
})
.then(function(data){
    console.log(data+" ");
})